import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ticketList, TICKES_LIST_DATA_KEY } from './services/ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ticket-management';
  constructor(private readonly router: Router) {
    /**setting tickets list data in storage */
    sessionStorage.setItem(TICKES_LIST_DATA_KEY, JSON.stringify(ticketList));
    this.router.navigate(['/tickets']);
   }
}
