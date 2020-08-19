import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createCounterRangeValidator } from './components/counter-input/validator';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
     this.form = this.fb.group({
      counter: [5, createCounterRangeValidator(10, 0)],
      values: [{
        a: 1,
        b: 2
      }]
    });
  }

}
