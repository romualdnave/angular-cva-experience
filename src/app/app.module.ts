import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CounterInputComponent } from './components/counter-input/counter-input.component';
import { CounterRangeFormComponent } from './components/counter-range-form/counter-range-form.component';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule ],
  declarations: [ AppComponent, CounterInputComponent, CounterRangeFormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
