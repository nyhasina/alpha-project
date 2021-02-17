import { Injectable } from '@nestjs/common';
import { Prisma, } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {
  }
}
