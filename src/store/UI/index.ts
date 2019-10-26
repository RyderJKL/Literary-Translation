import { observable, action } from 'mobx';

export class UIStore {
    @observable public menuCollapse: boolean;

    constructor () {
        this.menuCollapse = false;
    }

    @action.bound
    public toggleMenuCollapse () {
        this.menuCollapse = !this.menuCollapse;
    }
}

const UI = new UIStore();

export default UI;
