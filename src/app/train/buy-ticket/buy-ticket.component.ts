import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { TrainService } from 'src/app/service/train.service';
import { Ticket } from '../model/ticket';
import { Train } from '../model/train';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {
  form: FormGroup = new FormGroup({
    number: new FormControl(''),
    from: new FormControl(''),
    departure: new FormControl(''),
    to: new FormControl(''),
    arrival: new FormControl(''),
    price: new FormControl(0),
    name: new FormControl("", Validators.required),
    birthDate: new FormControl(null, Validators.required)
  });
  train: Train = new Train()
  constructor(private route: ActivatedRoute, private service: TrainService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getSingleTrain()
  }
  getSingleTrain() {
    this.route.params.subscribe((params: Params) => {
      this.service.getSingleTrain(params["id"]).subscribe((train: any) => {
        this.form.patchValue(train)
        this.form.get("arrival")?.patchValue(this.datePipe.transform(train.arrival, "dd/MM/YYYY,HH:mm a"))
        this.form.get("departure")?.patchValue(this.datePipe.transform(train.departure, "dd/MM/YYYY,HH:mm a"))
        this.form.disable()
        this.form.get("name")?.enable()
        this.form.get("birthDate")?.enable()
        this.train = train
      })
    })
  }
  buyTicket() {
    let data = new Ticket(this.train)
    data.name = this.form.controls["name"].value
    data.birthDate = this.form.controls["birthDate"].value
    this.service.buyTicket(data).subscribe((res) => console.log(res))
  }
}
