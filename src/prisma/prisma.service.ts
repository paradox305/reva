import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
}

@Injectable()
export class DatabaseService {
  constructor(private prisma: PrismaService) {}

  // Find Folders by user_uuid
  async getUserByEmail(email) {
    try {
      let response = await this.prisma.user.findUnique({
        where: { USER_EMAIL: email },
      });
      return response;
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
  async createCompany(
    company_name,
    company_address,
    company_description,
    user,
  ) {
    try {
      let response = await this.prisma.company.create({
        data: {
          COMPANY_NAME: company_name,
          COMPANY_ADDRESS: company_address,
          USER_UUID: user.user_uuid,
          COMPANY_DESCRIPTION: company_description,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }
  async createTables(data, company_uuid) {
    try {
      for (const TABLE of data) {
        TABLE['COMPANY_UUID'] = company_uuid;
      }
      let response = await this.prisma.table.createMany({ data: data });
      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async createMenu(data, company_uuid) {
    try {
      for (const menu of data) {
        menu['COMPANY_UUID'] = company_uuid;
      }
      let response = await this.prisma.menu.createMany({ data: data });
      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
