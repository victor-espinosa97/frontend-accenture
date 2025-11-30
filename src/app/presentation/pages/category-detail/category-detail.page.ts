import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/infraestructure/services/category.service';
import { Category } from '../../../domain/models/category.model';

@Component({
  selector: 'app-category-detail',
  styleUrls: ['category-detail.page.scss'],
  templateUrl: './category-detail.page.html',
  standalone: false,
})
export class CategoryDetailPage {

  @Input() mode!: 'create' | 'edit';
  @Input() category!: Category;

  name = '';
  color = '';

  // 🔥 AQUÍ van los colores predefinidos
  presetColors = [
    { name: 'Rojo', value: '#ff6b6b' },
    { name: 'Naranja', value: '#ffa94d' },
    { name: 'Verde', value: '#51cf66' },
    { name: 'Azul', value: '#339af0' },
    { name: 'Violeta', value: '#845ef7' },
  ];

  constructor(
    private modalCtrl: ModalController,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    if (this.mode === 'edit' && this.category) {
      this.name = this.category.name;
      this.color = this.category.color ?? '';
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.mode === 'create') {
      this.categoryService.create(this.name, this.color);
    } else {
      this.categoryService.update({
        ...this.category,
        name: this.name,
        color: this.color
      });
    }
    this.close();
  }
}
