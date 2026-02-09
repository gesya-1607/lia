import {
  Injectable,
  NotFoundException,
  BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePengembalianBukuDto } from './dto/create-pengembalian_buku.dto';

@Injectable()
export class PengembalianBukuService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================
  // CREATE PENGEMBALIAN
  // =========================
  async create(dto: CreatePengembalianBukuDto) {
    // 1. cek peminjaman
    const peminjaman = await this.prisma.peminjaman_Buku.findUnique({
      where: { id_peminjaman: dto.id_peminjaman },
      include: { pengembalian: true },
    });

    if (!peminjaman) {
      throw new NotFoundException('Peminjaman tidak ditemukan');
    }

    // 2. cek apakah sudah dikembalikan
    if (peminjaman.pengembalian.length > 0) {
      throw new BadRequestException('Buku sudah dikembalikan');
    }

    // 3. simpan pengembalian
    return this.prisma.pengembalian_Buku.create({
      data: {
        id_peminjaman: dto.id_peminjaman,
        tanggal_kembali: dto.tanggal_kembali ?? new Date(),
      },
    });
  }

  // =========================
  // GET ALL
  // =========================
  async findAll() {
    return this.prisma.pengembalian_Buku.findMany({
      orderBy: { id_pengembalian: 'desc' },
      include: {
        peminjaman: true,
      },
    });
  }

  // =========================
  // GET ONE
  // =========================
  async findOne(id: number) {
    const data = await this.prisma.pengembalian_Buku.findUnique({
      where: { id_pengembalian: id },
    });

    if (!data) {
      throw new NotFoundException('Data pengembalian tidak ditemukan');
    }

    return data;
  }

  // =========================
  // DELETE
  // =========================
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.pengembalian_Buku.delete({
      where: { id_pengembalian: id },
    });
  }
}
