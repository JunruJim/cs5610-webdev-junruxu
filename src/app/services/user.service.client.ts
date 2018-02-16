import { User } from '../models/user.model.client';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  users: User[] = [
    { _id: '1', username: 'alice',    password: 'alice',    firstName: 'Alice',  lastName: 'Wonder' },
    { _id: '2', username: 'bob',      password: 'bob',      firstName: 'Bob',    lastName: 'Marley' },
    { _id: '3', username: 'charly',   password: 'charly',   firstName: 'Charly', lastName: 'Garcia' },
    { _id: '4', username: 'jannunzi', password: 'jannunzi', firstName: 'Jose',   lastName: 'Annunzi' }
  ];

  dumpUser() {
    return new User(undefined, undefined, undefined, undefined, undefined);
  }

  copyUser(user: User) {
    if (!user) {
      return undefined;
    }
    return new User(user._id, user.username, user.password, user.firstName, user.lastName);
  }

  createUser(user: User) {
    const createdUser = new User(String(this.users.length + 1), user.username, user.password, user.firstName, user.lastName);
    this.users.push(createdUser);
    return this.copyUser(createdUser);
  }

  findUserByCredential(username: String, password: String) {
    const foundUser = this.users.find( function (user){
       return user.username === username && user.password === password;
    });
    return this.copyUser(foundUser);
  }

  findUserById(userId: String) {
    const foundUser = this.users.find(function(user) {
      return user._id === userId;
    });
    return this.copyUser(foundUser);
  }

  findUserByUsername(username: String) {
    const foundUser = this.users.find(function(user) {
      return user.username === username;
    });
    return this.copyUser(foundUser);
  }

  updateUser(userId: String, user: User) {
    const foundUser = this.users.find(function(user) {
      return user._id === userId;
    });
    foundUser.username = user.username;
    foundUser.password = user.password;
    foundUser.firstName = user.firstName;
    foundUser.lastName = user.lastName;
    return this.copyUser(foundUser);
  }

  deleteUser() {

  }
}
