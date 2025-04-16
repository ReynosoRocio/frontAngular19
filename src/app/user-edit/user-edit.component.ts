import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, PasswordModule, DropdownModule, ButtonModule], // Add ButtonModule here
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  @Input() mode: number = 0; // 1 for editing your own data, 0 for general editing, 2 for creating a new user
  @Input() userId: string | null = null; // User ID for general editing
  isModalOpen = false;

  user = {
    email: '',
    name: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    oldPassword: '',
    birthDate: null,
    userType : 1, // 0 for admin, 1 for user
  };

  public passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[-?!\[\]{}]).{6,}$/;

  public isOldEnough(birthDate: string | null): boolean {
    if (!birthDate) return false;
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
