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
}

export default new UserStore();
