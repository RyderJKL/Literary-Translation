import {observable, action} from 'mobx';

export class CommonStore {
    @observable public id = '123';
    @observable public name = 'jack';

    @action
    public changeName = value => {
        this.name = value;
    };
}

const common = new CommonStore();

export default common;
