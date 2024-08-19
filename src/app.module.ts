import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { getMysqlTypeOrmModule } from './getMysqlTypeOrmModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    getMysqlTypeOrmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
