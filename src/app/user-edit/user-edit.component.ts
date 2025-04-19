import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Select2 } from 'ng-select2-component'; // Import Select2 component
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { DatePickerModule } from 'primeng/datepicker';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordModule, DropdownModule, ButtonModule, Select2, InputTextModule, MessageModule, DatePickerModule, InputIconModule], // Add Select2 here
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  @Input() mode: number = 0; // 1 for editing your own data, 0 for general editing, 2 for creating a new user
  @Input() userId: string | null = null; // User ID for general editing
  isModalOpen = false;

  user :  { stateBirth : string | null | undefined | number | boolean  | object,
    email : string ,
    password : string ,
    password1 : string ,
    name : string,
    lastname : string,
    birthDate : Date | null | string,
    oldPassword : string | null,
    userType : number | null
  } = {
    email: '',
    name: '',
    lastname: '',
    password: '',
    password1: '',
    oldPassword: '',
    stateBirth: null,
    birthDate: null,
    userType : 1, // 0 for admin, 1 for user
  };

  public passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-?!\[\]{}]).{6,}$/;

  public isOldEnough(birthDate: string | null | Date): boolean {
    if (!birthDate){
      return false;
    }

    const currentDate = new Date();
    const birth = new Date(birthDate);
    const age = currentDate.getFullYear() - birth.getFullYear();
    return age > 13 || (age === 13 && currentDate >= new Date(birth.setFullYear(birth.getFullYear() + 13)));
  }

  public isPasswordValid(password: string): boolean {
    return this.passwordRegex.test(password);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const isOldEnough = this.isOldEnough(this.user.birthDate);
      const isPasswordValid = this.isPasswordValid(this.user.password);

      if (!isOldEnough || !isPasswordValid || (this.mode === 1 && !this.user.oldPassword) || this.user.password !== this.user.password1) {
        return; // Errors will be displayed in the template
      }

      if (this.mode === 1) {
        console.log('Actualizando tus propios datos:', this.user);
      } else {
        console.log(`Actualizando datos del usuario con ID ${this.userId}:`, this.user);
      }
      this.closeModal();
    }
  }

  getButtonIcon(): string {
    if (this.mode === 2) {
      return '<i class="pi pi-plus-circle"></i>';
    }else{
      return '<i class="pi pi-pencil"></i>';
    }
  }

  states: Array<{ value: string; label: string }> = [
    { value: "1", label: "Aguascalientes" },
    { value: "2", label: "Campeche" },
    { value: "3", label: "Chiapas" },
    { value: "4", label: "Chihuahua" },
    { value: "5", label: "Coahuila" },
    { value: "6", label: "Colima" },
    { value: "7", label: "Durango" },
    { value: "8", label: "Estado de México" },
    { value: "9", label: "Guanajuato" },
    { value: "10", label: "Guerrero" },
    { value: "11", label: "Hidalgo" },
    { value: "12", label: "Jalisco" },
    { value: "13", label: "Michoacán" },
    { value: "14", label: "Morelos" },
    { value: "15", label: "Nayarit" },
    { value: "16", label: "Nuevo León" },
    { value: "17", label: "Oaxaca" },
    { value: "18", label: "Puebla" },
    { value: "19", label: "Querétaro" },
    { value: "20", label: "Quintana Roo" },
    { value: "21", label: "San Luis Potosí" },
    { value: "22", label: "Sinaloa" },
    { value: "23", label: "Sonora" },
    { value: "24", label: "Tabasco" },
    { value: "25", label: "Tamaulipas" },
    { value: "26", label: "Tlaxcala" },
    { value: "27", label: "Veracruz" },
    { value: "28", label: "Yucatán" },
    { value: "29", label: "Zacatecas" },
    { value: "30", label: "Baja California" },
    { value: "31", label: "Baja California Sur" },
    { value: "32", label: "Ciudad de México" },
  ];
}
