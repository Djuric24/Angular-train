import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../train/model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  url: string = "http://localhost:3000/api"
  constructor(private http: HttpClient) { }

  getAllTrains(params?:any) {
    let queryParams = {}
    if (params) {
      queryParams = {
        params: new HttpParams()
        .set("filter",params.filter && JSON.stringify(params.filter) || "")
      }
    }
    return this.http.get(this.url + "/trains", queryParams)
  }
  getFilterParams() {
    return this.http.get(this.url + "/stations")
  }
  getSingleTrain(id: number) {
    return this.http.get(this.url + "/trains/" + id)
  }
  buyTicket(data: Ticket) {
    return this.http.post(this.url + "/tickets", data)
  }
  getAllTickets(params?:any) {
    let queryParams = {}
    if (params) {
      queryParams = {
        params: new HttpParams()
        .set("sort", params.sort || "desc")
        .set("field", params.field || "departure")
      }
    }
    return this.http.get(this.url + "/tickets", queryParams)
  }
  deleteTicket(id: number) {
    return this.http.delete(this.url + "/tickets/" + id)
  }
}
