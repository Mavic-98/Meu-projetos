<?php 
/** 
 * produtos.php — Controlador principal de produtos 
 */ 
session_start(); 
 
// Dependências necessárias 
require_once "config/conexao.php"; 
require_once "classes/Produto.php"; 
 
// 1. Verificação de Segurança: Garante que apenas usuários logados acessem [3] 
if (empty($_SESSION["usuario_id"])) { 
    header("Location: views/login.php"); 
    exit; 
} 
 
// 2. Inicialização do Model e Roteamento de Ações [4] 
$produto = new Produto(); 
$acao = $_GET["acao"] ?? "listar"; // Ação padrão é a listagem 
 
// Roteamento usando match (recurso do PHP 8+) para processar a requisição 
match ($acao) { 
    "listar"  => listar($produto), 
    "novo"	=> formulario($produto), 
    "salvar"  => salvar($produto), 
    "editar"  => formulario($produto, (int) ($_GET["id"] ?? 0)), 
    "excluir" => excluir($produto), 
    default   => listar($produto) 
}; 
 
/** 
 * Função para listar todos os produtos 
 */ 
function listar(Produto $p): void { 
    $produtos = $p->listarTodos(); 
    require "views/produtos_lista.php"; // Chama a View de listagem [4] 
} 
 
/** 
 * Função para exibir o formulário (Criação ou Edição) 
 */ 
function formulario(Produto $p, int $id = 0): void { 
    // Se houver ID, busca os dados do item para preencher o form, senão retorna vazio 
    $item = $id > 0 ? $p->buscarPorId($id) : []; 
    require "views/produto_form.php"; // Chama a View do formulário [4] 
} 
 
/** 
 * Função para salvar os dados (Insert ou Update) com sanitização [5] 
 */ 
function salvar(Produto $p): void { 
    // Filtro e sanitização rigorosa dos dados vindos do formulário [5] 
    $dados = [ 
        "nome"    	=> filter_input(INPUT_POST, "nome", FILTER_SANITIZE_SPECIAL_CHARS), 
        "descricao"   => filter_input(INPUT_POST, "descricao", FILTER_SANITIZE_SPECIAL_CHARS), 
        "preco"   	=> filter_input(INPUT_POST, "preco",  FILTER_VALIDATE_FLOAT), 
        "custo"   	=> filter_input(INPUT_POST, "custo",  FILTER_VALIDATE_FLOAT), 
        "estoque" 	=> filter_input(INPUT_POST, "estoque",  FILTER_VALIDATE_INT), 
        "estoque_min" => filter_input(INPUT_POST, "estoque_min", FILTER_VALIDATE_INT), 
        "categoria_id"=> filter_input(INPUT_POST, "categoria_id", FILTER_VALIDATE_INT), 
        "usuario_id"  => $_SESSION["usuario_id"], // Vincula ao usuário logado 
    ]; 
 
    $id = (int) ($_POST["id"] ?? 0); 
 
    // Se houver ID, atualiza; caso contrário, insere novo registro [6] 
    if ($id > 0) {  
        $p->atualizar($id, $dados);  
    } else {  
        $p->inserir($dados);  
    } 
 
    // Redireciona com mensagem de sucesso 
    header("Location: produtos.php?msg=salvo"); 
    exit; 
} 
 
/** 
 * Função para excluir um produto 
 */ 
function excluir(Produto $p): void { 
    $id = (int) ($_GET["id"] ?? 0); 
    if ($id > 0) { 
        $p->excluir($id); 
    } 
    header("Location: produtos.php?msg=excluido"); 
    exit; 
} 
