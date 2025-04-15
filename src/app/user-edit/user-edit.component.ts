import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  @Input() mode: number = 0; // 1 for editing your own data, 0 for general editing
  @Input() userId: string | null = null; // User ID for general editing
  isModalOpen = false;

  user = {
    email: '',
    name: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    oldPassword: '',
    birthDate: null
  };

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const currentDate = new Date();
      const birthDate = new Date(this.user.birthDate || '');
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const isOldEnough = age > 13 || (age === 13 && currentDate >= new Date(birthDate.setFullYear(birthDate.getFullYear() + 13)));

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-?!\[\]{}]).{6,}$/;
      const isPasswordValid = passwordRegex.test(this.user.password);

      if (!isOldEnough || !isPasswordValid || (this.mode === 1 && !this.user.oldPassword) || this.user.password !== this.user.confirmPassword) {
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
}
