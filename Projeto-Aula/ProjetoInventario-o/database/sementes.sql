-- ============================================================ 
-- DADOS DE EXEMPLO (DML) — Sistema de Inventário Inteligente 
-- Execute este script APÓS o schema.sql 
-- ============================================================ 
 
USE sistema_inventario; 
 
-- 1. Inserção do Usuário Administrador 
-- Nota: A senha 'admin123' deve ser gerada via password_hash() no PHP [2, 4] 
INSERT INTO usuarios (nome, email, senha) VALUES  
('Administrador', 'admin@inventario.com', '$2y$12$EXEMPLO_HASH_BCRYPT_AQUI'); 
 
-- 2. Inserção de Categorias Iniciais 
INSERT INTO categorias (nome, descricao) VALUES  
('Eletrônicos', 'Computadores, smartphones e periféricos'),  
('Escritório',  'Material de escritório e papelaria'),  
('Limpeza',     'Produtos de higiene e limpeza'),  
('Ferramentas', 'Ferramentas e equipamentos'); 
 
-- 3. Inserção de Produtos para Testes 
-- Alguns itens foram configurados propositalmente abaixo do estoque mínimo 
-- para testar os alertas no Dashboard e no Script Python [3, 5] 
INSERT INTO produtos (nome, preco, custo, estoque, estoque_min, categoria_id, usuario_id) VALUES  
('Notebook Dell Inspiron 15', 3499.90, 2800.00, 5, 10, 1, 1), -- Status: Crítico 
('Mouse Sem Fio Logitech',     89.90,   45.00, 23,  5, 1, 1), -- Status: OK 
('Caderno A4 100 Folhas',   	12.50,	6.00,  3, 20, 2, 1), -- Status: Crítico 
('Detergente 500ml',         	4.80,	2.50, 15, 30, 3, 1), -- Status: Crítico 
('Chave de Fenda Phillips',      18.90,	8.00, 50,  5, 4, 1), -- Status: OK 
('Teclado USB Abnt2',       	79.90,   40.00,  2, 10, 1, 1); -- Status: Crítico 
 
