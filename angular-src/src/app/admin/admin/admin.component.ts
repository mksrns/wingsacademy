import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AdminService } from 'src/app/_services/admin.service';
import { Observable } from 'rxjs/internal/Observable';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    share() 
  );
  

  constructor(private titleServ: Title, private aminServ: AdminService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.titleServ.setTitle("Admin Dashboard"); 
  }

  logout(){
    this.aminServ.logout();
  }
  
}
