import { Body, Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { complementarConvidado, complementarEvento, Convidado, Data, Evento, Id } from 'core';
import { EventoPrismaService } from './evento.prisma.service';

@Controller('eventos')
export class EventoController {

    constructor(readonly repo: EventoPrismaService) {}

    @Get()
    async buscarEventos(): Promise<any> {
        const eventos = await this.repo.buscarTodos();

        return eventos.map(this.serializar);
    }

    @Get('validar/:alias/:id')
    async validarAlias(@Param('alias') alias: string, @Param('id') id: string) {
        const todos: Evento[] = await this.buscarEventos()
        if (!todos) return { message: 'Não possui eventos cadastrados' }
        const validar = todos.find((e) => e.alias === alias && e.id !== id)

        return validar ? {validado: false} : {validado: true}
    }

    @Post('acessar')
    async acessar(@Body() dados: {id: string, senha: string}) {
        const evento = await this.repo.acessar(dados.id, dados.senha);

        if (!evento) throw new HttpException('Não foi possível acessar o evento.', 400)

        return this.serializar(evento)
    }

    @Post(':alias/convidado')
    async cadastrarConvidado(@Param('alias') alias: string, @Body() convidado: Convidado) {        
        const evento = await this.repo.buscarPorAlias(alias)

        if (!evento) throw new HttpException('Evento não encontrado', 400)
        
        const convidoCompleto = complementarConvidado(convidado)

        await this.repo.salvarConvidado(evento, convidado)

        return this.serializar(evento);
    }

    @Post()
    async salvarEvento(@Body() evento: Evento) {
      const eventoCadastrado = await this.repo.buscarPorAlias(evento.alias);

      if (eventoCadastrado && eventoCadastrado.id !== evento.id) {
        throw new HttpException('Já existe um evento com esse alias.', 400);
      }
  
      const eventoCompleto = complementarEvento(this.deserializar(evento));
      await this.repo.salvar(eventoCompleto);
    }

    private serializar(evento: Evento) {
        if (!evento) return null;
        return {
          ...evento,
          data: Data.formatar(evento.data),
        };
      }

    private deserializar(evento: any): Evento {
        if (!evento) return null;
        return {
          ...evento,
          data: Data.desformatar(evento.data),
        } as Evento;
      }

    @Get(':idOrAlias')
    async buscarPorIdOrAlias(@Param('idOrAlias') idOrAlias: string) {
        let evento: Evento
        if(Id.validar(idOrAlias)) {
            evento = await this.repo.buscarPorId(idOrAlias, true)
        } else {
            evento = await this.repo.buscarPorAlias(idOrAlias, true)
        }

        return this.serializar(evento)
    }

}

