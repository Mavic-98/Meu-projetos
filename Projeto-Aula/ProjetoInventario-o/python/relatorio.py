import csv 
from datetime import datetime 
 
class GeradorRelatorio: 
    """Formata e exporta os dados analisados pelo sistema [11].""" 
    def __init__(self, analisador): 
        self._a = analisador 
 
    def gerar_console(self) -> None: 
        """Exibe o relatório formatado no terminal [13].""" 
        kpis = self._a.calcular_kpis() 
        print("=" * 50) 
        print(f"RELATÓRIO DE ESTOQUE - {datetime.now():%d/%m/%Y}") 
        print(f"Total Itens: {kpis['total_produtos']} | Críticos: {kpis['total_criticos']}") 
        print(f"Valor Patrimonial: R$ {kpis['valor_estoque']:,.2f}") 
        print("=" * 50) 
 
    def gerar_csv(self, caminho: str = "relatorios/relatorio_estoque.csv") -> None: 
        """Exporta a lista completa de produtos para formato CSV [12].""" 
        campos = ["id", "nome", "estoque", "status"] 
        with open(caminho, "w", newline="", encoding="utf-8") as f: 
            writer = csv.DictWriter(f, fieldnames=campos) 
            writer.writeheader() 
            for p in self._a.produtos: 
                writer.writerow({ 
                    "id": p.id, "nome": p.nome, "estoque": p.estoque, 
                    "status": "CRÍTICO" if p.esta_critico else "OK" 
                }) 
        print(f"✅ Relatório CSV gerado em: {caminho}") 
