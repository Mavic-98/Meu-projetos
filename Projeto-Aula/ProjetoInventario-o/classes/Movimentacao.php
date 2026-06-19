<?php 
/** 
 * classes/Movimentacao.php — Model para gestão de fluxo de estoque 
 */ 
require_once __DIR__ . "/../config/conexao.php"; 
 
class Movimentacao { 
    private PDO $db; 
 
    public function __construct() { 
        $this->db = getConexao(); 
    } 
 
    /** 
     * Lista o histórico de todas as movimentações realizadas 
     */ 
    public function listarTodas(): array { 
        $sql = "SELECT m.*, p.nome AS produto_nome, u.nome AS usuario_nome  
                FROM movimentacoes m 
                JOIN produtos p ON p.id = m.produto_id 
                LEFT JOIN usuarios u ON u.id = m.usuario_id 
                ORDER BY m.data_hora DESC"; 
        return $this->db->query($sql)->fetchAll(); 
    } 
 
    /** 
     * Registra uma nova movimentação chamando a Procedure do MySQL 
     * Isso garante a atualização atômica do saldo do estoque [3, 4] 
     */ 
    public function registrar(int $produtoId, int $usuarioId, string $tipo, int $qtd, string $obs = ""): bool { 
        try { 
            // Chama a Stored Procedure definida no schema.sql [3] 
            $stmt = $this->db->prepare("CALL sp_movimentar_estoque(:prod, :user, :tipo, :qtd, :obs)"); 
             
            return $stmt->execute([ 
                "prod" => $produtoId, 
                "user" => $usuarioId, 
                "tipo" => $tipo, // 'entrada' ou 'saida' 
                "qtd"  => $qtd, 
                "obs"  => $obs 
            ]); 
        } catch (PDOException $e) { 
            // Caso a procedure dispare um erro (ex: estoque insuficiente), captura aqui 
            error_log("Erro ao movimentar estoque: " . $e->getMessage()); 
            return false; 
        } 
    } 
 
    /** 
     * Busca movimentações específicas de um único produto 
     */ 
    public function buscarPorProduto(int $produtoId): array { 
        $stmt = $this->db->prepare("SELECT * FROM movimentacoes WHERE produto_id = :id ORDER BY data_hora DESC"); 
        $stmt->execute(["id" => $produtoId]); 
        return $stmt->fetchAll(); 
    } 
} 
