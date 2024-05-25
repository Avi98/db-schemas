import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  hello() {
    return 'hellow';
  }

  @Get('/sales-per-day:')
  getPerDaySales(@Query('date') date: Date) {
    // return this.appService.getSalesByDate(date);
  }

  @Get('/sales-max-sale-per-day')
  async getMaxSalesPerDay() {
    const val = await this.appService.getMaximumSalePerDay();
    console.log({ val });
    return val;
  }
}
