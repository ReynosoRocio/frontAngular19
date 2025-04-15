import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,NgSelectModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isRightPanelActive = false;

  states : Array<{id:number, name : String}> =  [
    { id: 1, name: "Aguascalientes" },
    { id: 2, name: "Campeche" },
    { id: 3, name: "Chiapas" },
    { id: 4, name: "Chihuahua" },
    { id: 5, name: "Coahuila" },
    { id: 6, name: "Colima" },
    { id: 7, name: "Durango" },
    { id: 8, name: "Estado de México" },
    { id: 9, name: "Guanajuato" },
    { id: 10, name: "Guerrero" },
    { id: 11, name: "Hidalgo" },
    { id: 12, name: "Jalisco" },
    { id: 13, name: "Michoacán" },
    { id: 14, name: "Morelos" },
    { id: 15, name: "Nayarit" },
    { id: 16, name: "Nuevo León" },
    { id: 17, name: "Oaxaca" },
    { id: 18, name: "Puebla" },
    { id: 19, name: "Querétaro" },
    { id: 20, name: "Quintana Roo" },
    { id: 21, name: "San Luis Potosí" },
    { id: 22, name: "Sinaloa" },
    { id: 23, name: "Sonora" },
    { id: 24, name: "Tabasco" },
    { id: 25, name: "Tamaulipas" },
    { id: 26, name: "Tlaxcala" },
    { id: 27, name: "Veracruz" },
    { id: 28, name: "Yucatán" },
    { id: 29, name: "Zacatecas" },
    { id: 30, name: "Baja California" },
    { id: 31, name: "Baja California Sur" },
    { id: 32, name: "Ciudad de México" },
  ];

  user :
  { selectedState : number | null,
    email : string | null,
    password : string | null,
    password1 : string | null,
    name : string | null,
    birthDate : Date | null } = {
      selectedState: null,
      email: '',
      password: '',
      password1: '',
      name: '',
      birthDate: null
  };


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
  
  onSubmitSignIn(form: NgForm): void {
    if (form.valid) {
      console.log('Inicio de sesión exitoso:', this.user);
    } else {
      console.log('Formulario de inicio de sesión inválido');
    }
  }
}