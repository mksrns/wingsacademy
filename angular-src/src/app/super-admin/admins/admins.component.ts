import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  admins: any;

  constructor(private adminServ: AdminService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllAdmin();
  }

  getAllAdmin(){ 
    return this.adminServ.getAll().subscribe(
      (data:any) => {
        this.admins = data.admin;
        console.log(this.admins);
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteAdmin(id:string){
    this.adminServ.delete(id).subscribe((data:any) => {
      console.log(data);
      this.getAllAdmin();
      this.toastr.success('Admin Deleted successfully');
    },
    error => {
      console.log(error);
      this.toastr.success('Error occured');
    }
    );
  }

}
