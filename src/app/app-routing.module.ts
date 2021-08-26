import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { UnauthorizedComponent } from './components/error/unauthorized/unauthorized.component';
import { ManagerComponent } from './components/manager/manager/manager.component';
import { StudentComponent } from './components/student/student/student.component';
import { TeacherComponent } from './components/teacher/teacher/teacher.component';
import { HomeComponent } from './components/user/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './model/role';


const routes: Routes = [
  //public pages
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileComponent},

  {path:'student', component:StudentComponent,
   canActivate:[AuthGuard],
    data:{roles:[Role.STUDENT]}
  },

  {path:'student/:id', component:StudentComponent, canActivate:[AuthGuard],
  data:{roles:[Role.STUDENT]}
  },
  {path:'teacher', component:TeacherComponent, 
  canActivate:[AuthGuard],
  data:{roles:[Role.TEACHER]}
},
  {path:'manager', component:ManagerComponent, 
  canActivate:[AuthGuard],
  data:{roles:[Role.MANAGER]}
},
  {path:'404', component:NotFoundComponent},
  {path:'401', component:UnauthorizedComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  constructor( private router:Router){
    this.router.errorHandler=(error:any)=>{
      this.router.navigate(['/404']);
    }
  
  }
}
