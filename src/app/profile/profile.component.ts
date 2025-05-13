import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { states } from '../models/states.model';
import { UserService } from '../user/user.service'; // Import UserService

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule, ButtonModule, UserEditComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Initialize user as an empty object
  states = states;

  constructor(private userService: UserService) {} // Inject UserService

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile; // Update user with the fetched profile data
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }
}
