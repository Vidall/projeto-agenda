export default class alias {
    static formatar(value: string): string {
        return value.toLowerCase().replace(/ /g, '-');
    }
}