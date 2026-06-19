<?php 
/** 
 * index.php - Controlador de entrada / Redirecionamento 
 *  
 * Este arquivo funciona como o ponto de entrada principal do sistema.  
 * Ele verifica a autenticação e decide se o usuário deve ver a tela de login  
 * ou o painel de controle (Dashboard). 
 */ 
 
// Inicia a sessão para verificar se o usuário está autenticado [3] 
session_start(); 
 
// Verifica se o ID do usuário está presente na sessão [4, 5] 
if (empty($_SESSION["usuario_id"])) { 
    // Caso não esteja logado, redireciona para a tela de login na pasta views [2] 
    header("Location: views/login.php"); 
} else { 
    // Caso o usuário já possua uma sessão ativa, redireciona para o dashboard [2] 
    header("Location: views/dashboard.php"); 
} 
 
// Interrompe a execução do script para garantir o redirecionamento imediato 
exit; 
?> 
