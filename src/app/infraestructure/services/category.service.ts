import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';
import { Category } from 'src/app/domain/models/category.model';

const CATS_KEY = 'categories_v1';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private _cats$ = new BehaviorSubject<Category[]>([]);
  cats$ = this._cats$.asObservable();

  constructor(private storage: StorageService) {
    this.load();
  }

  private async load() {
    const saved = await this.storage.get<Category[]>(CATS_KEY);
    this._cats$.next(saved ?? []);
  }

  private persist(cats: Category[]) {
    this._cats$.next(cats);
    this.storage.set(CATS_KEY, cats);
  }

  create(name: string, color?: string) {
    const cat: Category = { id: uuidv4(), name, color };
    this.persist([cat, ...this._cats$.value]);
  }

  update(cat: Category) {
    const cats = this._cats$.value.map(c => c.id === cat.id ? { ...cat } : c);
    this.persist(cats);
  }

  delete(id: string) {
    const cats = this._cats$.value.filter(c => c.id !== id);
    this.persist(cats);
  }
}
