function gerarSenha(tipo, setorId) {
  const formData = new FormData();
  formData.append("tipo", tipo);
  formData.append("setor_id", setorId);

  fetch("https://filafacil-api.onrender.com/gerarsenha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tipo, setor_id: setorId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.senha) {
        console.log(`Senha gerada: ${data.senha}`);
        toggleDropdown(setorId === 1 ? "secretaria" : "tesouraria");
      } else {
        alert(`Erro: ${data.erro}`);
      }
    })
    .catch((error) => {
      alert(`Erro ao gerar senha: ${error.message}`);
    });
}

function toggleDropdown(setor) {
  const dropdownSecretaria = document.getElementById("dropdown-secretaria");
  const dropdownTesouraria = document.getElementById("dropdown-tesouraria");

  if (setor === "secretaria") {
    dropdownTesouraria.classList.remove("show");
    dropdownSecretaria.classList.toggle("show");
  } else if (setor === "tesouraria") {
    dropdownSecretaria.classList.remove("show");
    dropdownTesouraria.classList.toggle("show");
  }
}
