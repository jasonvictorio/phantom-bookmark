import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ResultsComponent } from './pages/results/results.component';
import { FormComponent } from './components/form/form.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ResultsComponent,
    FormComponent,
    BookmarksComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
