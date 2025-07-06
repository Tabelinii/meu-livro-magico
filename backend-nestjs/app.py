import subprocess
import os
import sys

# Configurar variáveis de ambiente para produção
os.environ['NODE_ENV'] = 'production'
os.environ['PORT'] = '3000'

def run_nestjs():
    """Executar aplicação NestJS"""
    try:
        # Executar npm install se necessário
        if not os.path.exists('node_modules'):
            print("📦 Instalando dependências...")
            subprocess.run(['npm', 'install'], check=True)
        
        # Fazer build se necessário
        if not os.path.exists('dist'):
            print("🔨 Fazendo build...")
            subprocess.run(['npm', 'run', 'build'], check=True)
        
        # Executar aplicação
        print("🚀 Iniciando aplicação NestJS em produção...")
        subprocess.run(['npm', 'run', 'start:production'], check=True)
        
    except subprocess.CalledProcessError as e:
        print(f"❌ Erro ao executar NestJS: {e}")
        sys.exit(1)

if __name__ == '__main__':
    run_nestjs()
