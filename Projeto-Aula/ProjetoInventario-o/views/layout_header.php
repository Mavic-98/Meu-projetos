<!DOCTYPE html> 
<html lang="pt-BR"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Sistema de Inventário Inteligente</title> 
     
    <!-- Link para o CSS personalizado seguindo a estrutura de diretórios [7, 8] --> 
    <link rel="stylesheet" href="../public/css/style.css"> 
     
    <!-- Bootstrap 5 para componentes de interface e responsividade [3, 9] --> 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"> 
</head> 
<body> 
    <!-- Cabeçalho e Menu de Navegação Reutilizável [4, 7] --> 
    <header class="header bg-dark text-white py-3 mb-4 shadow"> 
        <div class="container d-flex justify-content-between align-items-center"> 
            <h1 class="h3 mb-0">📦 Inventário EeTePA</h1> 
             
            <nav class="menu d-flex gap-3"> 
                <a href="dashboard.php" class="text-white text-decoration-none">Dashboard</a> 
                <a href="../produtos.php?acao=listar" class="text-white text-decoration-none">Produtos</a> 
                <a href="movimentacao_form.php" class="text-white text-decoration-none">Movimentações</a> 
            </nav> 
 
            <!-- Exibição do usuário logado via Sessão [5, 6] --> 
            <div class="usuario text-end"> 
                <small class="d-block">Bem-vindo,</small> 
                <strong><?= htmlspecialchars($_SESSION["usuario_nome"] ?? 'Usuário') ?></strong> 
                <a href="../logout.php" class="btn btn-sm btn-outline-danger ms-2">Sair</a> 
            </div> 
        </div> 
    </header> 
 
    <!-- Início do conteúdo principal (será fechado no layout_footer.php) [4] --> 
    <main class="main-content container pb-5">
