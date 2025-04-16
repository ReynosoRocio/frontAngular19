import { Component } from '@angular/core';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button'; // Optional, if buttons are used in the menu
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppMenuComponent, RouterModule, CommonModule, MenubarModule, ButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private primeng: PrimeNG) {}
  
  ngOnInit() {
    this.primeng.ripple.set(true);
  }
  isLoginRoute(): boolean {
    return this.router.url.startsWith('/login') || this.router.url == '/' ; // Check if the current route starts with '/login'
  }
}
