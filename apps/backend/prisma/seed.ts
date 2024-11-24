import { PrismaClient } from '@prisma/client';
import { eventos } from 'core';

async function seed() {
  const prisma = new PrismaClient();

  try {
    // Usando Promise.all para garantir que todas as promessas sejam aguardadas
    await Promise.all(
      eventos.map(async (evento) => {
        // Criando o evento
        await prisma.evento.create({
          data: {
            id: evento.id,
            alias: evento.alias,
            senha: evento.senha,
            nome: evento.nome,
            data: evento.data,
            local: evento.local,
            descricao: evento.descricao,
            imagem: evento.imagem,
            imagemBackground: evento.imagemBackground,
            publicoEsperado: evento.publicoEsperado,
            convidados: {
              create: evento.convidados.map((convidado) => ({
                id: convidado.id,
                nome: convidado.nome,
                email: convidado.email,
                confirmado: convidado.confirmado,
                possuiAcompanhantes: convidado.possuiAcompanhantes,
                qntdAcompanhantes: convidado.qntdAcompanhantes,
              })),
            },
          },
        });
      })
    );
  } catch (error) {
    console.error('Erro ao realizar o seed:', error);
  } finally {
    // Garantindo que a conexão seja encerrada após o seed
    await prisma.$disconnect();
  }
}

seed();
