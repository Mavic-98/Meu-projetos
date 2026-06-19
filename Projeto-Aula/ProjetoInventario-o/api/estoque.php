

<?php 
/** 
 * api/estoque.php — API REST para consumo externo (Python, Mobile, etc.) 
 * Suporte a: GET api/estoque.php?acao=todos|criticos|produto&id=N 
 */ 
 
// 1. Configuração de Cabeçalhos (Headers) para API JSON 
header("Content-Type: application/json; charset=utf-8"); 
header("Access-Control-Allow-Origin: *"); // Permite acesso externo (CORS) 
header("X-Content-Type-Options: nosniff"); 
 
// 2. Dependências (Ajustadas para a subpasta api/) 
require_once "../config/conexao.php"; 
require_once "../classes/Produto.php"; 
 
// 3. Segurança: Autenticação simples por Bearer Token 
// Este token deve coincidir com o configurado no script Python 
$token_esperado = "SEU_TOKEN_SECRETO_AQUI";  
$auth = $_SERVER["HTTP_AUTHORIZATION"] ?? ""; 
 
if ($auth !== "Bearer " . $token_esperado) { 
    http_response_code(401); 
    echo json_encode(["erro" => "Não autorizado. Token inválido ou ausente."]); 
    exit; 
} 
 
// 4. Inicialização do Model e Processamento da Ação 
$acao = $_GET["acao"] ?? "todos"; 
$produtoModel = new Produto(); 
 
try { 
    // Roteia a solicitação baseada no parâmetro 'acao' 
    $dados = match ($acao) { 
        "todos"	=> $produtoModel->listarTodos(), 
        "criticos" => $produtoModel->listarCriticos(), 
        "produto"  => $produtoModel->buscarPorId((int) ($_GET["id"] ?? 0)), 
        default	=> throw new InvalidArgumentException("Ação inválida.") 
    }; 
 
    // 5. Retorno do JSON formatado 
    echo json_encode([ 
        "status" => "ok", 
        "total"  => is_array($dados) ? count($dados) : (empty($dados) ? 0 : 1), 
        "dados"  => $dados, 
        "gerado" => date("Y-m-d H:i:s"), 
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); 
 
} catch (InvalidArgumentException $e) { 
    http_response_code(400); 
    echo json_encode(["erro" => $e->getMessage()]); 
} catch (Throwable $e) { 
    // Em caso de erro no banco ou código, loga e retorna erro 500 
    http_response_code(500); 
    error_log("Erro na API: " . $e->getMessage()); 
    echo json_encode(["erro" => "Erro interno do servidor ao processar os dados."]); 
} 
?> 
