import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { UserEditComponent } from '../user-edit/user-edit.component'; // Import UserEditComponent

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CardModule, AvatarModule, ButtonModule, UserEditComponent], // Add UserEditComponent
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user = {
    name: 'Juan Pérez',
    lastname: 'González',
    email: 'juan.perez@example.com',
    birthDate: '1990-05-15',
    state: 'Ciudad de México',
    avatar: 'https://ui-avatars.com/api/?name=Juan+Pérez'
  };
}
