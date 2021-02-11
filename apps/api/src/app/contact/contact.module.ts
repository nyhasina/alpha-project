import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactResolver } from './contact.resolver';
import { ContactService } from './contact.service';

@Module({
    providers: [PrismaService, ContactResolver, ContactService],
})
export class ContactModule {}
