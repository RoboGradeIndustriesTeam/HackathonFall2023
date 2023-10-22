import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';
import { FilesModule } from './files/files.module';
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/guards/roles.guards";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cfg: ConfigService) => ({uri: cfg.getOrThrow("DATABASE_URL")})
    }),
    UsersModule,
    AuthModule,
    NotesModule,
    FilesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class AppModule {}
