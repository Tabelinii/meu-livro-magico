import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class GitHubSyncService {
  private readonly logger = new Logger(GitHubSyncService.name);
  private readonly gitEnabled: boolean;

  constructor(private configService: ConfigService) {
    this.gitEnabled = this.configService.get('ENABLE_AUTO_GIT', 'true') === 'true';
  }

  async pullLatestChanges(): Promise<boolean> {
    if (!this.gitEnabled) {
      this.logger.log('Auto Git desabilitado');
      return true;
    }

    try {
      this.logger.log('🔄 Fazendo pull das últimas alterações...');
      
      // Verificar se há alterações remotas
      await execAsync('git fetch origin main');
      
      const { stdout: status } = await execAsync('git status -uno');
      
      if (status.includes('Your branch is behind')) {
        this.logger.log('📥 Alterações remotas detectadas, fazendo pull...');
        await execAsync('git pull origin main');
        this.logger.log('✅ Pull realizado com sucesso');
        return true;
      } else {
        this.logger.log('✅ Repositório já está atualizado');
        return true;
      }
    } catch (error) {
      this.logger.error('❌ Erro ao fazer pull:', error.message);
      return false;
    }
  }

  async pushChanges(message: string): Promise<boolean> {
    if (!this.gitEnabled) {
      this.logger.log('Auto Git desabilitado');
      return true;
    }

    try {
      this.logger.log('📤 Fazendo push das alterações...');
      
      // Verificar se há alterações para commit
      const { stdout: status } = await execAsync('git status --porcelain');
      
      if (!status.trim()) {
        this.logger.log('ℹ️ Nenhuma alteração para commit');
        return true;
      }

      // Adicionar todas as alterações
      await execAsync('git add .');
      
      // Fazer commit
      const commitMessage = message || `🔄 Atualização automática - ${new Date().toISOString()}`;
      await execAsync(`git commit -m "${commitMessage}"`);
      
      // Fazer push
      await execAsync('git push origin main');
      
      this.logger.log('✅ Push realizado com sucesso');
      return true;
    } catch (error) {
      this.logger.error('❌ Erro ao fazer push:', error.message);
      return false;
    }
  }

  async syncWithGitHub(commitMessage?: string): Promise<boolean> {
    if (!this.gitEnabled) {
      return true;
    }

    try {
      this.logger.log('🔄 Sincronizando com GitHub...');
      
      // Primeiro fazer pull
      const pullSuccess = await this.pullLatestChanges();
      if (!pullSuccess) {
        return false;
      }

      // Depois fazer push das alterações locais
      const pushSuccess = await this.pushChanges(commitMessage);
      if (!pushSuccess) {
        return false;
      }

      this.logger.log('🎉 Sincronização com GitHub concluída');
      return true;
    } catch (error) {
      this.logger.error('❌ Erro na sincronização:', error.message);
      return false;
    }
  }

  async getGitStatus(): Promise<{
    hasChanges: boolean;
    isUpToDate: boolean;
    branch: string;
  }> {
    try {
      const { stdout: statusOutput } = await execAsync('git status --porcelain');
      const { stdout: branchOutput } = await execAsync('git branch --show-current');
      
      await execAsync('git fetch origin main');
      const { stdout: behindOutput } = await execAsync('git status -uno');
      
      return {
        hasChanges: statusOutput.trim().length > 0,
        isUpToDate: !behindOutput.includes('Your branch is behind'),
        branch: branchOutput.trim(),
      };
    } catch (error) {
      this.logger.error('Erro ao obter status do Git:', error.message);
      return {
        hasChanges: false,
        isUpToDate: true,
        branch: 'unknown',
      };
    }
  }

  async enableAutoSync(): Promise<void> {
    this.logger.log('✅ Auto sincronização com GitHub habilitada');
  }

  async disableAutoSync(): Promise<void> {
    this.logger.log('❌ Auto sincronização com GitHub desabilitada');
  }
}

