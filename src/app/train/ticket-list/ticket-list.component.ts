import { Component, OnInit } from '@angular/core';
import { TrainService } from 'src/app/service/train.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: any
  constructor(private service: TrainService) { }
  params = {
    sort: "desc",
    field: "departure"
  }
  ngOnInit() {
    this.getTickets()
  }
  getTickets() {
    this.service.getAllTickets(this.params).subscribe((res:any) => {
      this.tickets = res.results
    })
  }
  deleteTickets(id: number) {
    this.service.deleteTicket(id).subscribe((res) => this.getTickets())
  }
}
