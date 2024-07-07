import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class DexieService extends Dexie {
  private drafts: Dexie.Table<any, number>;

  constructor() {
    super('DraftsDatabase');
    this.version(1).stores({
      drafts: '++id, title, description, target_institution, image'
    });
    this.drafts = this.table('drafts');
  }

  async saveDraft(draft: any) {
    try {
      const id = await this.drafts.add(draft);
      return id;
    } catch (error) {
      console.error('Error adding draft:', error);
      throw error;
    }
  }

  async getDrafts() {
    try {
      const drafts = await this.drafts.toArray();
      return drafts;
    } catch (error) {
      console.error('Error getting drafts:', error);
      throw error;
    }
  }

  async deleteDraft(id: number) {
    try {
      await this.drafts.delete(id);
    } catch (error) {
      console.error('Error deleting draft:', error);
      throw error;
    }
  }
}
