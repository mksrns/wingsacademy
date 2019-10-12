import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Admin } from '../../_models/admin';
import * as $ from 'jquery';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logged:boolean = false;
  loginError:string;
  loginForm:FormGroup;

  constructor(private titleServ: Title, private formbuilder: FormBuilder, private router:Router, public adminServ:AdminService) { }

  ngOnInit() {
    this.titleServ.setTitle("Admin Login");

    this.loginForm = this.formbuilder.group({ 
      username:['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.adminServ.logout();
    
    // login form
    $(function(){
      $(".borderbtm input").on("focus", function(){
          $(this).addClass("focus");
      });
      $(".borderbtm input").on("blur", function(){
          if($(this).val()  == "")
              $(this).removeClass("focus");
      });
    });
  }

  onFormSubmit(){
    let admin = this.loginForm.value;
     this.login(admin);
  }

  login(admin:Admin){
    this.adminServ.login(admin).subscribe(
        data => {
          localStorage.setItem('currentAdmin', JSON.stringify(data.token));
          if(this.adminServ.isLoggedIn()){
            this.router.navigate(['/admins/dashboard']);
          }
        },
        
        error => {this.logged = true, console.log(error)}
    );
  } 

}