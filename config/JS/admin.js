// Armazena os contadores anteriores
let lastCountSecretaria = 0;
let lastCountTesouraria = 0;

function chamarSenhaPorTipo(tipo, setor) {
  fetch(`https://filafacil-api.onrender.com/chamar_senha`, {
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
      fetch(`https://filafacil-api.onrender.com/contador`, {
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

async function enviarVideo() {
  const url = document.getElementById("video-url").value.trim();
  const status = document.getElementById("status-video");

  if (!url) {
    status.textContent = "Por favor, insira a URL do vídeo.";
    status.style.color = "red";
    return;
  }

  try {
    const res = await fetch("https://filafacil-api.onrender.com/enviarvideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (!res.ok) {
      status.textContent = data.erro || "Erro ao enviar vídeo.";
      status.style.color = "red";
      return;
    }

    // Verifica se foi vídeo ou playlist
    let tipoMsg = data.tipo === 'playlist' ? 'Playlist' : 'Vídeo';
    status.textContent = `${tipoMsg} atualizado(a) com sucesso!`;
    status.style.color = "lightgreen";

    document.getElementById("video-url").value = "";

  } catch (err) {
    console.error(err);
    status.textContent = "Erro ao salvar vídeo.";
    status.style.color = "red";
  }
}

function limparVideos() {
    if (confirm("Tem certeza que deseja remover TODOS os vídeos da tabela?")) {
        fetch('https://filafacil-api.onrender.com/videos/limpar', {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('status-video').textContent = data.message || data.erro;
            document.getElementById('status-video').classList.remove('text-green-400', 'text-red-400');
            document.getElementById('status-video').classList.add(data.status === "success" ? 'text-green-400' : 'text-red-400');
        })
        .catch(err => {
            document.getElementById('status-video').textContent = 'Erro ao limpar vídeos: ' + err;
            document.getElementById('status-video').classList.remove('text-green-400');
            document.getElementById('status-video').classList.add('text-red-400');
        });
    }
}