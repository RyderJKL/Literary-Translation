import { observable, action } from 'mobx';
import themeDefault, { DefaultSettings } from '@/config/default-settings';

export interface UIModel {
    sidebarCollapse: boolean;
    themeSettings: DefaultSettings;
}

export interface UIStore extends UIModel {
    toggleSidebarCollapse(): void;
    changeThemeSettings(key: keyof DefaultSettings, value: number | boolean | string): void;
}

export class UI implements UIStore {
    @observable public sidebarCollapse;
    @observable public themeSettings;

    constructor() {
        this.sidebarCollapse = false;
        this.themeSettings = themeDefault;
    }

    @action.bound
    public toggleSidebarCollapse(): void {
        this.sidebarCollapse = !this.sidebarCollapse;
    }

    @action.bound
    public changeThemeSettings(key, value): void {
        this.themeSettings[key] = value;
    }
}

const ui = new UI();

export default ui;
