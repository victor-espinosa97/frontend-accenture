import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/domain/models/task.model';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';

const TASKS_KEY = 'tasks_v1';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _tasks$ = new BehaviorSubject<Task[]>([]);
  tasks$ = this._tasks$.asObservable();

  constructor(private storage: StorageService) {
    this.load();
  }

  private async load() {
    const saved = await this.storage.get<Task[]>(TASKS_KEY);
    this._tasks$.next(saved ?? []);
  }

  private persist(tasks: Task[]) {
    // inmutabilidad: crear nuevo array
    this._tasks$.next(tasks);
    this.storage.set(TASKS_KEY, tasks);
  }

  addTask(task: Partial<Task>) {
    const newTask: Task = {
      id: uuidv4(),
      title: task.title ?? 'Nueva tarea',
      description: task.description ?? '',
      done: false,
      createdAt: Date.now(),
      categoryId: task.categoryId ?? null
    };
    this.persist([newTask, ...this._tasks$.value]);
  }

  get tasksSnapshot() {
    return this._tasks$.value;
  }

  updateTask(updated: Task) {
    const tasks = this._tasks$.value.map(t => t.id === updated.id ? { ...updated } : t);
    this.persist(tasks);
  }

  toggleDone(id: string) {
    const tasks = this._tasks$.value.map(t => t.id === id ? { ...t, done: !t.done } : t);
    this.persist(tasks);
  }

  deleteTask(id: string) {
    const tasks = this._tasks$.value.filter(t => t.id !== id);
    this.persist(tasks);
  }

  // bulk operations for performance
  setAll(tasks: Task[]) {
    this.persist([...tasks]);
  }
}
