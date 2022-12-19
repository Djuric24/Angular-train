import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BuyTicketComponent } from './train/buy-ticket/buy-ticket.component';
import { TicketListComponent } from './train/ticket-list/ticket-list.component';
import { TrainDetailsComponent } from './train/train-details/train-details.component';
import { TrainListComponent } from './train/train-list/train-list.component';

const routes: Routes = [
  {path: "trains", component: TrainListComponent},
   {path: "details/:id", component: TrainDetailsComponent},
  // {path: "trains/:id", component: TrainDetailsComponent }, ne radi
  { path: "buyticket/:id", component: BuyTicketComponent },
  {path: "tickets", component: TicketListComponent},
  {path: "about", component: AboutComponent},
  {path: "", redirectTo: "trains", pathMatch: "full"}
];
//neznam gde prouke :D
//gledaj
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
