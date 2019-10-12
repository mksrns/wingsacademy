import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import {MatButtonModule, MatCheckboxModule, MatNativeDateModule, MatDatepickerModule, MatAutocompleteModule, MatTableModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatTooltipModule, MatDialogModule} from '@angular/material';

import { NgxPrintModule } from 'ngx-print';

const MaterialComponents = [
  MatToolbarModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  LayoutModule,
  MatDialogModule,
  MatIconModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatTableModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,

  //other modules
  NgxPrintModule,
]

@NgModule({
  declarations: [],
  imports: [ 
    MaterialComponents
  ],
  exports: [ MaterialComponents ]
})
export class AngularMaterialModule { }
