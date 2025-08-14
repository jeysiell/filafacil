let senhaAnterior = "";
let beep = new Audio("../assets/audio/beep2.mp3");

function chamarTransicaoSenha(senha, setor) {
  const transicao = document.getElementById("transicaoSenha");

  transicao.innerHTML = ` </strong><br> </strong><br> </strong><br> </strong><br> </strong><br> </strong><br> Senha <strong>${senha}</strong><br>${setor}`;
  transicao.style.display = "block";

  setTimeout(() => {
    transicao.classList.add("mostrar");
  }, 100); // pequeno delay para ativar animação

  // Remove depois de 3 segundos
  setTimeout(() => {
    transicao.classList.remove("mostrar");
    setTimeout(() => {
      transicao.style.display = "none";
    }, 600); // tempo da animação de saída
  }, 3000);
}


function atualizarSenha() {
  fetch("http://127.0.0.1:3000/display")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const senhaAtualElem = document.getElementById("senha-atual");
      const tipoSetorElem = document.getElementById("tipo-setor");

      // Toca o som quando a senha for diferente da anterior
      if (data.atual.senha !== senhaAnterior) {
        senhaAnterior = data.atual.senha;
        beep.play();
        chamarTransicaoSenha(data.atual.senha, data.atual.setor);
      }

      // Atualiza a senha atual exibida
      senhaAtualElem.innerText = ` ${data.atual.senha}`;
      tipoSetorElem.innerText = ` ${data.atual.setor}`; // Atualiza o setor abaixo da senha

      // Atualiza a lista de senhas anteriores
      const senhasLista = document.getElementById("senhas-lista");
      senhasLista.innerHTML = "";
      data.anteriores.forEach((item) => {
        const div = document.createElement("div");
        div.className = "senha-item";
        div.innerText = `${item.senha} - ${item.setor}`; // Exibe senha e setor
        senhasLista.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Erro ao atualizar a senha:", error);
    });
}

// Atualiza a senha a cada 3 segundos
setInterval(atualizarSenha, 3000);

function atualizarHora() {
  const agora = new Date();

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const diaSemana = diasSemana[agora.getDay()]; // 0 = Domingo, 1 = Segunda...

  const horas = agora.getHours().toString().padStart(2, "0");
  const minutos = agora.getMinutes().toString().padStart(2, "0");

  document.getElementById(
    "hora"
  ).innerText = `${diaSemana} ${horas}h${minutos}`;
}

// Chama imediatamente ao carregar
atualizarHora();

// Atualiza a cada segundo
setInterval(atualizarHora, 1000);

const fullscreenBtn = document.querySelector(".fullscreen-btn");
const body = document.body;

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      alert(`Erro ao entrar em tela cheia: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    body.classList.add("fullscreen-active");
  } else {
    body.classList.remove("fullscreen-active");
  }
});

async function atualizarVideo() {
    try {
        const res = await fetch('http://localhost:3000/video'); // Troque para seu domínio online
        const data = await res.json();

        if (data.url) {
            const iframe = document.getElementById('youtube-iframe');

            // Só troca se for diferente do que já está
            if (!iframe.src.includes(data.url)) {
                iframe.src = data.url + "?autoplay=1&mute=1";
            }
        }
    } catch (error) {
        console.error("Erro ao carregar vídeo:", error);
    }
}

document.addEventListener('DOMContentLoaded', atualizarVideo);
setInterval(atualizarVideo, 10000); // Atualiza a cada 1 min
