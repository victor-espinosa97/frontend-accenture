import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/infraestructure/services/todo.service';
import { CategoryService } from 'src/app/infraestructure/services/category.service';
import { Task } from '../../../domain/models/task.model';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  standalone: false,
})
export class TaskDetailPage {

  id: string | null = null;
  editing = false;

  title = '';
  description = '';
  categoryId: string | null = null;

  categories$ = this.categoryService.cats$;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todo: TodoService,
    private categoryService: CategoryService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.editing = !!this.id;

    if (this.editing) {
      const task = this.todo.tasksSnapshot.find(t => t.id === this.id);
      if (task) {
        this.title = task.title;
        this.description = task.description ?? '';
        this.categoryId = task.categoryId ?? null;
      }
    }
  }

  async save() {
    if (!this.title.trim()) {
      const toast = await this.toastCtrl.create({
        message: 'El título no puede estar vacío.',
        duration: 1500,
        color: 'warning'
      });
      toast.present();
      return;
    }


    if (!this.editing) {
      this.todo.addTask({
        title: this.title,
        description: this.description,
        categoryId: this.categoryId
      });

    } else {
      const updated: Task = {
        id: this.id!,
        title: this.title,
        description: this.description,
        createdAt: Date.now(),
        done: false,
        categoryId: this.categoryId
      };

      this.todo.updateTask(updated);
    }

    this.router.navigate(['/tasks']);
  }
}
