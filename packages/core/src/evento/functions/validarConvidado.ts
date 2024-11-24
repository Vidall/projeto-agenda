import Convidado from "../model/Convidado";
import Evento from "../model/Evento";

export default function validarConvidado(convidado: Partial<Convidado>): string[] {
    const error = [];

    if (!convidado.nome) {
        error.push("Nome é obrigatório");
    }
    if (!convidado.email) {
        error.push("Email é obrigatório");
    } else if (!/\S+@\S+\.\S+/.test(convidado.email)) {
        error.push("Email inválido");
    }

    return error;

}