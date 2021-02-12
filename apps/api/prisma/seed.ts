/* eslint-disable */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
    const saltOrRound = 10;
    const hash = await bcrypt.hash('admin', saltOrRound);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@mailnesia.com' },
        update: {
            password: hash,
        },
        create: {
            email: 'admin@mailnesia.com',
            password: hash,
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
