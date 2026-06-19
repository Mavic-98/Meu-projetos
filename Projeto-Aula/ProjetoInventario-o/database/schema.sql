-- ============================================================ 
-- SISTEMA DE INVENTÁRIO INTELIGENTE — DDL Completo 
-- MySQL 8.0+ | Charset: utf8mb4 
-- ============================================================ 
 
CREATE DATABASE IF NOT EXISTS sistema_inventario  
  CHARACTER SET utf8mb4  
  COLLATE utf8mb4_unicode_ci; 
 
USE sistema_inventario; 
 
-- Tabela: usuarios 
CREATE TABLE IF NOT EXISTS usuarios ( 
  id     	INT UNSIGNED 	NOT NULL AUTO_INCREMENT, 
  nome       VARCHAR(100) 	NOT NULL, 
  email      VARCHAR(150) 	NOT NULL, 
  senha      VARCHAR(255) 	NOT NULL, -- hash bcrypt 
  criado_em  TIMESTAMP    	NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  ativo      TINYINT(1)   	NOT NULL DEFAULT 1, 
  PRIMARY KEY (id), 
  UNIQUE KEY uq_email (email) 
) ENGINE=InnoDB; [4] 
 
-- Tabela: categorias 
CREATE TABLE IF NOT EXISTS categorias ( 
  id     	INT UNSIGNED 	NOT NULL AUTO_INCREMENT, 
  nome       VARCHAR(80)  	NOT NULL, 
  descricao  TEXT, 
  criado_em  TIMESTAMP    	NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (id), 
  UNIQUE KEY uq_categoria_nome (nome) 
) ENGINE=InnoDB; [4, 7] 
 
-- Tabela: produtos 
CREATE TABLE IF NOT EXISTS produtos ( 
  id        	INT UNSIGNED   NOT NULL AUTO_INCREMENT, 
  nome          VARCHAR(100)   NOT NULL, 
  descricao 	TEXT, 
  preco         DECIMAL(10,2)  NOT NULL DEFAULT 0.00, 
  custo         DECIMAL(10,2)  NOT NULL DEFAULT 0.00, 
  estoque   	INT        	NOT NULL DEFAULT 0, 
  estoque_min   INT        	NOT NULL DEFAULT 10, 
  categoria_id  INT UNSIGNED, 
  usuario_id	INT UNSIGNED, 
  criado_em 	TIMESTAMP  	NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  atualizado_em TIMESTAMP  	NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
  PRIMARY KEY (id), 
  INDEX idx_categoria (categoria_id), 
  INDEX idx_usuario (usuario_id), 
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL ON UPDATE CASCADE, 
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL ON UPDATE CASCADE 
) ENGINE=InnoDB; [7] 
 
-- Tabela: movimentacoes (Log de auditoria) 
CREATE TABLE IF NOT EXISTS movimentacoes ( 
  id      	INT UNSIGNED 	NOT NULL AUTO_INCREMENT, 
  produto_id  INT UNSIGNED 	NOT NULL, 
  usuario_id  INT UNSIGNED, 
  tipo    	ENUM('entrada','saida') NOT NULL, 
  quantidade  INT          	NOT NULL, 
  observacao  TEXT, 
  data_hora   TIMESTAMP    	NOT NULL DEFAULT CURRENT_TIMESTAMP, 
  PRIMARY KEY (id), 
  FOREIGN KEY (produto_id) REFERENCES produtos(id) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL ON UPDATE CASCADE 
) ENGINE=InnoDB; [5, 7] 
 
-- View para Relatório de Estoque Crítico (Consumida pelo Python e PHP) 
CREATE OR REPLACE VIEW vw_estoque_critico AS 
  SELECT p.id, p.nome, p.estoque AS qtd_atual, p.estoque_min AS qtd_minima, 
         (p.estoque_min - p.estoque) AS deficit, p.preco,  
         c.nome AS categoria, u.nome AS responsavel 
  FROM produtos p 
  LEFT JOIN categorias c ON c.id = p.categoria_id 
  LEFT JOIN usuarios u ON u.id = p.usuario_id 
  WHERE p.estoque < p.estoque_min; [5] 
 
-- Procedure: Registrar Movimentação e Atualizar Estoque Atomicamente 
DELIMITER $$ 
CREATE PROCEDURE sp_movimentar_estoque( 
  IN p_produto_id INT UNSIGNED, IN p_usuario_id INT UNSIGNED, 
  IN p_tipo ENUM('entrada','saida'), IN p_quantidade INT, IN p_observacao TEXT 
) 
BEGIN 
  INSERT INTO movimentacoes (produto_id, usuario_id, tipo, quantidade, observacao) 
  VALUES (p_produto_id, p_usuario_id, p_tipo, p_quantidade, p_observacao); 
 
  IF p_tipo = 'entrada' THEN 
    UPDATE produtos SET estoque = estoque + p_quantidade WHERE id = p_produto_id; 
  ELSE 
    UPDATE produtos SET estoque = estoque - p_quantidade WHERE id = p_produto_id; 
  END IF; 
END$$ 
DELIMITER ; [6, 8] 
2. database/sementes.sql (DML para Testes) 
Este script deve ser executado após o schema.sql para popular o sistema com dados iniciais de demonstração 
. 
-- Usuário administrador (Senha: admin123) 
-- Nota: Em ambiente real, use o hash gerado pelo PHP [9, 10] 
INSERT INTO usuarios (nome, email, senha)  
VALUES ('Administrador', 'admin@inventario.com', '$2y$12$EXEMPLO_HASH_BCRYPT_AQUI'); [9] 
 
-- Categorias Iniciais 
INSERT INTO categorias (nome, descricao) VALUES  
('Eletrônicos', 'Computadores e periféricos'), 
('Escritório', 'Material de papelaria'), 
('Limpeza', 'Produtos de higiene'); [9] 
 
-- Produtos de Exemplo para testes de estoque crítico [11] 
INSERT INTO produtos (nome, preco, custo, estoque, estoque_min, categoria_id, usuario_id)  
VALUES  
('Notebook Dell Inspiron 15', 3499.90, 2800.00, 5, 10, 1, 1), -- Crítico [11, 12] 
('Mouse Sem Fio Logitech', 89.90, 45.00, 23, 5, 1, 1), 
('Teclado USB Abnt2', 79.90, 40.00, 2, 10, 1, 1); [11] 
