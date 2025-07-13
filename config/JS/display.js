let senhaAnterior = '';
let beep = new Audio("../assets/audio/beep2.mp3");

function atualizarSenha() {
    fetch("https://filafacil-api-production.up.railway.app/display.php")
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

// Rodapé animado (NÃO MEXA!!!!! )
const texto = document.getElementById('texto');
const container = document.querySelector('.text-bottom');

let position = container.clientWidth;
const speed = 1.5;

function initializePosition() {
    const textoWidth = texto.clientWidth;
    position = (container.clientWidth - textoWidth) / 2;
    texto.style.transform = `translateX(${position}px)`;
}

function animate() {
    position -= speed;
    if (position < -texto.clientWidth) {
        position = container.clientWidth;
    }

    texto.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
}

initializePosition();
animate();

// Função para formatar a data e hora no estilo desejado
function atualizarDataHora() {
    const agora = new Date();
    
    // Meses em português
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
 
    const horaFormatada = `${horas}:${minutos}:${segundos}`;

    document.getElementById("hora").innerText = horaFormatada;
}

// Atualiza a data e hora a cada segundo
setInterval(atualizarDataHora, 1000);
