import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http:HttpClient) { }
  private host="http://localhost:8081";

  getAllStations(){
    return this.http.get(this.host+"/stations");
  }
}
