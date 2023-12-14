import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  translatedDescription: any;
  jsonData: any;
  nombreUsuario = localStorage.getItem('nombreUsuario');

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
        
      },
    },
  ];
   
  public currentDateTime: string = ''; // Inicializamos la propiedad con una cadena vacía

  public color1 = '#002138';
  public color2 = '#F8B31C';
  public currentColor = this.color1;


  constructor(public router: Router, private httpClient: HttpClient,private el: ElementRef,private renderer: Renderer2,) {
    this.fetchData();
  }

  fetchData() {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=-33.6861&lon=-71.2169&appid=8f12d732c06c59b005672534b1a0504e';
    this.httpClient.get(apiUrl).subscribe((data) => {
      this.jsonData = data;

      if (this.jsonData.weather[0].description) {
        this.translateDescription(this.jsonData.weather[0].description);
      }
    });
  }

  translateDescription(description: string) {
    const targetLanguage = 'es'; // Cambia 'es' por el idioma de destino que desees
    const apiKey = 'AIzaSyADZFJZuypE3WpLJxw-SAK2iIzAOqqgZ0U'; // Reemplaza con tu clave de API de Google Cloud

    const translateUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      q: description,
      target: targetLanguage,
    };

    this.httpClient.post(translateUrl, body, { headers }).subscribe((response: any) => {
      this.translatedDescription = response.data.translations[0].translatedText;
    });
  }

  
  
  ngOnInit() {
    this.updateCurrentDateTime();
    setInterval(() => {
      this.updateCurrentDateTime();
      this.toggleColor();
    }, 1000); // Cambia cada 2 segundos (2000ms)
  }
  updateCurrentDateTime() {
    const now = new Date();
    this.currentDateTime = this.formatDate(now);
  }
  formatDate(date: Date): string {
    const day = date.getDate();
    const monthNames = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day} ${monthNames[monthIndex]} ${year} ${hours}:${minutes}:${seconds}`;
  }

  toggleColor() {
    const title = this.el.nativeElement.querySelector('ion-title');

    if (this.currentColor === this.color1) {
      this.renderer.setStyle(title, 'color', this.color2);
      this.currentColor = this.color2;
    } else {
      this.renderer.setStyle(title, 'color', this.color1);
      this.currentColor = this.color1;
    }
  }

}
