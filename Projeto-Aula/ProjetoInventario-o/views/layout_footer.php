

<?php 
/** 
 * views/layout_footer.php — Rodapé HTML reutilizável 
 *  
 * Este arquivo fecha as tags estruturais abertas no header e inclui  
 * os scripts necessários para o funcionamento do Bootstrap e do sistema. 
 */ 
?> 
    </div> <!-- Fim da div .main-content (aberta no layout_header.php) --> 
 
    <footer class="footer"> 
        <div class="container"> 
            <p> 
                &copy; <?php echo date('Y'); ?> <strong>Sistema de Inventário Inteligente</strong>  
            	— Projeto Integrador 
            </p> 
            <small class="text-muted"> 
                Desenvolvido com PHP 8.x, MySQL e Automação Python 
            </small> 
        </div> 
    </footer> 
 
    <!-- Bootstrap 5 Bundle com Popper (Necessário para componentes interativos) --> 
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script> 
     
    <!-- Scripts personalizados do projeto (se houver) --> 
    <script src="../public/js/scripts.js"></script> 
</body> 
</html> 
