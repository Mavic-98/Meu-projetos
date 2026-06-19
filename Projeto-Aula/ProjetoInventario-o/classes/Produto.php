<?php 
// classes/Produto.php — Encapsula acesso ao banco e regras de negócio [4] 
require_once __DIR__ . "/../config/conexao.php"; 
 
class Produto { 
    private PDO $db; 
 
    public function __construct() { 
        $this->db = getConexao(); 
    } 
 
    // Lista todos os produtos com suas categorias [4] 
    public function listarTodos(): array { 
        $sql = "SELECT p.*, c.nome AS categoria, u.nome AS responsavel  
                FROM produtos p  
                LEFT JOIN categorias c ON c.id = p.categoria_id  
                LEFT JOIN usuarios u ON u.id = p.usuario_id  
                ORDER BY p.nome ASC"; 
        return $this->db->query($sql)->fetchAll(); 
    } 
 
    public function buscarPorId(int $id): array|false { 
        $stmt = $this->db->prepare("SELECT * FROM produtos WHERE id = :id LIMIT 1"); 
        $stmt->execute(["id" => $id]); 
        return $stmt->fetch(); 
    } 
 
    public function inserir(array $dados): int { 
        $sql = "INSERT INTO produtos (nome, descricao, preco, custo, estoque, estoque_min, categoria_id, usuario_id)  
                VALUES (:nome, :descricao, :preco, :custo, :estoque, :estoque_min, :categoria_id, :usuario_id)"; 
        $stmt = $this->db->prepare($sql); 
        $stmt->execute($dados); 
        return (int) $this->db->lastInsertId(); 
    } 
 
    public function atualizar(int $id, array $dados): bool { 
        $sql = "UPDATE produtos SET nome = :nome, descricao = :descricao, preco = :preco,  
                custo = :custo, estoque = :estoque, estoque_min = :estoque_min, categoria_id = :categoria_id  
                WHERE id = :id"; 
        $dados["id"] = $id; 
        return $this->db->prepare($sql)->execute($dados); 
    } 
 
    public function excluir(int $id): bool { 
        return $this->db->prepare("DELETE FROM produtos WHERE id = :id")->execute(["id" => $id]); 
    } 
 
    // Retorna itens com estoque crítico via View do banco [5] 
    public function listarCriticos(): array { 
        return $this->db->query("SELECT * FROM vw_estoque_critico")->fetchAll(); 
    } 
} 
