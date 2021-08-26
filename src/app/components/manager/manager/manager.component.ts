import { Component, OnInit } from '@angular/core';
import { FieldStudent } from 'src/app/model/fieldstudent';
import { User } from 'src/app/model/user';
import { ManagerService } from 'src/app/services/manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

     enrollnemtList:Array<FieldStudent>;
     currentMenager:User;

  constructor(private managerService:ManagerService) {
    this.currentMenager = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit(): void {
    this.findAllEnrollments();

  }
  findAllEnrollments(){
    this.managerService.findAllEnrollments().subscribe(data=>{
      this.enrollnemtList=data;
      console.log(this.enrollnemtList);

    });
  }

}
