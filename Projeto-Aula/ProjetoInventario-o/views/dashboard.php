<?php 
/** 
 * views/dashboard.php — Versão de Teste Estável 
 */ 
session_start(); 
 
// Proteção: Se a sessão não existir, joga de volta para o login de forma relativa 
if (empty($_SESSION["usuario_id"])) { 
    header("Location: login.php"); 
    exit; 
} 
?> 
<!DOCTYPE html> 
<html lang="pt-BR"> 
<head> 
    <meta charset="UTF-8"> 
    <title>Painel do Sistema</title> 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"> 
</head> 
<body class="bg-light p-5"> 
    <div class="container bg-white p-5 rounded shadow"> 
        <h1 class="text-success">🎉 Login Efetuado com Sucesso!</h1> 
        <p class="lead">Bem-vindo ao painel, <strong><?= htmlspecialchars($_SESSION["usuario_nome"]) ?></strong>.</p> 
        <hr> 
        <p>A infraestrutura de autenticação segura e sessões está operando corretamente na porta 8080.</p> 
    </div> 
</body> 
</html>
