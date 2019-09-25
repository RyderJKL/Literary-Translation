import { observable } from 'mobx';

class UserStore {
   @observable public userName: string = '';
   @observable public userId: string = '';
}

const userStore = new UserStore();

export { UserStore };

export default userStore;

