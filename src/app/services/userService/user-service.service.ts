import { Injectable, signal, WritableSignal, Signal, effect } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../types/user.interface';
import { DbServiceService } from '../dataBaseService/db-service.service';
import defaultDb from '../dataBaseService/db.json';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private currentUser: WritableSignal<User | null> = signal(null)

  constructor(private db: DbServiceService, private router: Router) {
   this.initializeAdmin();
  }

  async initializeAdmin(): Promise<void>{
    const admin = await this.db.getFromCollection<User>('users', 'email', 'admin@admin.com');
    if(!admin){
      await this.db.addToCollection('users', defaultDb.users.admin, 'email');
    }
  }

  get user(): Signal<User | null> {
     return this.currentUser.asReadonly();
  }

  async loggIn(email: string, password: string): Promise<boolean> {
    const existingUser = await this.db.getFromCollection<User>('users', 'email', email)
    if(existingUser && password === (existingUser as User).password){
      this.currentUser.set(existingUser as User);
      this.router.navigateByUrl('');
      return true
    }
    return false
  }

  async loggOut(): Promise<void> {
    this.currentUser.set(null);
    this.router.navigateByUrl('/login');
  }

  async signUp(user: User): Promise<boolean> {
    try {
      await this.db.addToCollection<User>('users', user, 'email');
      return true
    } catch(err) {
      console.warn(err);
      return false
    }
  }
}
