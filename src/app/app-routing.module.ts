import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { AddEditTicketComponent } from './components/add-edit-ticket/add-edit-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: TicketListComponent,
    pathMatch: 'full'
  },
  {
    path: 'tickets',
    component: TicketListComponent
  },
  {
    path: 'tickets/:id',
    component: AddEditTicketComponent
  },
  {
    path: 'create-ticket',
    component: AddEditTicketComponent
  },
  // {
  //   path: '**',
  //   component: 
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
