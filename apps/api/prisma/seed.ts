/* eslint-disable */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const faker = require('faker');

const SALT_OR_ROUND = 10;

function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}

async function currencySeed() {
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
}

async function formatSeed() {
    const formats = [
        {
            code: 'SINGLE_ELIMINATION',
            name: 'Élimination directe',
        },
        {
            code: 'DOUBLE_ELIMINATION',
            name: 'Double élimination',
        },
        {
            code: 'ROUND_ROBIN',
            name: 'Toutes rondes',
        },
    ];
    for (const format of formats) {
        await prisma.format.upsert({
            where: { code: format.code },
            update: { code: format.code, name: format.name },
            create: { code: format.code, name: format.name },
        });
    }
}

async function languageSeed() {
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
}

async function userSeed() {
    const fr = await prisma.language.findUnique({ where: { code: 'FR' } });
    const euro = await prisma.currency.findUnique({ where: { code: 'EUR' } });

    const saltOrRound = 10;
    const hash = await bcrypt.hash('admin', saltOrRound);

    const email = 'admin@mailnesia.com';
    const password = await bcrypt.hash('admin', saltOrRound);
    const username = 'admin';
    const firstname = 'Thierry';
    const lastname = 'Houssein';
    const currency = euro.id;
    const language = fr.id;
    const admin = {
        email,
        password,
        username,
        firstname,
        lastname,
        currency,
        language,
    };

    function simpleUserSeed() {
        return new Array(150).fill(null).map(async (item) => {
            const firstname = faker.name.firstName();
            const lastname = faker.name.lastName();
            const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@gmail.com`;
            const password = await bcrypt.hash('password', SALT_OR_ROUND);
            const username = `${firstname.toLowerCase()}.${lastname.toLowerCase()}`;
            const currency = euro.id;
            const language = fr.id;
            const user = {
                email,
                password,
                username,
                firstname,
                lastname,
                currency,
                language,
            };
            return user;
        });
    }

    const users = await Promise.all([admin, ...simpleUserSeed()]);

    for (const item of users) {
        await prisma.user.upsert({
            where: { email: item.email },
            update: {
                password: item.password,
                profile: {
                    create: {
                        username: item.username,
                        firstname: item.firstname,
                        lastname: item.lastname,
                        currency: {
                            connect: {
                                id: item.currency,
                            },
                        },
                        language: {
                            connect: {
                                id: item.language,
                            },
                        },
                    },
                },
            },
            create: {
                email: item.email,
                password: item.password,
                profile: {
                    create: {
                        username: item.username,
                        firstname: item.firstname,
                        lastname: item.lastname,
                        currency: {
                            connect: {
                                id: item.currency,
                            },
                        },
                        language: {
                            connect: {
                                id: item.language,
                            },
                        },
                    },
                },
            },
        });
    }
}

async function platformSeed() {
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
}

async function gameSeed() {
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

async function tagSeed() {
    const tags = new Array(20).fill({}).map((item) => ({
        name: faker.lorem.word(),
    }));
    for (const tag of tags) {
        await prisma.tag.upsert({
            where: {
                name: tag.name,
            },
            update: {
                name: tag.name,
            },
            create: {
                name: tag.name,
            },
        });
    }
}

async function teamSeed() {
    const users = await prisma.user.findMany({});
    const tags = await prisma.tag.findMany({});
    let members;
    const teams = new Array(32).fill({}).map((item) => {
        const membersNb = getRandomInt(5, 2);
        members = new Array(membersNb).fill({}).map((item) => users[getRandomInt(users.length - 1, 0)]);
        for (let i = 0; i < membersNb; i++) {
            members.push(users[getRandomInt(users.length - 1, 0)]);
        }
        return {
            name: faker.company.companyName(),
            tag: tags[getRandomInt(tags.length, 0)].id,
            owner: members[0].id,
            members,
        };
    });
    for (const team of teams) {
        await prisma.team.upsert({
            where: {
                name: team.name,
            },
            update: {
                name: team.name,
                tag: {
                    connect: {
                        id: team.tag,
                    },
                },
                owner: {
                    connect: {
                        id: team.owner,
                    },
                },
                members: {
                    connect: team.members.map((item) => ({ id: item.id })),
                },
            },
            create: {
                name: team.name,
                tag: {
                    connect: {
                        id: team.tag,
                    },
                },
                owner: {
                    connect: {
                        id: team.owner,
                    },
                },
                members: {
                    connect: team.members.map((item) => ({ id: item.id })),
                },
            },
        });
    }
}

async function ruleSeed() {
    const rules = new Array(16)
        .fill({})
        .map((item, i) => ({ id: i + 1, name: faker.lorem.words(), content: faker.lorem.paragraph() }));
    for (const rule of rules) {
        await prisma.rule.upsert({
            where: {
                id: rule.id,
            },
            update: {
                name: rule.name,
                content: rule.content,
            },
            create: {
                name: rule.name,
                content: rule.content,
            },
        });
    }
}

async function tournamentRewardSeed() {
    const tournamentRewards = new Array(16).fill({}).map((item) => ({ name: faker.lorem.words() }));
    for (const reward of tournamentRewards) {
        await prisma.tournamentReward.upsert({
            where: {
                name: reward.name,
            },
            update: {
                name: reward.name,
            },
            create: {
                name: reward.name,
            },
        });
    }
}

async function main() {
    await currencySeed();
    await languageSeed();
    await userSeed();
    await platformSeed();
    await gameSeed();
    await formatSeed();
    await tagSeed();
    await teamSeed();
    await ruleSeed();
    await tournamentRewardSeed();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
