import { Component,OnInit } from '@angular/core';
import { Share } from '@capacitor/share';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular'; 

declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Cambiar contraseña', url: '/recuperar', icon: 'create' },
    
  ];
  public alertButtons = [
    {
      text: 'No',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Si',
      cssClass: 'alert-button-confirm',
      handler: () => {
        // Cuando el usuario confirma la alerta, navega a la página ingresar.
        localStorage.removeItem('autenticado');
        this.router.navigate(["/ingresar"]);
        this.menu.close();
      },
    },
  ];
  map: any;
  nombreUsuario = localStorage.getItem('nombreUsuario');
  constructor(public router: Router, private menu: MenuController) {}
  ngOnInit() {
    this.initMap();
  }

  compartirApp() {
    Share.share({
      title: 'Compartir myApp',
      url: 'https://bilbaolabs.cl/',
      dialogTitle: 'Es perfecta !',
    });
  }
  
  // cerrarSesion(){
  //   localStorage.removeItem('autenticado');
  //   this.router.navigate(["/ingresar"]);
  //   this.menu.close();
  // }
  initMap() {
    var myLatlng = new google.maps.LatLng(-33.694193321074266, -71.21368732569049);
    
    var mapOptions = {
      zoom: 16,
      center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
    var marker = new google.maps.Marker({
        position: myLatlng
    });
    
    marker.setMap(map);
  }

}
