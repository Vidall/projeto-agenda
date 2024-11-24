import { Injectable } from '@nestjs/common';
import { PrismaProvider } from 'src/db/PrismaProvider';
import { Convidado, Evento } from 'core';

@Injectable()
export class EventoPrismaService {
    constructor(readonly repo: PrismaProvider) {}

        salvar(evento: Evento) {
            return this.repo.evento.create({
            data: {
                ...(evento as any),
                convidados: { create: evento.convidados },
            },
            });
        }

        salvarConvidado(evento: Evento, convidado: Convidado) {
            return this.repo.convidado.create({
              data: {
                ...convidado,
                qntdAcompanhantes: +(convidado.qntdAcompanhantes ?? 0),
                evento: { connect: { id: evento.id } },
              },
            });
          }

        async buscarPorId(id: string, completo: boolean = false): Promise<Evento | null> {
            return this.repo.evento.findUnique({ where: { id }, include: {convidados: completo}}) as any;
        }

        async buscarPorAlias(
            alias: string,
            completo: boolean = false,
          ): Promise<Evento | null> {
            return this.repo.evento.findUnique({
              select: {
                id: true,
                nome: true,
                descricao: true,
                data: true,
                local: true,
                imagem: true,
                imagemBackground: true,
                alias: true,
                senha: completo,
                publicoEsperado: completo,
                convidados: completo,
              },
              where: { alias },
            }) as any;
          }

        async buscarTodos(): Promise<Evento[]> {
            return this.repo.evento.findMany() as any;
        }

        acessar(id: string, senha: string): Promise<Evento | null> {
            return this.repo.evento.findUnique({ where: { id, senha }}) as any;
        }

        buscarPorIdOuAlias(idOrAlias: string) {
            return this.repo.evento.findUnique({ where: { id: idOrAlias, alias: idOrAlias } });
        }
}
