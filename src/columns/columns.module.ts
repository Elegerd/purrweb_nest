import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsController } from './columns.controller';
import { Column } from './columns.entity';
import { ColumnsService } from './columns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  providers: [ColumnsService],
  controllers: [ColumnsController],
})
export class ColumnsModule {}
