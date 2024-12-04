import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}
  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;
  @ViewChild('paginator') paginator: Paginator | undefined;
  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next:(data: Products)=>{
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error)=>{
          console.log(error);
        }
      });
  }
  editProduct(product: Product, id: number) {
    this.productsService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe({
      next: () => {
        console.log('Product updated successfully');
        this.fetchProducts(0, this.rows); // refresh the list after updating a product
        this.resetPaginator();
      },
      error: (error) => {
        console.error('Error updating product:', error);
      },
    })
  }
  deleteProduct(id: number) {
    this.productsService.deleteProduct(`http://localhost:3000/clothes/${id}`).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.resetPaginator();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      },
    });
  }
  addProduct(product:Product){
    this.productsService.addProduct('http://localhost:3000/clothes', product).subscribe({
      next: () => {
        console.log('Product added successfully');
        this.fetchProducts(0, this.rows); // refresh the list after adding a new product
        this.resetPaginator();
      },
      error: (error) => {
        console.error('Error adding product:', error);
      },
    });
  }
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }
  onProductOutput(product: Product) {
    console.log('Product:', product);
  }
  toggleEditPopup(product: Product){
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }
  toggleDeletePopup(product: Product){
    // this.selectedProduct = product;
    // this.displayDeletePopup = true;
  }
  toggleAddPopup(){
    this.displayAddPopup = true;
  }

  selectedProduct: Product ={
    id: 0,
    price: '',
    name: '',
    image: '',
    rating: 0
  }
  onConfirmEdit(product: Product){
    if(!this.selectedProduct.id){
      return;
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }
  onConfirmAdd(product: Product){
    this.addProduct(product);
    this.displayAddPopup = false;
  }
  resetPaginator(){
    this.paginator?.changePage(0);
  }
}
