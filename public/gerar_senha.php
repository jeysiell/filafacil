<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Colégio Adventista do Boqueirão - Gerar Senha</title>
    <link rel="stylesheet" href="../assets/css/gerarsenha.css" />
  </head>

  <body class="containermaster">
    <header>
      <a href="https://filafacil.free.nf/public/admin.php">
        <img
          src="../assets/fotos/logo-3 branco.png"
          alt="logo-3"
          class="responsive-logo"
        />
      </a>
    </header>

    <h2 class="titulo">Selecione o tipo de atendimento desejado</h2>

    <div class="container">
      <div class="setor">
        <button
          class="btn btn-primary btn-setor"
          onclick="toggleDropdown('secretaria')"
        >
          Secretaria
        </button>
        <div id="dropdown-secretaria" class="dropdown-senhas">
          <button
            class="btn btn-info button btn1"
            onclick="gerarSenha('matricula', 1)"
          >
            Matrícula
          </button>
          <button
            class="btn btn-info button btn2"
            onclick="gerarSenha('rematricula', 1)"
          >
            Rematrícula
          </button>
          <button
            class="btn btn-info button btn3"
            onclick="gerarSenha('atendimento', 1)"
          >
            Atendimento
          </button>
          <button
            class="btn btn-info button btn4"
            onclick="gerarSenha('bolsa', 1)"
          >
            Bolsa
          </button>
        </div>
      </div>

      <div class="setor">
        <button
          class="btn btn-primary btn-setor"
          onclick="toggleDropdown('tesouraria')"
        >
          Tesouraria
        </button>
        <div id="dropdown-tesouraria" class="dropdown-senhas">
          <button
            class="btn btn-info button btn1"
            onclick="gerarSenha('pagamentos', 2)"
          >
            Pagamentos
          </button>
          <button
            class="btn btn-info button btn2"
            onclick="gerarSenha('2viaboleto', 2)"
          >
            2° Via Boletos
          </button>
        </div>
      </div>
    </div>

    <script src="../config/JS/gerarsenha.js"></script>
  </body>
</html>
