<?php 
/** 
 * views/produto_form.php — Formulário de Cadastro e Edição 
 */ 
 
// Verificação de segurança: garante que o usuário está logado 
if (empty($_SESSION["usuario_id"])) { 
    header("Location: login.php"); 
    exit; 
} 
 
// Define se é uma edição ou um novo cadastro para mudar o título da página 
$editando = !empty($item['id']); 
$titulo = $editando ? "Editar Produto" : "Novo Produto"; 
 
require_once "layout_header.php"; // Inclui o topo padrão [6] 
?> 
 
<div class="container mt-4"> 
    <div class="card shadow"> 
        <div class="card-header bg-primary text-white"> 
            <h3 class="mb-0"><?= $titulo ?></h3> 
        </div> 
        <div class="card-body"> 
            <form action="produtos.php?acao=salvar" method="POST"> 
                <!-- Campo oculto para o ID (essencial para o Update) [7] --> 
                <input type="hidden" name="id" value="<?= $item['id'] ?? '' ?>"> 
 
                <div class="row"> 
                    <!-- Nome do Produto --> 
                    <div class="col-md-8 mb-3"> 
                        <label for="nome" class="form-label">Nome do Produto</label> 
                        <input type="text" name="nome" id="nome" class="form-control"  
                               value="<?= htmlspecialchars($item['nome'] ?? '') ?>" required> 
                    </div> 
 
                    <!-- Categoria [8] --> 
                    <div class="col-md-4 mb-3"> 
                        <label for="categoria_id" class="form-label">Categoria</label> 
                        <select name="categoria_id" id="categoria_id" class="form-select"> 
                            <option value="">Selecione...</option> 
                            <!-- Nota: Em um sistema real, estas opções viriam de uma tabela 'categorias' [9] --> 
                            <option value="1" <?= ($item['categoria_id'] ?? '') == 1 ? 'selected' : '' ?>>Eletrônicos</option> 
                            <option value="2" <?= ($item['categoria_id'] ?? '') == 2 ? 'selected' : '' ?>>Escritório</option> 
                            <option value="3" <?= ($item['categoria_id'] ?? '') == 3 ? 'selected' : '' ?>>Limpeza</option> 
                        </select> 
                    </div> 
 
                    <!-- Descrição --> 
                    <div class="col-md-12 mb-3"> 
                        <label for="descricao" class="form-label">Descrição Detalhada</label> 
                        <textarea name="descricao" id="descricao" class="form-control" rows="3"><?= htmlspecialchars($item['descricao'] ?? '') ?></textarea> 
                    </div> 
 
                    <!-- Preço de Venda [8] --> 
                    <div class="col-md-3 mb-3"> 
                        <label for="preco" class="form-label">Preço de Venda (R$)</label> 
                        <input type="number" step="0.01" name="preco" id="preco" class="form-control"  
                               value="<?= $item['preco'] ?? '0.00' ?>" required> 
                    </div> 
 
                    <!-- Preço de Custo [8] --> 
                    <div class="col-md-3 mb-3"> 
                        <label for="custo" class="form-label">Preço de Custo (R$)</label> 
                        <input type="number" step="0.01" name="custo" id="custo" class="form-control"  
                               value="<?= $item['custo'] ?? '0.00' ?>" required> 
                    </div> 
 
                    <!-- Estoque Atual [8] --> 
                    <div class="col-md-3 mb-3"> 
                        <label for="estoque" class="form-label">Estoque Inicial</label> 
                        <input type="number" name="estoque" id="estoque" class="form-control"  
                               value="<?= $item['estoque'] ?? '0' ?>" <?= $editando ? 'readonly' : '' ?> required> 
                        <?php if($editando): ?> 
                            <small class="text-muted">Use o módulo de Movimentações para alterar o saldo.</small> 
                        <?php endif; ?> 
                    </div> 
 
                    <!-- Estoque Mínimo (Alerta) [10] --> 
                    <div class="col-md-3 mb-3"> 
                        <label for="estoque_min" class="form-label">Estoque Mínimo</label> 
                        <input type="number" name="estoque_min" id="estoque_min" class="form-control"  
                               value="<?= $item['estoque_min'] ?? '10' ?>" required> 
                    </div> 
                </div> 
 
                <div class="mt-4 border-top pt-3 text-end"> 
                    <a href="produtos.php?acao=listar" class="btn btn-outline-secondary">Cancelar</a> 
                    <button type="submit" class="btn btn-success">Salvar Produto</button> 
                </div> 
            </form> 
        </div> 
    </div> 
</div> 
 
<?php require_once "layout_header.php"; // Inclui o rodapé padrão [6] ?> 
