import { Injectable } from '@angular/core';
import { Dexie, type EntityTable } from 'dexie';

import { User } from '../../types/user.interface';
import { GenericObject } from '../../types/common.intefaces';

const db = new Dexie('tripHostDb') as Dexie & {
  users: EntityTable<User, 'email'>;
};

db.version(1).stores({
  users: 'email',
});

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor() {}

  async addToCollection<T>(collectionName: string, value: T, key?: string): Promise<boolean> {
    const collection = db.table(collectionName);
    if(collection){
      const result = await collection.add(value, key);
      return !!result
    }
    return false
  }

  async getFromCollection<GenericObject>(collectionName: string, identifier: string, searchValue: string, isBulk?: boolean): Promise<GenericObject | GenericObject[] | undefined> {
    const collection = db.table(collectionName);
    if(collection){
      const result = await collection.where(identifier).equalsIgnoreCase(searchValue)
      return isBulk ? result.toArray() : result.first() ;
    }
    return undefined
  }
}
