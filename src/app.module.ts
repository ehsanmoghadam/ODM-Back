import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ReportModule } from './Report/report.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', { dbName: 'ODM' }),
    AuthModule,
    UsersModule,
    OrganizationModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
