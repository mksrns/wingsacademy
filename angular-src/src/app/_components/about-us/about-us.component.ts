import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/_services/about.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  about: any;

  constructor(private aboutServ: AboutService) { }

  ngOnInit() {
    this.getAboutData();
  }

  getAboutData(){
    return this.aboutServ.getAbout().subscribe((data:any) => {
      this.about = data.about[0];
    },
    error => {
      console.log(error);
    });
  }
 
}
