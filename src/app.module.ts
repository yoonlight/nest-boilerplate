import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config';

// const env = process.env;
// let mysql: TypeOrmModuleOptions;
// console.log('type');
// interface mariadb {
//   host: string;
//   port: number;
//   username: string;
//   password: string;
//   database: string;
// }

// if ('mysql' === env.DB_TYPE) {
//   mysql = {
//     type: 'mysql',
//     host: env.DB_HOST,
//     port: Number(env.DB_PORT),
//     username: env.DB_USER,
//     password: env.DB_PASS,
//     database: env.DB_NAME,
//     entities: [],
//   };
// } else {
//   mysql = {
//     type: 'sqlite',
//     database: env.SQLITE_PATH,
//   };
// }
@Module({
  imports: [
    // TypeOrmModule.forRoot(mysql),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('mariadb.host'),
        port: configService.get('mariadb.port'),
        username: configService.get('mariadb.username'),
        password: configService.get('mariadb.password'),
        database: configService.get('mariadb.databse'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private connection: Connection,
    private configService: ConfigService,
  ) {
    // console.log(this.configService.get<mariadb>('mariadb'));
  }
}
