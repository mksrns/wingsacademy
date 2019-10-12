import { Component, OnInit } from '@angular/core';

import "lightgallery";
import "lg-thumbnail";
import "lg-video";
import "lg-zoom";
import "lg-fullscreen";
import "lg-autoplay";
import "lg-hash";
import "lg-pager";
import "lg-share";
import * as $ from 'jquery';

@Component({
  selector: 'app-all-stories',
  templateUrl: './all-stories.component.html',
  styleUrls: ['./all-stories.component.scss']
})
export class AllStoriesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $('#lightgallery').lightGallery({
        pager: true
      });
    });
  } 

}
