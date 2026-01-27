import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PeminjamanBukuService} from './peminjaman_buku.service';
import { CreatePeminjamanBukuDto } from './dto/create-peminjaman_buku.dto';
import { UpdatePeminjamanBukuDto } from './dto/update-peminjaman_buku.dto';

@Controller('peminjaman-buku')
export class PeminjamanBukuController {
  constructor(private readonly peminjaman_bukuService: PeminjamanBukuService) {}

  @Post()
  create(@Body() dto: CreatePeminjamanBukuDto) {
    return this.peminjaman_bukuService.create(dto);
  }

  @Get()
  findAll() {
    return this.peminjaman_bukuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peminjaman_bukuService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePeminjamanBukuDto) {
    return this.peminjaman_bukuService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peminjaman_bukuService.remove(+id);
  }
}
