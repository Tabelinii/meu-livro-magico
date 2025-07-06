import { Module } from '@nestjs/common';
import { GitHubSyncService } from './services/github-sync.service';
import { SupabaseService } from './services/supabase.service';

@Module({
  providers: [GitHubSyncService, SupabaseService],
  exports: [GitHubSyncService, SupabaseService],
})
export class CommonModule {}

