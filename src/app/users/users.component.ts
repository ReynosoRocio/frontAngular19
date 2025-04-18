import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../authentication.service';
import { UserEditComponent } from '../user-edit/user-edit.component'; // Import UserEditComponent
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserEditComponent, InputTextModule, ButtonModule, MessageModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  isAuthorized = true;
  users = [
    { id: '1', email: 'user1@example.com', name: 'User', lastname: 'One', birthDate: '1990-01-01' },
    { id: '2', email: 'user2@example.com', name: 'User', lastname: 'Two', birthDate: '1995-05-15' }
  ];

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    const userType = this.authService.getUserType();
    this.isAuthorized = userType === 0; // Only allow access if user type is 0 (admin)
  }

  onEdit(userId: string | null): void {
    if (userId === null) {
      console.log('Creating a new user');
      // Logic to open the UserEditComponent in creation mode
    } else {
      console.log(`Editing user with ID: ${userId}`);
      // Logic to open the UserEditComponent in edit mode
    }
  }

  onDelete(userId: string): void {
    console.log(`Deleting user with ID: ${userId}`);
    // Logic to delete the user
  }
}
