import { Body, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async getTables(user, query) {
    try {
      // Check if user is employee of the company or admin
      let employee = await this.prisma.employee.findFirst({
        where: { USER_UUID: user.user_uuid, COMPANY_UUID: query.COMPANY_UUID },
      });
      if (!employee) {
        throw new Error('User not authorized.');
      }
      let response = await this.prisma.table.findMany({
        where: { COMPANY_UUID: query.COMPANY_UUID },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async createSession(user, body) {
    try {
      // Check if user is employee of the company
      let employee = await this.prisma.employee.findFirst({
        where: { USER_UUID: user.user_uuid, COMPANY_UUID: body.COMPANY_UUID },
      });
      if (!employee) {
        throw new Error('User not authorized.');
      }

      // Previous active session uuid for table
      let activeSessions = await this.prisma.session.findMany({
        where: {
          TABLE_UUID: body.TABLE_UUID,
          COMPANY_UUID: body.COMPANY_UUID,
          STATUS: false,
          EMPLOYEE_UUID: employee.EMPLOYEE_UUID,
        },
      });
      if (activeSessions.length) {
        return activeSessions[0];
      }
      // Create a session if no active session for table
      let { TABLE_UUID, COMPANY_UUID, CUSTOMER_NAME, CUSTOMER_PHONE, STATUS } =
        body;
      let session = await this.prisma.session.create({
        data: {
          TABLE_UUID,
          COMPANY_UUID,
          CUSTOMER_NAME,
          CUSTOMER_PHONE,
          STATUS,
          EMPLOYEE_UUID: employee.EMPLOYEE_UUID,
        },
      });
      return session;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async placeOrder(user, body) {
    try {
      // Check if user is employee of the company
      let employee = await this.prisma.employee.findFirst({
        where: { USER_UUID: user.user_uuid, COMPANY_UUID: body.COMPANY_UUID },
      });
      if (!employee) {
        throw new Error('User not authorized.');
      }

      // Place orders for that session
      for (const order of body.ORDERS) {
        order['SESSION_UUID'] = body.SESSION_UUID;
      }
      let order = await this.prisma.order.createMany({
        data: body.ORDERS,
      });
      return order;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async getOrders(user, query) {
    try {
      // Check if user is employee of the company
      let employee = await this.prisma.employee.findFirst({
        where: { USER_UUID: user.user_uuid, COMPANY_UUID: query.COMPANY_UUID },
      });
      if (!employee) {
        throw new Error('User not authorized.');
      }

      let response = [];
      // Get active sessions for company
      let activeSessions = await this.prisma.session.findMany({
        where: { COMPANY_UUID: query.COMPANY_UUID, STATUS: false },
      });
      for (const session of activeSessions) {
        let orders = await this.prisma.order.findMany({
          where: {
            SESSION_UUID: session.SESSION_UUID,
            STATUS: { in: ['ADDED', 'IN-PROGRESS'] },
          },
          orderBy: { STATUS: 'asc' },
        });
        let table = await this.prisma.table.findFirst({
          where: { TABLE_UUID: session.TABLE_UUID },
        });
        let allOrdersForSession = [];
        for (const order of orders) {
          let menu = await this.prisma.menu.findFirst({
            where: { MENU_UUID: order.MENU_UUID },
          });
          allOrdersForSession.push({
            ORDER_UUID: order.ORDER_UUID,
            STATUS: order.STATUS,
            menu: menu,
            time_passed:
              (Date.now() - new Date(order.ORDER_UPDATED_AT).valueOf()) / 1000,
          });
        }
        response.push({
          Table: table.TABLE_NAME,
          order: allOrdersForSession,
        });
      }
      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async updateOrder(user, body) {
    try {
      // Check if user is employee of the company
      let employee = await this.prisma.employee.findFirst({
        where: { USER_UUID: user.user_uuid, COMPANY_UUID: body.COMPANY_UUID },
      });
      if (!employee) {
        throw new Error('User not authorized.');
      }
      let response = await this.prisma.order.update({
        where: { ORDER_UUID: body.ORDER_UUID },
        data: {
          STATUS: body.STATUS,
        },
      });
      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  async endSession(user, body) {
    try {
      // Check if user is employee of the company
      let employee = await this.prisma.employee.findFirst({
        where: { USER_UUID: user.user_uuid, COMPANY_UUID: body.COMPANY_UUID },
      });
      if (!employee) {
        throw new Error('User not authorized.');
      }

      let response = await this.prisma.session.update({
        where: { SESSION_UUID: body.SESSION_UUID },
        data: { STATUS: true },
      });
      // Generate a bill at session end

      return response;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
