import {makeAutoObservable} from 'mobx';
import {User} from '../types/users';

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  user: User | null = null;

  setUser(value: User) {
    this.user = value;
  }

  selectedPage: string = '/home';

  setSelectedPage(value: string) {
    this.selectedPage = value;
  }
}

export default new UserStore();
