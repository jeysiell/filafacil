let lastCountSecretaria = 0;
let lastCountTesouraria = 0;

function chamarSenhaPorTipo(tipo, setor) {
    fetch(`https://filafacil-api-production.up.railway.app/chamar_senha.php`, { // Atualize para o nome correto do arquivo PHP
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `tipo=${encodeURIComponent(tipo)}&setor=${encodeURIComponent(setor)}`, // Encode os parâmetros
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
        }
    })
    .catch((error) => {
        console.error(`Erro ao chamar a senha:`, error);
    });
}


/* ---------- TIPOS DE SENHA POR SETOR ---------- */
const tiposPorSetor = {
  secretaria: ["matricula", "rematricula", "atendimento", "bolsa"],
  tesouraria: ["pagamentos", "2viaboleto"],
};

/* ---------- ÚLTIMOS CONTADORES PARA NOTIFICAÇÕES ---------- */
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
          // Verifica se a resposta é OK
          if (!response.ok) {
            throw new Error(`Erro na resposta: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          const total = data.total || 0;
          const id = `contador-${tipo}-${setor}`;
          const elemento = document.getElementById(id);

          if (elemento) {
            elemento.innerText = total;
          }

          // Atualiza o contador
          ultimosContadores[setor][tipo] = total;
        })
        .catch((error) => {
          console.error(
            `Erro ao atualizar contador de ${tipo} - ${setor}:`,
            error
          );
        });
    });
  }
}

// Atualiza os contadores a cada 5 segundos
setInterval(atualizarTodosContadoresPorSetor, 5000);
window.onload = atualizarTodosContadoresPorSetor;

function mostrarSetor(setor) {
  const loading = document.getElementById("loading-overlay");

  loading.classList.add("visible"); // fade in

  setTimeout(() => {
    document.querySelectorAll(".setor").forEach((div) => {
      div.classList.remove("ativo");
    });

    document.getElementById(`setor-${setor}`).classList.add("ativo");

    // fade out depois de um pequeno delay
    setTimeout(() => {
      loading.classList.remove("visible");
    }, 100); // tempo da transição
  }, 500); // tempo "falso" de carregamento (ajustável)
}

function mostrarSetor(setor) {
  const loading = document.getElementById("loading-overlay");

  loading.classList.add("visible"); // fade in

  setTimeout(() => {
    document.querySelectorAll(".setor").forEach((div) => {
      div.classList.remove("ativo");
    });

    document.getElementById(`setor-${setor}`).classList.add("ativo");

    // fade out depois de um pequeno delay
    setTimeout(() => {
      loading.classList.remove("visible");
    }, 100); // tempo da transição
  }, 500); // tempo "falso" de carregamento (ajustável)
}

// Alternar exibição do menu lateral com overlay
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("overlay");

  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("visible");
    overlay.classList.toggle("visible");
    toggleButton.classList.toggle("open"); // alterna a classe para animação do X
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("visible");
    overlay.classList.remove("visible");
    toggleButton.classList.remove("hide");
    toggleButton.classList.remove("open"); // volta ao hamburger
  });

  document.querySelectorAll(".sidebar button").forEach((botao) => {
    botao.addEventListener("click", () => {
      sidebar.classList.remove("visible");
      overlay.classList.remove("visible");
      toggleButton.classList.remove("hide");
      toggleButton.classList.remove("open"); // volta ao hamburger
    });
  });
});

const dropdownWrapper = document.getElementById("dropdownSetoresWrapper");
const dropdownToggle = document.getElementById("dropdownSetores");

dropdownWrapper.addEventListener("mouseenter", () => {
  dropdownToggle.setAttribute("aria-expanded", "true");
});
dropdownWrapper.addEventListener("mouseleave", () => {
  dropdownToggle.setAttribute("aria-expanded", "false");
});

async function salvarConfig() {
  const ip = document.getElementById("ip").value;
  const porta = document.getElementById("porta").value;
  const timeout = document.getElementById("timeout").value;

  const resposta = await fetch("/salvar_configuracao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ip_impressora: ip,
      porta_impressora: parseInt(porta),
      timeout: parseInt(timeout),
    }),
  });

  const dados = await resposta.json();
  const msg = document.getElementById("mensagem");
  msg.textContent = dados.mensagem || dados.erro;
  msg.style.color = dados.erro ? "red" : "green";
}
