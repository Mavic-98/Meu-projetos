<?php 
/** 
 * views/movimentacao_form.php — Formulário de registro de entrada/saída 
 */ 
 
// 1. Verificação de segurança 
if (empty($_SESSION["usuario_id"])) { 
    header("Location: login.php"); 
    exit; 
} 
 
// 2. Dependências para carregar a lista de produtos no select 
require_once "../classes/Produto.php"; 
$produtoModel = new Produto(); 
$listaProdutos = $produtoModel->listarTodos(); 
 
require_once "layout_header.php"; // Inclui o topo padrão [2, 3] 
?> 
 
<div class="container mt-4"> 
    <div class="row justify-content-center"> 
        <div class="col-md-8"> 
            <div class="card shadow"> 
                <div class="card-header bg-secondary text-white"> 
                    <h4 class="mb-0">🔄 Registrar Movimentação de Estoque</h4> 
                </div> 
                <div class="card-body"> 
                    <p class="text-muted mb-4">Utilize este formulário para registrar a entrada de novos lotes ou a saída de itens para uso/venda.</p> 
 
                    <form action="../movimentacoes.php?acao=salvar" method="POST"> 
                        <div class="row"> 
                            <!-- Seleção do Produto --> 
                            <div class="col-md-12 mb-3"> 
                                <label for="produto_id" class="form-label">Produto</label> 
                                <select name="produto_id" id="produto_id" class="form-select" required> 
                                    <option value="">-- Selecione o Produto --</option> 
                                    <?php foreach ($listaProdutos as $p): ?> 
                                        <option value="<?= $p['id'] ?>"> 
                                            <?= htmlspecialchars($p['nome']) ?> (Atual: <?= $p['estoque'] ?>) 
                                        </option> 
                                    <?php endforeach; ?> 
                                </select> 
                            </div> 
 
                            <!-- Tipo de Movimentação --> 
                            <div class="col-md-6 mb-3"> 
                                <label class="form-label d-block">Tipo de Operação</label> 
                                <div class="form-check form-check-inline"> 
                                    <input class="form-check-input" type="radio" name="tipo" id="entrada" value="entrada" checked> 
                                    <label class="form-check-label text-success" for="entrada">🟢 Entrada (Aumentar)</label> 
                                </div> 
                                <div class="form-check form-check-inline"> 
                                    <input class="form-check-input" type="radio" name="tipo" id="saida" value="saida"> 
                                    <label class="form-check-label text-danger" for="saida">🔴 Saída (Diminuir)</label> 
                                </div> 
                            </div> 
 
                            <!-- Quantidade --> 
                            <div class="col-md-6 mb-3"> 
                                <label for="quantidade" class="form-label">Quantidade</label> 
                                <input type="number" name="quantidade" id="quantidade" class="form-control" min="1" required> 
                            </div> 
 
                            <!-- Observações --> 
                            <div class="col-md-12 mb-4"> 
                                <label for="observacao" class="form-label">Observação / Motivo</label> 
                                <textarea name="observacao" id="observacao" class="form-control" rows="3" placeholder="Ex: Compra de novo lote, Ajuste de inventário, Saída para venda..."></textarea> 
                            </div> 
                        </div> 
 
                        <div class="form-actions border-top pt-3"> 
                            <button type="submit" class="btn btn-primary">Registrar Movimentação</button> 
                            <a href="dashboard.php" class="btn btn-outline-secondary">Cancelar</a> 
                        </div> 
                    </form> 
                </div> 
            </div> 
        </div> 
    </div> 
</div> 
 
<?php require_once "layout_footer.php"; // Inclui o rodapé padrão [2, 3] ?>
