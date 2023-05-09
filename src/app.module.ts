import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PrismaModule, AdminModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
