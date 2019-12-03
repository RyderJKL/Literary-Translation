import { observable, action } from 'mobx';

export interface EnvironmentItem {
    id: string;
    name: string;
}

export interface Modules {
    id: string;
    name: string;
}

export interface Store {
    environments: EnvironmentItem[];
    updateTypes: string[];
    modules: Modules[];
    name: string;
}

export interface SetConfigListProps {
    environments: EnvironmentItem[];
    updateTypes: string[];
    modules: Modules[];
}

export interface BasicFormStore extends Store {
    submit(): void;
    setConfigList(props: SetConfigListProps): void;
}

class BasicForm implements BasicFormStore {
    @observable public environments: EnvironmentItem[];
    @observable public updateTypes: string[];
    @observable public modules: Modules[];
    @observable public name: string;

    @action
    public setConfigList = (configList: SetConfigListProps): void => {
        this.environments = configList.environments;
        this.updateTypes = configList.updateTypes;
        this.modules = configList.modules;
    };

    @action
    public submit = (): void => {
        this.name = 'lego admin pro';
    };
}

export default new BasicForm();
