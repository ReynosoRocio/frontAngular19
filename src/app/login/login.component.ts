import { Component } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgSelectModule, FormsModule, NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent], // Importa aquí los módulos que necesites
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

  // correo electrónico, password, nombre, fecha de nacimiento y estado de nacimiento.
  user :
  { selectedState : number | null,
    email : string | null,
    password : string | null,
    password1 : string | null,
    name : string | null,
    birthDate : Date | null } = {
      selectedState: null,
      email: null,
      password: null,
      password1: null,
      name: null,
      birthDate: null
  };

  onSignUpClick(): void {
    this.isRightPanelActive = true;
  }

  onSignInClick(): void {
    this.isRightPanelActive = false;
  }


}