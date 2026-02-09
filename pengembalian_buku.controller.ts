import { Body, Controller, Post, Get } from '@nestjs/common';
import { PengembalianBukuService } from './pengembalian_buku.service';
import { CreatePengembalianBukuDto } from './dto/create-pengembalian_buku.dto';

@Controller('pengembalian-buku')
export class PengembalianBukuController {
  constructor(
    private readonly pengembalianBukuService: PengembalianBukuService,
  ) {}

  @Post()
  create(@Body() dto: CreatePengembalianBukuDto) {
    return this.pengembalianBukuService.create(dto);
  }
  @Get()
  findAll() {
    return this.pengembalianBukuService.findAll();
  }
}
