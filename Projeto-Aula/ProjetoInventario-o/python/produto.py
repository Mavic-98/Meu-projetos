from dataclasses import dataclass 
 
@dataclass 
class Produto: 
    """Representa um produto do inventário no motor de automação.""" 
    id:          int 
    nome:        str 
    preco:       float 
    custo:       float = 0.0 
    estoque:     int   = 0 
    estoque_min: int   = 10 
    categoria:   str   = "Sem categoria" 
    deficit:     int   = 0 
 
    @property 
    def esta_critico(self) -> bool: 
        """Retorna True se o estoque está abaixo do mínimo configurado [6].""" 
        return self.estoque < self.estoque_min 
 
    @property 
    def margem_lucro(self) -> float: 
        """Calcula a margem de lucro percentual do item [7].""" 
        if self.custo <= 0: 
            return 0.0 
        return round((self.preco - self.custo) / self.custo * 100, 2) 
 
    @property 
    def valor_em_estoque(self) -> float: 
        """Calcula o valor total imobilizado deste produto (preço * qtd) [7].""" 
        return round(self.preco * self.estoque, 2) 
