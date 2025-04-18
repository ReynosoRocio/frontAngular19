import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
//import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Select2 } from 'ng-select2-component'; // Import Select2 component
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,  Select2], // Add HttpClientModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isRightPanelActive = false;
  isDestopOrLaptop = true;

  states: Array<{ value: string; label: string }> = [
    { value: "1", label: "Aguascalientes" },
    { value: "2", label: "Campeche" },
    { value: "3", label: "Chiapas" },
    { value: "4", label: "Chihuahua" },
    { value: "5", label: "Coahuila" },
    { value: "6", label: "Colima" },
    { value: "7", label: "Durango" },
    { value: "8", label: "Estado de México" },
    { value: "9", label: "Guanajuato" },
    { value: "10", label: "Guerrero" },
    { value: "11", label: "Hidalgo" },
    { value: "12", label: "Jalisco" },
    { value: "13", label: "Michoacán" },
    { value: "14", label: "Morelos" },
    { value: "15", label: "Nayarit" },
    { value: "16", label: "Nuevo León" },
    { value: "17", label: "Oaxaca" },
    { value: "18", label: "Puebla" },
    { value: "19", label: "Querétaro" },
    { value: "20", label: "Quintana Roo" },
    { value: "21", label: "San Luis Potosí" },
    { value: "22", label: "Sinaloa" },
    { value: "23", label: "Sonora" },
    { value: "24", label: "Tabasco" },
    { value: "25", label: "Tamaulipas" },
    { value: "26", label: "Tlaxcala" },
    { value: "27", label: "Veracruz" },
    { value: "28", label: "Yucatán" },
    { value: "29", label: "Zacatecas" },
    { value: "30", label: "Baja California" },
    { value: "31", label: "Baja California Sur" },
    { value: "32", label: "Ciudad de México" },
  ];

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
      return;
    }

    this.authService.login(this.user.email, this.user.password).subscribe({
      next: (response) => {
        this.authService.setToken(response.token); // Guarda el token en el servicio de autenticación
        const userType = this.authService.getUserType();

        // Redirige según el tipo de usuario
        if (userType == 0) {
          this.router.navigate(['/users']); // Admin
        } else {
          this.router.navigate(['/profile']); // Usuario normal
        }
      },
      error: (error) => {
        this.errorMessage = error.message; // Muestra el mensaje de error
      }
    });
  }

  isEmailInvalid(form: NgForm): boolean {
    return form?.submitted && this.user?.email && form.controls['emailL']?.errors?.['email'];
  }

  updateSelect(event: any): void {
    console.log('Selected state:', event.target.value);
  }
}