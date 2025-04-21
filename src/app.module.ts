import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartidoPoliticoModule } from './api/partido-politico/partido-politico.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { PropuestasModule } from './api/propuestas/propuestas.module';
import { GaleriaModule } from './api/galeria/galeria.module';
import { CronogramaModule } from './api/cronograma/cronograma.module';
import { CandidatosModule } from './api/candidatos/candidatos.module';
import { PersonaModule } from './api/persona/persona.module';
import { VotosModule } from './api/votos/votos.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'Proyecto',
    logging: true,
    autoLoadEntities: true,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  AuthModule, 
  UsersModule, 
  PartidoPoliticoModule, 
  PropuestasModule, 
  GaleriaModule, 
  CronogramaModule, 
  CandidatosModule, 
  PersonaModule,
  VotosModule,
],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    }
    ,AppService
  ],
})
export class AppModule {}
