export default class Baby {
    // tslint:disable-next-line:variable-name
    private _name: string;

    constructor(name: string) {
        this._name = name;
        console.log('baby crawing...');
    }

    private smile() {
        console.log('haha');
    }

    public getBabyName(): string {
        return this._name;
    }
}

export let baby = new Baby('Nico');
