import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const saltOrRound = 10;
    const hash = await bcrypt.hash('admin', saltOrRound);
    const admin = await prisma.user.create({ data: { email: 'admin@mailnesia.com', password: hash } });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
