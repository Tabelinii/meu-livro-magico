import { Module } from '@nestjs/common';
import { GitHubSyncService } from './services/github-sync.service';

@Module({
  providers: [GitHubSyncService],
  exports: [GitHubSyncService],
})
export class CommonModule {}

