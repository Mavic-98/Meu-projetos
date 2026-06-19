<?php 
/** 
 * classes/Usuario.php — Modelo que encapsula autenticação e gestão de usuários 
 */ 
require_once __DIR__ . "/../config/conexao.php"; 
 
class Usuario { 
    private PDO $db; 
 
    public function __construct() { 
        $this->db = getConexao(); 
    } 
 
    /** 
     * Realiza a autenticação do usuário verificando e-mail e senha (hash) 
     *  
     * @param string $email E-mail fornecido no login 
     * @param string $senha Senha em texto plano para ser comparada com o hash 
     * @return array|false Retorna os dados do usuário se autenticado, ou false caso contrário 
     */ 
    public function autenticar(string $email, string $senha): array|false { 
        // Busca o usuário pelo e-mail e verifica se está ativo [6, 7] 
        $sql = "SELECT id, nome, senha FROM usuarios WHERE email = :email AND ativo = 1 LIMIT 1"; 
        $stmt = $this->db->prepare($sql); 
        $stmt->execute(["email" => $email]); 
        $usuario = $stmt->fetch(); 
 
        // password_verify() compara a senha com o hash bcrypt armazenado no banco [5, 8] 
        if ($usuario && password_verify($senha, $usuario["senha"])) { 
            return [ 
                "id"   => $usuario["id"], 
                "nome" => $usuario["nome"] 
            ]; 
        } 
 
        return false; 
    } 
 
    /** 
     * Busca informações de um usuário pelo seu ID 
     */ 
    public function buscarPorId(int $id): array|false { 
        $stmt = $this->db->prepare("SELECT id, nome, email, ativo, criado_em FROM usuarios WHERE id = :id"); 
        $stmt->execute(["id" => $id]); 
        return $stmt->fetch(); 
    } 
 
    /** 
     * (Opcional) Altera a senha do usuário gerando um novo hash seguro 
     */ 
    public function atualizarSenha(int $id, string $novaSenha): bool { 
        $hash = password_hash($novaSenha, PASSWORD_BCRYPT, ["cost" => 12]); 
        $stmt = $this->db->prepare("UPDATE usuarios SET senha = :senha WHERE id = :id"); 
        return $stmt->execute(["senha" => $hash, "id" => $id]); 
    } 
} 
