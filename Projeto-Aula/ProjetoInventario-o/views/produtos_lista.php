<?php  
/** 
 * views/produtos_lista.php — View: Tabela de listagem de produtos 
 */ 
require "views/layout_header.php"; // Inclui o topo padrão com o menu [4] 
?> 
 
<div class="container mt-4"> 
    <div class="d-flex justify-content-between align-items-center mb-3"> 
        <h2>📦 Produtos em Estoque</h2> 
        <!-- Link para o controlador abrir o formulário de novo cadastro [4] --> 
        <a href="produtos.php?acao=novo" class="btn btn-primary">+ Novo Produto</a> 
    </div> 
 
    <!-- Exibição de mensagens de sucesso (Feedback do Usuário) [5] --> 
    <?php if (!empty($_GET["msg"])): ?> 
        <div class="alert alert-success alert-dismissible fade show" role="alert"> 
            <?= $_GET["msg"] === "salvo" ? "Produto salvo com sucesso!" : "Produto excluído do sistema." ?> 
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> 
        </div> 
    <?php endif; ?> 
 
    <div class="table-responsive shadow-sm"> 
        <table class="table table-striped table-hover table-bordered align-middle"> 
            <thead class="table-dark"> 
                <tr> 
                    <th>#</th> 
                    <th>Nome</th> 
                    <th>Categoria</th> 
                    <th>Preço</th> 
                    <th>Custo</th> 
                    <th>Estoque</th> 
                    <th>Mín.</th> 
                    <th>Status</th> 
                    <th class="text-center">Ações</th> 
                </tr> 
            </thead> 
            <tbody> 
            <?php foreach ($produtos as $p): ?> 
                <!-- Lógica de Negócio: Identifica se o item está abaixo do estoque mínimo [5] --> 
                <?php $critico = $p["estoque"] < $p["estoque_min"]; ?> 
                 
                <tr class="<?= $critico ? "table-danger" : "" ?>"> 
                    <td><?= $p["id"] ?></td> 
                    <td><strong><?= htmlspecialchars($p["nome"]) ?></strong></td> 
                    <td><?= htmlspecialchars($p["categoria"] ?? "—") ?></td> 
                    <td>R$ <?= number_format($p["preco"], 2, ",", ".") ?></td> 
                    <td>R$ <?= number_format($p["custo"], 2, ",", ".") ?></td> 
                    <td><?= $p["estoque"] ?></td> 
                    <td><?= $p["estoque_min"] ?></td> 
                    <td> 
                        <!-- Alertas visuais baseados na análise de estoque [5] --> 
                        <?php if ($critico): ?> 
                            <span class="badge bg-danger">⚠ Crítico</span> 
                        <?php else: ?> 
                            <span class="badge bg-success">✓ OK</span> 
                        <?php endif; ?> 
                    </td> 
                    <td class="text-center"> 
                        <!-- Links de ação que enviam o ID para o controlador produtos.php [6] --> 
                        <a href="produtos.php?acao=editar&id=<?= $p["id"] ?>"  
                           class="btn btn-sm btn-warning">Editar</a> 
                         
                        <a href="produtos.php?acao=excluir&id=<?= $p["id"] ?>"  
                           class="btn btn-sm btn-danger"  
                           onclick="return confirm('Tem certeza que deseja excluir este produto?')">Excluir</a> 
                    </td> 
                </tr> 
            <?php endforeach; ?> 
            </tbody> 
        </table> 
    </div> 
</div> 
 
<?php require "views/layout_footer.php"; // Inclui o rodapé padrão [6] ?> 
