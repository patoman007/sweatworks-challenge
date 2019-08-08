import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './shared/material/material.module';
import { FormModule } from './shared/form/form.module';
import { UiModule } from './shared/ui/ui.module';
import { AppRoutingModule } from './app-routing.module';

import { AppService } from './app.service';
import { AuthorsService } from './shared/authors/authors.service';

import { AppComponent } from './app.component';
import { APP_COMPONENTS } from './app.common';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormModule,
    UiModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    APP_COMPONENTS
  ],
  providers: [AppService, AuthorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
