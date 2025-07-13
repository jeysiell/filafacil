<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistema de Senhas - Exibição</title>
    <link rel="stylesheet" href="../assets/css/display.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
</head>

<body>

    <div class="logo">
        <a href="https://filafacil.free.nf/public/admin.php">
            <img src="../assets/fotos/logo-3 branco.png" alt="logo">
        </a>
        <div class="logo-info">
            <span id="hora"></span> <!-- Hora aqui -->
        </div>
    </div>

    <div class="site-container">
        <div id="video-container">
            <iframe id="youtube-iframe" title="video-container" src="https://www.youtube.com/embed/5T-YfW4N6HI?autoplay=1&mute=1" autoplay; encrypted-media" allowfullscreen>
            </iframe>
        </div>

        <div id="senha-container" class="senha-container">
            <div class="senha-atual">
                <h1 id="titulosenha">Senha Atual</h1>
                <div id="senha-atual">...</div>
                <div id="tipo-setor">...</div> <!-- Setor exibido abaixo da senha -->
            </div>
            <div id="ultimas-senhas" class="ultimas-senhas">
                <h4>Senhas Anteriores</h4>
                <div id="senhas-lista"></div>
            </div>
        </div>

        <div class="text-bottom">
            <h2 id="texto">
                <i class="fab fa-whatsapp icon" title="WhatsApp" style="color: #63E6BE;"></i>
                47 3880-6250 &nbsp;&nbsp; &nbsp;&nbsp;
                <i class="fab fa-instagram icon" title="Instagram" style="background: #833ab4; border-radius: 12px; padding: 0 3px;
          background: linear-gradient(
            to right,
            #833ab4,#fd1d1d,#fcb045
          );"></i></i>
                colegioadventistablumenau &nbsp;&nbsp; &nbsp;&nbsp;
            </h2>
        </div>

    </div>
    <script src="../config/JS/display.js"></script>
</body>

</html>