import { Component, OnInit } from '@angular/core'; // Import OnInit
import { FormsModule } from '@angular/forms';

import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Select2 } from 'ng-select2-component'; // Import Select2 component

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, Select2], // Ensure Select2 is here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit { // Implement OnInit
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
  { selectedState : string | null | undefined | number | boolean  | object,
    email : string ,
    password : string ,
    password1 : string ,
    name : string,
    lastname : string,
    birthDate : Date | null } = {
      selectedState: null,
      email: '',
      password: '',
      password1: '',
      name: '',
      lastname: '',
      birthDate: null
  };

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
  
  onSubmitSignIn(form: NgForm): void {
    if (form.valid) {
      console.log('Inicio de sesión exitoso:', this.user);
    } else {
      console.log('Formulario de inicio de sesión inválido');
    }
  }

  isEmailInvalid(form: NgForm): boolean {
    return form?.submitted && this.user?.email && form.controls['emailL']?.errors?.['email'];
  }

  updateSelect(event: any): void {
    console.log('Selected state:', event.target.value);
    //this.user.selectedState = event.target.value;
  }
}