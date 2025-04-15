import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isRightPanelActive = false;

  onSignUpClick(): void {
    this.isRightPanelActive = true;
  }

  onSignInClick(): void {
    this.isRightPanelActive = false;
  }
}