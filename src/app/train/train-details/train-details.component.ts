import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TrainService } from 'src/app/service/train.service';
import { Train } from '../model/train';

@Component({
  selector: 'app-train-details',
  templateUrl: './train-details.component.html',
  styleUrls: ['./train-details.component.css']
})
export class TrainDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private service: TrainService) { }
    id: number = NaN
    train: Train = new Train()

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"]
      this.service.getSingleTrain(this.id).subscribe((train: any) => 
      {
        console.log(train)
        this.train = train})
    })
  }

}
