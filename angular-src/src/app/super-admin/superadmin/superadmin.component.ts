import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SuperAdminService } from 'src/app/_services/super-admin.service';
import * as $ from 'jquery';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share() 
    );
    

  constructor(private titleServ: Title, private superAminServ: SuperAdminService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.titleServ.setTitle("SuperAdmin Dashboard"); 
  }

  logout(){
    this.superAminServ.logout();
  }

}
