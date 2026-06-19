import requests 
 
class Config: 
    """Configurações de acesso à API REST do inventário [10].""" 
    BASE_URL   = "http://localhost/Inventario/api/estoque.php" 
    API_TOKEN  = "SEU_TOKEN_SECRETO_AQUI" 
    TIMEOUT	= 10 
    LIMITE_MIN = 10 
 
class ConectorAPI: 
    """Gerencia as requisições GET para o endpoint JSON [9].""" 
    def __init__(self, base_url: str, token: str): 
        self._url   = base_url 
        self._headers = {"Authorization": f"Bearer {token}"} 
 
    def buscar(self, acao: str = "todos") -> dict: 
        """Consome o endpoint e valida a resposta da API [9].""" 
        try: 
            resp = requests.get( 
                self._url,  
                headers=self._headers,  
                params={"acao": acao},  
                timeout=Config.TIMEOUT 
            ) 
            resp.raise_for_status() 
            return resp.json() 
        except Exception as e: 
            raise RuntimeError(f"Falha na comunicação com a API: {e}") 
