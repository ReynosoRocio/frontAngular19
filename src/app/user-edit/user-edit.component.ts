import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
    oldPassword: ''
  };

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onSubmit(): void {
    if (this.mode === 1) {
      console.log('Updating your own data:', this.user);
    } else {
      console.log(`Updating data for user ID ${this.userId}:`, this.user);
    }
    this.closeModal();
  }
}
