import { Component, OnInit } from '@angular/core';
import { InputService } from '../../services/input.service';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { user, users, final } from '../../models/types';
import gql from 'graphql-tag';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  users;

  finalData= [];
  dataFromGraphql = [];
  dataFromExpress = [];
  userData = {
    "userId": 0,
    "id": 0,
    "title": "delectus aut autem",
    "completed": false
  }

  constructor(private inputservice: InputService,
    private apollo: Apollo,
    private httplink: HttpLink) { }

  ngOnInit() {
    this.data1();
    this.data();
  }

  data1() {
    this.users = this.apollo.watchQuery<users>({
      query: gql`
      query {
        allUsers {
          id
          email
          name
        }
      }
      `
    })
      .valueChanges
      .subscribe(data => {
        console.log(data);
        for (let i = 0; i < 10; i++) {
          this.dataFromGraphql.push(data.data.allUsers[i]);
         
        }
        console.log(this.dataFromGraphql);
        this.getFinalData();


      });
  }

  data() {
    this.inputservice.getDataFromApi().subscribe((data: any) => {
      console.log(data);
      for (let j = 0; j < 10; j++) {
        this.dataFromExpress.push(data[j]);
       
      }
      console.log('datafromexpress',this.dataFromExpress);
    })

  }

  getFinalData() {
    for (let i = 0; i < 10; i++) {
      let final ={
        profileId: this.dataFromExpress[i].id,
        id : this.dataFromGraphql[i].id,
        name : this.dataFromGraphql[i].name,
        email : this.dataFromGraphql[i].email,
        title : this.dataFromExpress[i].title,
        completed : this.dataFromExpress[i].completed
      };
      this.finalData.push(final);
    }
    console.log(this.finalData);
    
  }

  singleObjectCall(id){
   console.log(id);
   
    this.inputservice.getSingleData(id).subscribe((data:any) => {
      console.log(data);
      this.userData = data;
    })
  }
}
