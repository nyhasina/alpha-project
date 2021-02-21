/* eslint-disable */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
    const saltOrRound = 10;
    const hash = await bcrypt.hash('admin', saltOrRound);

    const currencies = [
        {
            code: 'USD',
            label: 'United States Dollar',
        },
        {
            code: 'EUR',
            label: 'Euro',
        },
    ];

    for (const currency of currencies) {
        await prisma.currency.upsert({
            where: { code: currency.code },
            update: { code: currency.code, label: currency.label },
            create: { code: currency.code, label: currency.label },
        });
    }

    const languages = [
        {
            code: 'FR',
            label: 'Français',
        },
        {
            code: 'English US',
            label: 'United States of America English',
        },
    ];

    for (const language of languages) {
        await prisma.language.upsert({
            where: { code: language.code },
            update: { code: language.code, label: language.label },
            create: { code: language.code, label: language.label },
        });
    }

    const fr = await prisma.language.findUnique({ where: { code: 'FR' } });
    const euro = await prisma.currency.findUnique({ where: { code: 'EUR' } });

    const admin = await prisma.user.upsert({
        where: { email: 'admin@mailnesia.com' },
        update: {
            password: hash,
            profile: {
                create: {
                    username: 'admin',
                    firstname: 'Thierry',
                    lastname: 'Houssein',
                    currency: {
                        connect: {
                            id: euro.id,
                        },
                    },
                    language: {
                        connect: {
                            id: fr.id,
                        },
                    },
                },
            },
        },
        create: {
            email: 'admin@mailnesia.com',
            password: hash,
            profile: {
                create: {
                    username: 'admin',
                    firstname: 'Thierry',
                    lastname: 'Houssein',
                    currency: {
                        connect: {
                            id: euro.id,
                        },
                    },
                    language: {
                        connect: {
                            id: fr.id,
                        },
                    },
                },
            },
        },
    });

    const platforms = [
        'Playstation 5',
        'Playstation 4',
        'Playstation Network',
        'Playstation 3',
        'Playstation 2',
        'Playstation',
        'PC',
        'Xbox One',
        'Xbox 360',
        'Xbox Series',
    ];

    for (const platform of platforms) {
        await prisma.platform.upsert({
            where: { name: platform },
            update: { name: platform },
            create: { name: platform },
        });
    }

    const ps5 = await prisma.platform.findUnique({ where: { name: 'Playstation 5' } });
    const games = [
        `Assassin's Creed Valhalla`,
        `Marvel's Spider-Man: Miles Morales (2020)`,
        'Resident Evil Village',
        'Cyberpunk 2077',
        'Grand Turismo 7',
        'Watch Dogs: Legion',
        'Godfall 2020',
        'Sackboy: A Big Adventure',
        'Call of Duty: Black-Ops Coldwar',
        'Destruction Allstars',
        'FIFA 21',
        'Ratchet and Clank: Rift Apart',
        `Astro's Playroom`,
        'Dirt 5',
        'NBA 2K21',
        'Bugsnax',
        'Outriders',
    ];

    for (const game of games) {
        await prisma.game.upsert({
            where: { name: game },
            create: { name: game, coverImage: '', platforms: { connect: [{ id: ps5.id }] } },
            update: {
                name: game,
                platforms: { set: [], connect: [{ id: ps5.id }] },
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
