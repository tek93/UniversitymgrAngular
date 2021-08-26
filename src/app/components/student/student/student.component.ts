import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Field } from 'src/app/model/field';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  studentId:string;
  currentStudent:User;
  fieldList:Array<Field>;

  constructor( private route:ActivatedRoute, private userService:UserService)
   { 
     this.currentStudent = JSON.parse(localStorage.getItem("currentUser"));
     
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      if(params.has('id')){
        this.studentId = params.get('id');
      }

      if(this.studentId||this.currentStudent){
        this.findAllFieldsOfStudent();
      }
    });
  }
  findAllFieldsOfStudent(){
    if(!this.studentId){
      this.studentId = this.currentStudent.id.toString();

    }
    this.userService.findAllFieldsOfStudent(parseInt (this.studentId)).subscribe(data=>{
        this.fieldList=data;

    });
  }

}
