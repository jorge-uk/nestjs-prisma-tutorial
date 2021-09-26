import { Body, Controller, Get, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './product.dto';
import { ApiDataInterceptor, ApiDatumInterceptor } from '../api-responses/api-responses.interceptor';

@Controller('products')
export class ProductsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  @UseInterceptors(ApiDataInterceptor)
  findAll(): Promise<ProductDto[]> {
    return this.prismaService.product.findMany();
  }

  @Get('/:id')
  @UseInterceptors(ApiDatumInterceptor)
  findById(@Param('id', ParseIntPipe) id: number): Promise<ProductDto> {
    return this.prismaService.product.findUnique({
      where: { id },
    });
  }

  @Post()
  create(
    @Body() { name, price, description }: ProductDto,
  ): Promise<ProductDto> {
    return this.prismaService.product.create({ data: { name, price, description }});
  }
}
