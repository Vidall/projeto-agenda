import { Id } from "../../shared";
import Evento from "../model/Evento";

export default function criarEventoVazio(): Evento {
    return {
        id: Id.novo(),
        alias: "",
        senha: "",
        nome: "",
        data: new Date(),
        local: "",
        descricao: "",
        imagem: "",
        imagemBackground: "",
        publicoEsperado: 1,
        convidados: []
    };
}