#!/bin/bash
# Adiciona todas as mudanças
git add .

# Define uma mensagem de commit com a data e hora atual
mensagem="Atualizacao automatica: $(date '+%Y-%m-%d %H:%M:%S')"

# Faz o commit e o push
git commit -m "$mensagem"
git push origin main
