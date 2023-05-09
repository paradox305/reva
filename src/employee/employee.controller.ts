import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('tables')
  @UseGuards(AuthGuard('jwt'))
  async createComapny(@Req() req, @Res() res) {
    try {
      let output = await this.employeeService.getTables(req.user, req.query);
      return res.status(200).json(output);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  @Post('createSession')
  @UseGuards(AuthGuard('jwt'))
  async createSession(@Req() req, @Res() res, @Body() body) {
    try {
      let output = await this.employeeService.createSession(req.user, body);
      return res.status(200).json(output);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  @Post('placeOrders')
  @UseGuards(AuthGuard('jwt'))
  async placeOrder(@Req() req, @Res() res, @Body() body) {
    try {
      let output = await this.employeeService.placeOrder(req.user, body);
      return res.status(200).json(output);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  @Get('orders')
  @UseGuards(AuthGuard('jwt'))
  async getOrders(@Req() req, @Res() res) {
    try {
      let output = await this.employeeService.getOrders(req.user, req.query);
      return res.status(200).json(output);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  @Post('updateOrder')
  @UseGuards(AuthGuard('jwt'))
  async updateOrder(@Req() req, @Res() res, @Body() body) {
    try {
      let output = await this.employeeService.updateOrder(req.user, body);
      return res.status(200).json(output);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  @Post('endSession')
  @UseGuards(AuthGuard('jwt'))
  async endSession(@Req() req, @Res() res, @Body() body) {
    try {
      let output = await this.employeeService.endSession(req.user, body);
      return res.status(200).json(output);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
