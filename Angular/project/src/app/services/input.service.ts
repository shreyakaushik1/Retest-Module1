import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor(private http: HttpClient) { }

  getDataFromApi(){
    return this.http.get('http://localhost:5000/getApiResponse');
  }

  getSingleData(id){
    return this.http.get('https://jsonplaceholder.typicode.com/todos/'+id);
  }
}
