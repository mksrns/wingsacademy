import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoryService } from 'src/app/_services/story.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  multipleImages: any = [];
  addStoryForm: FormGroup; 

  constructor(private storyServ: StoryService, private toastr: ToastrService, private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.addStoryForm = this.formbuilder.group({ 
      storyTitle:[''],
      storyImages:[]
    });
  }

  selectMultipleImage(event){
    if(event.target.files.length > 0){
      this.multipleImages = event.target.files;
      this.addStoryForm.get('storyImages').setValue(this.multipleImages); 
    }
  }
  onMultipleSubmit(){
    const formData = new FormData();
    formData.append('storyTitle', this.addStoryForm.get('storyTitle').value);
    for(let img of this.multipleImages){
      console.log(img);
      formData.append('storyImages', img);
    }

    this.storyServ.createStories(formData).subscribe((data: any) => {
        console.log(data);
      },
      error => {
        console.log(error)
      } 
    );
  }
}
