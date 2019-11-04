import { observable, action } from 'mobx';

export class UIStore {
    @observable public sidebarCollapse: boolean;

    constructor () {
        this.sidebarCollapse = false;
    }

    @action.bound
    public toggleSidebarCollapse () {
        this.sidebarCollapse = !this.sidebarCollapse;
    }
}

const UI = new UIStore();

export default UI;
