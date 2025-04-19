import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Select2 } from 'ng-select2-component'; // Import Select2 component
import { AuthenticationService } from '../authentication.service';
import { states } from '../models/states.model'; // Import the states array

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, Select2],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isRightPanelActive = false;
  isDestopOrLaptop = true;

  states = states; // Use the imported states array

  user :
  { stateBirth : string | null | undefined | number | boolean  | object,
    email : string ,
    password : string ,
    password1 : string ,
    name : string,
    lastname : string,
    birthDate : Date | null,
    oldPassword : string | null | undefined,
    userType : number | null | undefined
  } = {
      stateBirth: null,
      email: '',
      password: '',
      password1: '',
      name: '',
      lastname: '',
      birthDate: null,
      oldPassword: null,
      userType: null
  };

  errorMessage = '';
  showErrorPopup = false; // Controla la visibilidad del popup

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isDestopOrLaptop = window.matchMedia('(min-width: 768px)').matches;
    window.addEventListener('resize', () => {
      this.isDestopOrLaptop = window.matchMedia('(min-width: 768px)').matches;
    });
  }

  onSignUpClick(): void {
    this.isRightPanelActive = true;
  }

  onSignInClick(): void {
    this.isRightPanelActive = false;
  }

  onSubmitSignUp(form: NgForm): void {
    if (form.valid) {
      console.log('Registro exitoso:', this.user);
    } else {
      console.log('Formulario de registro inválido');
    }
  }
  
  onSubmitSignIn(signInForm: NgForm): void {
    if (signInForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.showErrorPopup = true; // Muestra el popup
      return;
    }

    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (response) => {
        if (response) {
          const userType = this.authService.getUserType();
          if (userType == 0) {
            this.router.navigate(['/users']); // Admin
          } else {
            this.router.navigate(['/profile']); // Usuario normal
          }
        } else {
          this.errorMessage = 'Error al iniciar sesión. Token inválido.';
          this.showErrorPopup = true; // Muestra el popup
        }
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = error.error?.error || 'Ocurrió un error al iniciar sesión.';
        this.showErrorPopup = true; // Muestra el popup
      }
    });
  }

  closeErrorPopup(): void {
    this.showErrorPopup = false; // Cierra el popup
  }

  isEmailInvalid(form: NgForm): boolean {
    return form?.submitted && this.user?.email && form.controls['emailL']?.errors?.['email'];
  }

  updateSelect(event: any): void {
    console.log('Selected state:', event.target.value);
  }
}