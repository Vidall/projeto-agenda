import Evento from "../model/Evento";

export default function validarEvento(evento: Partial<Evento>): string[] {
    const { id, alias, senha, nome, data, local, descricao, imagem, imagemBackground, publicoEsperado, convidados } = evento;
    const errors = [];

    if (!alias) {
        errors.push("Alias é obrigatório");
    }

    if (!senha) {
        errors.push("Senha é obrigatória");
    }

    if (!nome) {
        errors.push("Nome é obrigatório");
    }

    if (!data) {
        errors.push("Data é obrigatória");
    }

    if (!local) {
        errors.push("Local é obrigatório");
    }

    if (!descricao) {
        errors.push("Descrição é obrigatória");
    }

    if (!publicoEsperado || publicoEsperado < 1) {
        errors.push('O publico esperado é obrigatório')
    }

    return errors
}