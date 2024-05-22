import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  // annu
  constructor(private readonly dataSource: DataSource) {}

  async getPerDaySales() {
    // await this.dataSource.getMetadata
  }
}
