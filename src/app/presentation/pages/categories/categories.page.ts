import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/infraestructure/services/category.service';
import { Category } from '../../../domain/models/category.model';
import { ModalController } from '@ionic/angular';
import { CategoryDetailPage } from '../category-detail/category-detail.page';


@Component({
  selector: 'app-categories',
  styleUrls: ['categories.page.scss'],
  templateUrl: './categories.page.html',
  standalone: false,
})
export class CategoriesPage {
  categories$: Observable<Category[]> = this.categoryService.cats$;

  constructor(
    private categoryService: CategoryService,
    private modalCtrl: ModalController
  ) {}

  async openCreate() {
    
    const modal = await this.modalCtrl.create({
      component: CategoryDetailPage,
      componentProps: { mode: 'create' }
    });
    await modal.present();
  }

  async openEdit(cat: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryDetailPage,
      componentProps: { mode: 'edit', category: cat }
    });
    await modal.present();
  }

  delete(id: string) {
    this.categoryService.delete(id);
  }
}
