import { Id } from "../../shared";
import Convidado from "../model/Convidado";
import validarConvidado from "./validarConvidado";

export default function complementarConvidado(convidado: Convidado): Convidado {
    const errors = validarConvidado(convidado)

    if (errors.length > 0) {
        throw new Error(errors.join(", "));
    }

    const qntdAcompanhante = convidado.qntdAcompanhantes ?? 0
    const temAcompanhante = convidado.confirmado && convidado.possuiAcompanhantes && qntdAcompanhante > 0;

    const convidadoAtualizado: Convidado = {
        ...convidado,
        id: convidado.id || Id.novo(),
        qntdAcompanhantes: temAcompanhante ? qntdAcompanhante : 0,
        possuiAcompanhantes: temAcompanhante as boolean,
    }

    return convidadoAtualizado as Convidado;
}