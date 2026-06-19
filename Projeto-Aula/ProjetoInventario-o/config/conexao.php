<?php 
/** 
 * config/conexao.php — Conexão global configurada para Arrays Associativos 
 */ 
 
function getConexao(): PDO { 
    $host	= "localhost"; 
    $db  	= "sistema_inventario"; 
    $user	= "root"; 
    $pass	= ""; // Altere se o seu MySQL local possuir senha 
    $charset = "utf8mb4"; 
 
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset"; 
 
    $opcoes = [ 
        // OBRIGATÓRIO: Garante que os retornos sejam mapeados pelo nome da coluna ($usuario["senha"]) 
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, 
        // Ativa o lançamento de exceções estruturais em caso de falhas 
        PDO::ATTR_ERRMODE        	=> PDO::ERRMODE_EXCEPTION, 
        // Desativa a emulação de comandos para máxima segurança 
        PDO::ATTR_EMULATE_PREPARES   => false, 
    ]; 
 
    try { 
        return new PDO($dsn, $user, $pass, $opcoes); 
    } catch (PDOException $e) { 
        die("Erro crítico de infraestrutura: " . $e->getMessage()); 
    } 
} 
 
