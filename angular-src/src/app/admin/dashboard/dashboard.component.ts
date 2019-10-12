import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private adminServ: AdminService) { }

  ngOnInit() {
    this.getCust();
  }
  getCust(){
    this.adminServ.getCustomers().subscribe((data:any) => {
      console.log(data);
    });
  }

}
