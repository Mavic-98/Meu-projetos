from api_client import Config, ConectorAPI 
from produto import Produto 
from relatorio import GeradorRelatorio 
 
class AnalisadorEstoque: 
    """Motor que coordena a carga de dados e cálculo de indicadores [14].""" 
    def __init__(self): 
        self._api = ConectorAPI(Config.BASE_URL, Config.API_TOKEN) 
        self.produtos = [] 
 
    def carregar_dados(self): 
        """Busca JSON da API e popula os objetos Produto [14].""" 
        resposta = self._api.buscar(acao="todos") 
        self.produtos = [ 
            Produto( 
                id=int(item["id"]), nome=item["nome"],  
                preco=float(item["preco"]), estoque=int(item["estoque"]), 
                estoque_min=int(item.get("estoque_min", 10)) 
            ) for item in resposta.get("dados", []) 
        ] 
 
    def calcular_kpis(self) -> dict: 
        """Gera indicadores chave de desempenho (KPIs) [16].""" 
        return { 
            "total_produtos": len(self.produtos), 
            "total_criticos": len([p for p in self.produtos if p.esta_critico]), 
            "valor_estoque": sum(p.valor_em_estoque for p in self.produtos) 
        } 
 
if __name__ == "__main__": 
    try: 
        app = AnalisadorEstoque() 
        app.carregar_dados() 
         
        ui = GeradorRelatorio(app) 
        ui.gerar_console() 
        ui.gerar_csv() 
    except Exception as e: 
        print(f"Erro na execução: {e}") 
