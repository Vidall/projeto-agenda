import { v4 as uuid, validate} from 'uuid'

export default class Id {

    static novo(): string {
        return uuid();
    }

    static validar(value: string): boolean {
        return validate(value);
    }

}

console.log(Id.novo())