import { getNumberOfCurrencyDigits } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainService } from 'src/app/service/train.service';
import { Station } from '../model/station';
import { Train } from '../model/train';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent implements OnInit {

  constructor(private service: TrainService) { }
  stations: Station[] = []
  listOfTrains: Train[] = []
  ngOnInit() {
    this.getAllTrains()
    this.getFilterParams()
  }
  params = {
    filter: {
      from: "",
      to: "",
    }
  }
  setFrom(data: any) {
    this.params.filter.from = data.target.value
    this.getAllTrains()
    //refresh
  }
  setTo(data:any) {
    this.params.filter.to = data.target.value
  
    this.getAllTrains()
  }
  getAllTrains() {
    this.service.getAllTrains(this.params).subscribe((res:any) => {
      this.listOfTrains = res.results
    })
  }
  getFilterParams() {
    this.service.getFilterParams().subscribe((res: any) => {
      this.stations = res.map((res: Station) => new Station(res))
    })
  }
  getHourMin(n: number): string {
    let hours = Math.floor(n/60)
    let minutes = Math.floor(n%60)

    let res = ''

    if (hours < 10) {
      res += `0${hours}:`
    } else {
      res+= `${hours}:`
    } 
 
    if (minutes < 10) {
      res += `0${minutes}`
    } else {
      res+= `${minutes}`
    } 

    return res
  }
  // getImg(type: any)

  // getTravels(departure: Date, arrival: Date)
}
