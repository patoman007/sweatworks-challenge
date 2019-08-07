import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './shared/material/material.module';
import { UiModule } from './shared/ui/ui.module';
import { AppRoutingModule } from './app-routing.module';

import { AppService } from './app.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthorsLoadingComponent } from './components/sidenav/authors-loading/authors-loading.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    UiModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    AuthorsLoadingComponent,
    FooterComponent,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
