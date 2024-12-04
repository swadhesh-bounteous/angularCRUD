import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-popup',
  standalone: false,
  
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  @Input() header!: string;

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0
  }
  specialCharacterValidator(): ValidatorFn{
    return (control)=>{
      const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
      if(specialCharacters.test(control.value)){
        return { specialCharacter: true };
      }
      return null;
    }
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required, this.specialCharacterValidator]],
      image: [this.product.image],
      price: [this.product.price, [Validators.required]],
      rating: [this.product.rating]
    });
  }
  onConfirm() {
    if (this.productForm.valid) {
      const updatedProduct = { ...this.product, ...this.productForm.value };
      this.confirm.emit(updatedProduct);
      this.display = false;
      this.displayChange.emit(this.display);
    }
  }
  
  onCancel(){
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
