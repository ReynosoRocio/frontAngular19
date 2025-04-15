import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenubarModule, RouterModule],
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.scss']
})
export class AppMenuComponent {
  items = [
    { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' },
    { label: 'Users', icon: 'pi pi-users', routerLink: '/users' }
  ];
}
