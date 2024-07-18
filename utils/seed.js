import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // Crear roles
    const roleAdmin = await prisma.role.create({
      data: {
        roleName: 'admin'
      }
    });

    const rolePlayer = await prisma.role.create({
      data: {
        roleName: 'player'
      }
    });

    // Crear usuarios
    const user1 = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        username: 'admin',
        password: 'adminpassword',
        roleId: roleAdmin.id
      }
    });

    const user2 = await prisma.user.create({
      data: {
        email: 'player1@example.com',
        username: 'player1',
        password: 'playerpassword',
        roleId: rolePlayer.id
      }
    });

    const user3 = await prisma.user.create({
      data: {
        email: 'player2@example.com',
        username: 'player2',
        password: 'playerpassword',
        roleId: rolePlayer.id
      }
    });

    // Crear cartas negras
    const blackCard1 = await prisma.blackCard.create({
      data: {
        text: 'Una carta negra de ejemplo 1'
      }
    });

    const blackCard2 = await prisma.blackCard.create({
      data: {
        text: 'Una carta negra de ejemplo 2'
      }
    });

    // Crear cartas blancas
    const whiteCard1 = await prisma.whiteCard.create({
      data: {
        text: 'Una carta blanca de ejemplo 1'
      }
    });

    const whiteCard2 = await prisma.whiteCard.create({
      data: {
        text: 'Una carta blanca de ejemplo 2'
      }
    });

    // Crear juego de ejemplo con jugadores
    const game1 = await prisma.game.create({
      data: {
        createdAt: new Date(),
        gamePlayers: {
          create: [
            { userId: user1.id },
            { userId: user2.id },
            { userId: user3.id }
          ]
        }
      }
    });

    // Crear jugadas de ejemplo
    const play1 = await prisma.play.create({
      data: {
        gameId: game1.id,
        userId: user2.id,
        blackCardId: blackCard1.id,
        whiteCardId: whiteCard1.id
      }
    });

    const play2 = await prisma.play.create({
      data: {
        gameId: game1.id,
        userId: user3.id,
        blackCardId: blackCard2.id,
        whiteCardId: whiteCard2.id
      }
    });

    console.log('Se han sembrado los datos de ejemplo correctamente.');
  } catch (error) {
    console.error('Error al sembrar los datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
