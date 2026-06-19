from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import io
import re

app = FastAPI()

# ✅ CORS corrigido
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, coloque o domínio do seu site
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/extrair-orcamento/")
async def extrair_orcamento(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        return {"erro": "O arquivo deve ser um PDF."}

    conteudo = await file.read()
    itens_extraidos = []

    try:
        with pdfplumber.open(io.BytesIO(conteudo)) as pdf:
            for pagina in pdf.pages:
                texto = pagina.extract_text()

                if not texto:
                    continue

                linhas = texto.split('\n')

                for linha in linhas:
                    # 🔍 Regex para capturar valores tipo: R$ 123,45
                    match = re.search(r'R\$\s*([\d.,]+)', linha)

                    if match:
                        valor_str = match.group(1)

                        # Converte "1.234,56" → 1234.56
                        valor = float(valor_str.replace('.', '').replace(',', '.'))

                        itens_extraidos.append({
                            "description": linha.strip(),
                            "quantity": 1,
                            "price": valor
                        })

        return {
            "filename": file.filename,
            "itens": itens_extraidos,
            "mensagem": "PDF processado com sucesso!"
        }

    except Exception as e:
        return {"erro": f"Erro ao processar PDF: {str(e)}"}