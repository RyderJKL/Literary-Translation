import { observable, action } from 'mobx';

export interface EnvironmentItem {
    id: string;
    name: string;
    name_cn: string;
}

export interface Modules {
    id: string;
    name: string;
    notes: string;
}

export interface Store {
    environments: EnvironmentItem[];
    updateTypes: string[];
    models: Modules;
    name: string;
}

export interface BasicFormStore extends Store {
    submit(): void;
    setConfigList(value): void;
}

class BasicForm implements BasicFormStore {
    @observable public environments;
    @observable public updateTypes;
    @observable public models;
    @observable public name;

    @action
    public setConfigList = (value): void => {
        this.environments = value;
        this.name = 'chen rong';
    };

    @action
    public submit = (): void => {
        this.name = 'rong';
    };
}

export default new BasicForm();
