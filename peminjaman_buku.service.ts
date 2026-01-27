import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePeminjamanBukuDto } from './dto/create-peminjaman_buku.dto';
import { UpdatePeminjamanBukuDto } from './dto/update-peminjaman_buku.dto';

@Injectable()
export class PeminjamanBukuService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(dto: CreatePeminjamanBukuDto) {
    return this.prisma.peminjaman_Buku.create({
      data: {
        id_buku: dto.id_buku,
        id_siswa: dto.id_siswa,
        tanggal_pinjam: new Date(dto.tanggal_pinjam),
        tanggal_kembali: dto.tanggal_kembali
          ? new Date(dto.tanggal_kembali)
          : null,
      },
    });
  }

  // GET ALL
  async findAll() {
    return this.prisma.peminjaman_Buku.findMany({
      orderBy: { id_peminjaman: 'desc' },
      include: {
        buku: true,
        siswa: true,
      },
    });
  }

  // GET ONE PEMINJAMAN
  async findOne(id: number) {
    const peminjaman = await this.prisma.peminjaman_Buku.findUnique({
      where: { id_peminjaman: id },
      include: {
        buku: true,
        siswa: true,
      },
    });

    if (!peminjaman) {
      throw new NotFoundException('Data peminjaman tidak ditemukan');
    }

    return peminjaman;
  }

  // UPDATE
  async update(id: number, dto: UpdatePeminjamanBukuDto) {
    await this.findOne(id);

    return this.prisma.peminjaman_Buku.update({
      where: { id_peminjaman: id },
      data: {
        tanggal_kembali: dto.tanggal_kembali
        ? new Date(dto.tanggal_kembali)
       : null,
      },
    });
  }

  // DELETE
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.peminjaman_Buku.delete({
      where: { id_peminjaman: id },
    });
  }
}
