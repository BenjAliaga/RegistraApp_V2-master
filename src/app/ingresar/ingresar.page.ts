import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  styleUrls: ['./ingresar.page.scss'],
})
export class IngresarPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private alertController: AlertController, private router: Router) {
    this.formularioLogin = this.fb.group({
      'nombre' : new FormControl("", Validators.required),
      'contrasena' : new FormControl("", Validators.required)
    })
   }

  ngOnInit() {
  }
  async ingresar() {
    var f = this.formularioLogin.value;
    var nombreUsuario = localStorage.getItem('nombreUsuario');
    var contrasenaUsuario = localStorage.getItem('contrasenaUsuario');
    
    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Datos Incorrectos',
        buttons: ['OK']
      });

      await alert.present();
      return;
    } else if (nombreUsuario == f.nombre && contrasenaUsuario == f.contrasena) {
      localStorage.setItem('autenticado', 'true');
      this.router.navigate(["/home"]);
    } else {
      const alert = await this.alertController.create({
        header: 'Mensaje',
        message: 'Datos Incorrectos',
        buttons: ['OK']
      });

      await alert.present();
      return;
    }
  }

}
