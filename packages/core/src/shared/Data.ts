export default class Data {
    static formatar(data: Date): string {
        const pad = (n: number) => n.toString().padStart(2, '0');

        const d = data ?? new Date();
        const ano = d.getFullYear();
        const mes = pad(d.getMonth() + 1);
        const dia = pad(d.getDate());
        const horas = pad(d.getHours());
        const minutos = pad(d.getMinutes());

        return `${ano}-${mes}-${dia}T${horas}:${minutos}`;

    }

    static desformatar(data: string): Date {
        const [ano, mes, dia] = data.split('T')[0].split('-');
        const [hora, minutos] = data.split('T')[1].split(':');

        return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia), parseInt(hora), parseInt(minutos));
    }
}

console.log(Data.desformatar('2023-05-27T18:04'))