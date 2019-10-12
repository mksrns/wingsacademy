import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
// import * as $ from 'jquery';
declare var $:any;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  events: any;
  addEventForm: FormGroup;
  updateEventForm: FormGroup;
  eventData: any;
  isAddedEvent: boolean;
  image: any;
  singleEvent: any;
  imageUrl: string = '/assets/images/more.png';
  fileToUpload: File = null;
  
  constructor(private eventServ: EventService, private toastr: ToastrService, private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.getAllEvents();

    this.addEventForm = this.formbuilder.group({ 
      title:['', [Validators.required]],
      description: ['', []],
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      eventImage: ['']
    });
    this.updateEventForm = this.formbuilder.group({ 
      title:[''],
      description: ['', []],
      from: [''],
      to: [''],
      eventImage: ['']
    });

  }

  openModal(){
    $('#modelId').modal();
  }
  closeModal(){
    $('#modelId').modal('hide');
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
  getSingleEvent(eventId){
    return this.eventServ.getSingle(eventId).subscribe((data:any) => {
      this.singleEvent = data.event;
      console.log(data.event);
    });
  }
  
  onSelectedFile(event){
    if(event.target.files.length > 0){
      const eveImg = event.target.files[0];
      this.addEventForm.get('eventImage').setValue(eveImg);
    }
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  onCreate(){
    const formData = new FormData();
    formData.append('title', this.addEventForm.get('title').value);
    formData.append('description', this.addEventForm.get('description').value);
    formData.append('from', this.addEventForm.get('from').value);
    formData.append('to', this.addEventForm.get('to').value);
    formData.append('eventImage', this.addEventForm.get('eventImage').value);
    this.addEvent(formData);
  }
  addEvent(formData){
    this.eventServ.create(formData).subscribe(
      (event:any)=>{ 
        if(event.type === HttpEventType.UploadProgress){
          console.log('upload progress: ' + Math.round(event.loaded/event.total * 100) + '%');
        } else if(event.type === HttpEventType.Response){
          console.log(event);
          this.toastr.success("Event added successfully");
          this.getAllEvents();
          this.closeModal();
        }
    },
      error=>{
        console.log(error);
        this.toastr.error("Error Occured");
      }
    );
  }

  getEvent(eventId){
    this.getSingleEvent(eventId);
  }

  onSelectedFileUpdate(event){
    if(event.target.files.length > 0){
      const eveImgUpdate = event.target.files[0];
      this.updateEventForm.get('eventImage').setValue(eveImgUpdate);
    }
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }
  onUpdate(eventId){ 
    const formDataUpdate = new FormData();
    formDataUpdate.append('title', this.updateEventForm.get('title').value);
    formDataUpdate.append('description', this.updateEventForm.get('description').value);
    formDataUpdate.append('from', this.updateEventForm.get('from').value);
    formDataUpdate.append('to', this.updateEventForm.get('to').value);
    formDataUpdate.append('eventImage', this.updateEventForm.get('eventImage').value);
    this.eventServ.update(eventId, formDataUpdate).subscribe(
      (data:any)=>{ 
        console.log(data);
        this.toastr.success("Event updated successfully");
        this.getAllEvents();
        this.closeModal();
      },
      error=>{
        console.log(error.error);
        this.toastr.error("Error Occured");
      }
    );
  }
  
  deleteEvent(event){
    return this.eventServ.delete(event).subscribe((data:any) => {
      console.log(data);
      this.getAllEvents();
      this.toastr.success('Event deleted successfully');
    },
    error => {
      console.log(error);
      this.toastr.error('error occured');
    });
  }
}
