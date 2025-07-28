// Armazena os contadores anteriores
let lastCountSecretaria = 0;
let lastCountTesouraria = 0;

function chamarSenhaPorTipo(tipo, setor) {
  fetch(`https://filafacil-api-production.up.railway.app/chamar_senha.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `tipo=${encodeURIComponent(tipo)}&setor=${encodeURIComponent(setor)}`,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na resposta: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.erro) {
        console.error(data.erro);
      } else {
        console.log(`Senha chamada: ${data.senha}, Tipo: ${data.tipo}, Setor: ${data.setor}`);
        document.getElementById(`senha-chamada-${setor}`).textContent = `Senha chamada: ${data.senha}`;
      }
    })
    .catch((error) => {
      console.error(`Erro ao chamar a senha:`, error);
    });
}

const tiposPorSetor = {
  secretaria: ["matricula", "rematricula", "atendimento", "bolsa"],
  tesouraria: ["pagamentos", "2viaboleto"],
};

const ultimosContadores = {
  secretaria: {
    matricula: 0,
    rematricula: 0,
    atendimento: 0,
    bolsa: 0,
  },
  tesouraria: {
    pagamentos: 0,
    "2viaboleto": 0,
  },
};

function atualizarTodosContadoresPorSetor() {
  for (const setor in tiposPorSetor) {
    tiposPorSetor[setor].forEach((tipo) => {
      fetch(`https://filafacil-api-production.up.railway.app/contador.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `tipo=${tipo}&setor=${setor}`,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erro na resposta: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          const total = data.total || 0;
          const id = `contador-${tipo}-${setor}`;
          const elemento = document.getElementById(id);
          if (elemento) elemento.innerText = total;
          ultimosContadores[setor][tipo] = total;
        })
        .catch((error) => {
          console.error(`Erro ao atualizar contador de ${tipo} - ${setor}:`, error);
        });
    });
  }
}

setInterval(atualizarTodosContadoresPorSetor, 5000);
window.onload = atualizarTodosContadoresPorSetor;

function mostrarSetor(setor) {
  const loading = document.getElementById("loading-overlay");
  loading.classList.remove("hidden");

  setTimeout(() => {
    document.querySelectorAll(".setor").forEach((div) => div.classList.add("hidden"));
    document.getElementById(`setor-${setor}`).classList.remove("hidden");
    setTimeout(() => loading.classList.add("hidden"), 200);
  }, 500);
}



const dropdownWrapper = document.getElementById("dropdownSetoresWrapper");
const dropdownToggle = document.getElementById("dropdownSetores");

if (dropdownWrapper && dropdownToggle) {
  dropdownWrapper.addEventListener("mouseenter", () => {
    dropdownToggle.setAttribute("aria-expanded", "true");
  });
  dropdownWrapper.addEventListener("mouseleave", () => {
    dropdownToggle.setAttribute("aria-expanded", "false");
  });
}


function toggleDropdown(dropdownId) {
      const dropdown = document.getElementById(dropdownId);
      dropdown.classList.toggle('show');
}