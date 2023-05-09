import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { CreateEmployee } from './dto/createEmployee.dto';

@Controller('company')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('createCompany')
  @UseGuards(AuthGuard('jwt'))
  async createComapny(
    @Req() req: any,
    @Res() res,
    @Body() body: CreateCompanyDto,
  ) {
    try {
      let output = await this.adminService.createCompany(req.user, body);
      return res.status(200).json(output);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }

  @Post('createEmployee')
  @UseGuards(AuthGuard('jwt'))
  async addAdmin(@Req() req: any, @Res() res, @Body() body: CreateEmployee) {
    try {
      let output = await this.adminService.createEmployee(req.user, body);
      return res.status(200).json(output);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, 400);
    }
  }
}
