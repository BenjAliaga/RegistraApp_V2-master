import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  events: any[] = [];

  constructor(private httpClient: HttpClient) {
    
   }
  

  ngOnInit() {
    this.getGoogleCalendarEvents();
  }

  getGoogleCalendarEvents() {
    const calendarId = 'cr.nunezt@duocuc.cl'; // Reemplaza con el ID de tu calendario
    const apiKey = 'AIzaSyADZFJZuypE3WpLJxw-SAK2iIzAOqqgZ0U'; // Reemplaza con tu clave API de Google

    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

    this.httpClient.get(url).subscribe((data: any) => {
      this.events = data.items;
    });
  }

}
