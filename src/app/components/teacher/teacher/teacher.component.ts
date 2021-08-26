import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

 studentList:Array<User>;
 currentTeacher:User;


  constructor(private teacherService:TeacherService) { 
    this.currentTeacher=JSON.parse(localStorage.getItem('currentUser'));


  }

  ngOnInit(): void {
    this.findAllStudentOfInstructor();
  }
  findAllStudentOfInstructor(){
    this.teacherService.findAllStudentOfInstructor(this.currentTeacher.id).subscribe(data=>{
      this.studentList=data;
    });
  }

}
