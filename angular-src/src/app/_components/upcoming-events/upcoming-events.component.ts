import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.scss']
})
export class UpcomingEventsComponent implements OnInit {
  events: any;

  constructor(private eventServ: EventService) { }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents(){
    return this.eventServ.getAll().subscribe((data:any) => {
      this.events = data.event;
      console.log(this.events);
    },
    error => {
      console.log(error);
    });
  }

}
