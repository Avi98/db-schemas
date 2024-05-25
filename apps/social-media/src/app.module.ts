import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseProviderModule } from './database-provider/database-provider.module';

@Module({
  imports: [DatabaseProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
