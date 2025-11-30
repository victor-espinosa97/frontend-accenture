import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { TodoService } from 'src/app/infraestructure/services/todo.service';
import { CategoryService } from 'src/app/infraestructure/services/category.service';
import { FeatureFlagService } from 'src/app/infraestructure/services/feature-flag.service';
import { Task } from '../../../domain/models/task.model';
import { Category } from 'src/app/domain/models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  styleUrls: ['tasks.page.scss'],
  templateUrl: 'tasks.page.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage {
  tasks$!: Observable<Task[]>;
  categories$ = this.categoryService.cats$;
  categoriesFeature$ = this.featureFlagService.flag$('enableCategories');

  private selectedCategory$ = new BehaviorSubject<string | null>(null);

  constructor(
    private router: Router,
    private todo: TodoService,
    private categoryService: CategoryService,
    private featureFlagService: FeatureFlagService,
    private alertCtrl: AlertController,
  ) {
    this.tasks$ = combineLatest([
      this.todo.tasks$,
      this.categoriesFeature$,
      this.selectedCategory$
    ]).pipe(
      map(([tasks, featureOn, selectedCategory]) => {
        if (!featureOn) {
          // si feature off, devolvemos todas las tareas
          return tasks;
        }
        if (!selectedCategory) {
          return tasks;
        }
        return tasks.filter(t => t.categoryId === selectedCategory);
      })
    );
  }

  openEdit(task: Task) {
    this.router.navigate(['/task-detail', task.id]);
  }

  trackById(index: number, item: any) { return item.id; }

  toggleDone(id: string) { this.todo.toggleDone(id); }

  async delete(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar tarea',
      message: '¿Seguro que deseas eliminar esta tarea?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.todo.deleteTask(id)
        }
      ]
    });
    await alert.present();
  }

  // llamado desde el template
  onCategoryChange(value: string | number | null | undefined) {
    if (value === undefined || value === null || value === '') {
      this.selectedCategory$.next(null);
    } else {
      this.selectedCategory$.next(String(value)); // <-- convertimos todo a string
    }
  }

  getCategoryColor(
    categoryId: string | null | undefined,
    cats: Category[] | null | undefined
  ): string {
    if (!cats) return 'transparent';
    return cats.find(c => c.id === categoryId)?.color ?? 'transparent';
  }

}
