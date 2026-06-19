<?php 
/** 
 * views/login.php — Autenticação segura com sessões PHP 
 */ 
session_start(); 
 
// 1. Se o usuário já estiver logado, redireciona para o dashboard 
if (!empty($_SESSION["usuario_id"])) { 
    header("Location: dashboard.php"); 
    exit; 
} 
 
require_once "../config/conexao.php"; 
$erro = ""; 
 
// 2. Garante a existência estável de um token CSRF na sessão antes de qualquer envio 
if (empty($_SESSION["csrf_token"])) { 
    $_SESSION["csrf_token"] = bin2hex(random_bytes(32)); 
} 
 
// 3. Processamento do Formulário de Login 
if ($_SERVER["REQUEST_METHOD"] === "POST") { 
    $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL); 
     
    // Captura o texto puro sem nenhuma transformação ou hash manual 
    $senha = isset($_POST["senha"]) ? trim($_POST["senha"]) : ""; 
 
    // Proteção contra ataques CSRF usando comparação estrita 
    if (empty($_POST["csrf_token"]) || $_POST["csrf_token"] !== $_SESSION["csrf_token"]) { 
        $erro = "Requisição inválida. Recarregue a página."; 
    } elseif (!$email) { 
        $erro = "Por favor, insira um e-mail válido."; 
    } else { 
        // Busca o usuário usando Prepared Statements para evitar SQL Injection 
        $stmt = getConexao()->prepare("SELECT id, nome, senha FROM usuarios WHERE email = :email AND ativo = 1 LIMIT 1"); 
        $stmt->execute(["email" => $email]); 
        $usuario = $stmt->fetch(); 
 
        // Verifica a senha usando o hash bcrypt nativo 
        if ($usuario && password_verify($senha, $usuario["senha"])) { 
             
            // 1º Define os dados na sessão atual para garantir que o PHP os grave em memória 
            $_SESSION["usuario_id"]   = $usuario["id"]; 
            $_SESSION["usuario_nome"] = $usuario["nome"]; 
             
            // 2º Regenera o ID mantendo os dados salvos (previne perda de sessão no ambiente local) 
            session_regenerate_id(false); 
             
            // Remove o token antigo para que não seja reutilizado 
            unset($_SESSION["csrf_token"]); 
             
            header("Location: dashboard.php"); 
            exit; 
        } else { 
            // Mensagem genérica por motivos de segurança 
            $erro = "Credenciais inválidas. Tente novamente."; 
        } 
    } 
} 
?> 
 
<!DOCTYPE html> 
<html lang="pt-BR"> 
<head> 
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Login — Sistema de Inventário</title> 
    <link rel="stylesheet" href="../public/css/style.css"> 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"> 
    <style> 
        /* Correção do atributo de altura mínima CSS */ 
        body { display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; } 
        .login-container { width: 100%; max-width: 400px; padding: 15px; } 
    </style> 
</head> 
<body class="bg-light"> 
 
<div class="login-container"> 
    <div class="card shadow"> 
        <div class="card-header text-center bg-dark text-white py-3"> 
            <h4>🔐 Acesso ao Sistema</h4> 
        </div> 
        <div class="card-body p-4"> 
             
            <?php if ($erro): ?> 
                <div class="alert alert-danger" style="font-size: 14px;"> 
                    <?= htmlspecialchars($erro) ?> 
                </div> 
            <?php endif; ?> 
 
            <form method="POST" action="" 
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION["csrf_token"]) ?>"> 
 
                <div class="form-group mb-3"> 
                    <label for="email">E-mail</label> 
                    <input type="email" name="email" id="email" class="form-control"  
                           placeholder="admin@inventario.com" required autofocus> 
                </div> 
 
                <div class="form-group mb-4"> 
                    <label for="senha">Senha</label> 
                    <input type="password" name="senha" id="senha" class="form-control"  
                           placeholder="Digite sua senha" required> 
                </div> 
 
                <div class="form-actions"> 
                    <button type="submit" class="btn btn-primary w-100 py-2">Entrar no Sistema</button> 
                </div> 
            </form> 
        </div> 
        <div class="card-footer text-center text-muted py-3"> 
            <small>Sistema de Inventário Inteligente &copy; <?= date('Y') ?></small> 
        </div> 
    </div> 
</div> 
 
</body> 
</html> 
