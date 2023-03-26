import { Injectable } from '@nestjs/common';
import { DatabaseService, PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private database: DatabaseService,
    private prisma: PrismaService,
  ) {}
  async createCompany(user, body) {
    try {
      if (user.email != body.company_admin_email) {
        throw new Error('Please check your Email Address');
      }
      // Create a company
      let registeredUser = await this.database.getUserByEmail(
        body.company_admin_email,
      );
      console.log(registeredUser);
      if (!registeredUser) {
        throw new Error(
          'User not found in database, Please regester on our platform and then try again.',
        );
      }

      // Create a new company
      let company = await this.database.createCompany(
        body.company_name,
        body.company_address,
        body.company_description,
        user,
      );
      // Create Tables

      await this.database.createTables(body.table_data, company.COMPANY_UUID);
      await this.database.createMenu(body.menu, company.COMPANY_UUID);
      await this.prisma.employee.create({
        data: {
          EMPLOYEE_NAME: user.name,
          EMPLOYEE_TYPE: 'admin',
          EMPLOYEE_SALARY: 0,
          EMPLOYEE_JOINING_DATE: parseInt((Date.now() / 1000).toString()),
          USER_UUID: user.user_uuid,
          COMPANY_UUID: company.COMPANY_UUID,
          EMPLOYEE_TERMINATED_DATE: 0,
        },
      });
      return company;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }

  async createEmployee(user, body) {
    try {
      // Find if user is admin
      let admin = await this.prisma.company.findFirst({
        where: { USER_UUID: user.user_uuid, COMPANY_UUID: body.COMPANY_UUID },
      });
      console.log(admin, user);

      if (admin.USER_UUID != user.user_uuid) {
        throw new Error('User not authorized, attempt IP logged successfully');
      }
      // Add user

      let userExist = await this.prisma.user.findFirst({
        where: { USER_EMAIL: body.email },
      });

      if (!userExist) {
        // Add to user table
        userExist = await this.prisma.user.create({
          data: { USER_EMAIL: body.email, USER_NAME: body.EMPLOYEE_NAME },
        });
      }
      let employee = await this.prisma.employee.findFirst({
        where: { USER_UUID: userExist.USER_UUID },
      });
      if (employee && body.COMPANY_UUID != employee.COMPANY_UUID) {
        throw new Error('User is already a part of other comapny');
      }
      if (!employee) {
        let {
          EMPLOYEE_NAME,
          EMPLOYEE_TYPE,
          EMPLOYEE_SALARY,
          EMPLOYEE_JOINING_DATE,
          COMPANY_UUID,
        } = body;
        employee = await this.prisma.employee.create({
          data: {
            EMPLOYEE_NAME,
            EMPLOYEE_TYPE,
            EMPLOYEE_SALARY,
            EMPLOYEE_JOINING_DATE,
            COMPANY_UUID,
            USER_UUID: userExist.USER_UUID,
            EMPLOYEE_TERMINATED_DATE: 0,
          },
        });
      }
      // Add Employee

      return employee;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
