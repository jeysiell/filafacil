<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sistema de Senhas - Administração</title>

    <!-- CSS -->
    <link rel="stylesheet" href="../assets/css/admin.css" />

    <!-- Fontes -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=PT+Mono&display=swap"
        rel="stylesheet" />
</head>

<body id="body">
    <!-- Fundo escurecido -->
    <div id="overlay" class="overlay hidden"></div>

    <!-- Botão do Menu Hambúrguer -->
    <button id="menu-toggle" aria-label="Abrir menu" aria-expanded="false">
        <span></span>
    </button>

    <!-- Menu Lateral -->
    <div class="sidebar">
        <h2>Menu FilaFácil</h2>

        <!-- Menu Senhas -->
        <div class="dropdown text-center mt-2" id="dropdownSetoresWrapper">
            <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownSetores"
                aria-haspopup="true"
                aria-expanded="false">
                Menu Senhas
            </button>
            <div
                class="dropdown-menu text-center"
                aria-labelledby="dropdownSetores">
                <button class="dropdown-item" onclick="mostrarSetor('secretaria')">
                    Secretaria
                </button>
                <button class="dropdown-item" onclick="mostrarSetor('tesouraria')">
                    Tesouraria
                </button>
            </div>
        </div>

        <!-- Menu Admin -->
        <div class="dropdown text-center mt-3" id="dropdownAdminWrapper">
            <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownAdmin"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Menu Admin
            </button>
            <div class="dropdown-menu text-center" aria-labelledby="dropdownAdmin">
                <button class="dropdown-item" onclick="mostrarSetor('administracao')">
                    Configurar Impressora
                </button>
                <button class="dropdown-item disabled">Em breve...</button>
            </div>
        </div>

        <!-- Menu Telas -->
        <div class="dropdown text-center mt-3" id="dropdownTelasWrapper">
            <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownTelas"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Menu Telas
            </button>
            <div class="dropdown-menu text-center" aria-labelledby="dropdownTelas">
                <button
                    class="dropdown-item"
                    onclick="window.location.href='https://filafacil.free.nf/public/gerar_senha.php'">
                    Tela Gerar Senha
                </button>
                <button
                    class="dropdown-item"
                    onclick="window.location.href='https://filafacil.free.nf/public/display.php'">
                    Tela de Exibição
                </button>
                <button class="dropdown-item disabled">Em breve...</button>
            </div>
        </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="content">
        <!-- Secretaria -->
        <div id="setor-secretaria" class="setor ativo">
            <h1 class="titulo mt-3">SECRETARIA</h1>
            <div class="row mt-4">
                <!-- Matrícula -->
                <div class="col-md-4">
                    <div class="card text-white bg-primary mb-3 card-matricula">
                        <div class="card-header">Matrícula</div>
                        <div class="card-body">
                            <div class="espera-container">
                                <h5 class="card-title">Em Espera:</h5>
                                <p class="card-text" id="contador-matricula-secretaria">0</p>
                            </div>
                            <button
                                class="btn btn-light"
                                onclick="chamarSenhaPorTipo('matricula', 'secretaria' )">
                                Chamar Senha
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Rematrícula -->
                <div class="col-md-4">
                    <div class="card text-white bg-success mb-3 card-rematricula">
                        <div class="card-header">Rematrícula</div>
                        <div class="card-body">
                            <div class="espera-container">
                                <h5 class="card-title">Em Espera:</h5>
                                <p class="card-text" id="contador-rematricula-secretaria">0</p>
                            </div>
                            <button
                                class="btn btn-light"
                                onclick="chamarSenhaPorTipo( 'rematricula', 'secretaria')">
                                Chamar Senha
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Atendimento -->
                <div class="col-md-4">
                    <div class="card text-white bg-warning mb-3 card-atendimento">
                        <div class="card-header">Atendimento</div>
                        <div class="card-body">
                            <div class="espera-container">
                                <h5 class="card-title">Em Espera:</h5>
                                <p class="card-text" id="contador-atendimento-secretaria">0</p>
                            </div>
                            <button
                                class="btn btn-light"
                                onclick="chamarSenhaPorTipo('atendimento', 'secretaria')">
                                Chamar Senha
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Bolsa - Secretaria -->
                <div class="col-md-4">
                    <div class="card text-white bg-danger mb-3 card-bolsa">
                        <div class="card-header">Bolsa</div>
                        <div class="card-body">
                            <div class="espera-container">
                                <h5 class="card-title">Em Espera:</h5>
                                <p class="card-text" id="contador-bolsa-secretaria">0</p>
                            </div>
                            <button
                                class="btn btn-light"
                                onclick="chamarSenhaPorTipo('bolsa', 'secretaria')">
                                Chamar Senha
                            </button>
                        </div>
                    </div>
                </div>

                <div class="chamar-senha mt-4">
                    <p id="senha-chamada-secretaria" class="mt-3"></p>
                </div>
            </div>
        </div>

        <!-- Tesouraria -->
        <div id="setor-tesouraria" class="setor">
            <h1 class="titulo mt-3">TESOURARIA</h1>
            <div class="row mt-4">
                <div class="col-md-4">
                    <div class="card text-white bg-info mb-3 card-pagamentos">
                        <div class="card-header">Pagamentos</div>
                        <div class="card-body">
                            <div class="espera-container">
                                <h5 class="card-title">Em Espera:</h5>
                                <p class="card-text" id="contador-pagamentos-tesouraria">0</p>
                            </div>
                            <button
                                class="btn btn-light"
                                onclick="chamarSenhaPorTipo('pagamentos', 'tesouraria')">
                                Chamar Senha
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 2ª Via de Boletos - Tesouraria -->
                <div class="col-md-4">
                    <div class="card text-white bg-dark mb-3 card-2via">
                        <div class="card-header">2ª Via Boletos</div>
                        <div class="card-body">
                            <div class="espera-container">
                                <h5 class="card-title">Em Espera:</h5>
                                <p id="contador-2viaboleto-tesouraria">0</p>
                            </div>
                            <button
                                class="btn btn-light"
                                onclick="chamarSenhaPorTipo('2viaboleto', 'tesouraria')">
                                Chamar Senha
                            </button>
                        </div>
                    </div>
                </div>

                <div class="chamar-senha mt-4">
                    <p id="senha-chamada-tesouraria" class="mt-3"></p>
                </div>
            </div>
        </div>

        <!-- Administração -->
        <div id="setor-administracao" class="setor">
            <h1 class="titulo mt-3">Administração</h1>
            <section class="form-container" id="config-impressora">
                <h2 id="Impressora">Configuração da Impressora</h2>
                <label for="ip">IP da Impressora:</label>
                <input type="text" id="ip" placeholder="Ex: 192.168.0.100" />

                <label for="porta">Porta:</label>
                <input type="number" id="porta" placeholder="Ex: 9100" />

                <label for="timeout">Timeout (segundos):</label>
                <input type="number" id="timeout" placeholder="Ex: 5" />

                <button onclick="salvarConfig()">Salvar</button>
                <p class="msg" id="mensagem"></p>
            </section>
        </div>
    </div>

    <!-- Tela de carregamento -->
    <div id="loading-overlay">
        <div class="spinner"></div>
    </div>

    <!-- Scripts -->
    <script src="../config/JS/admin.js"></script>
</body>

</html>