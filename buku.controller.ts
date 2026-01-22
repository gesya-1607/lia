import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BukuService } from './buku.service';
import { CreateBukuDto } from './dto/create-buku.dto';
import { UpdateBukuDto } from './dto/update-buku.dto';

@Controller('buku')
export class BukuController {
  constructor(private readonly bukuService: BukuService) {}

  @Post()
  create(@Body() dto: CreateBukuDto) {
    return this.bukuService.create(dto);
  }

  @Get()
  findAll() {
    return this.bukuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bukuService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBukuDto) {
    return this.bukuService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bukuService.remove(+id);
  }
}
