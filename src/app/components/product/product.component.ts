import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService){}
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();
  @ViewChild('deleteButton') deleteButton: any;

  ngOnInit(){
    
  }
  editProduct(){
    this.edit.emit(this.product);
  }
  confirmDelete(){
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${this.product.name}"?`,
      target: this.deleteButton.nativeElement,
      header: 'Delete Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteProduct();
      }
    })
  }
  deleteProduct(){
    this.delete.emit(this.product);
  }
}
