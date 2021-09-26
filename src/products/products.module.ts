import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [PrismaService]
})
export class ProductsModule {}
