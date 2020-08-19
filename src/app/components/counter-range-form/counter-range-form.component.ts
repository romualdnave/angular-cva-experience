import { Component, forwardRef, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, ControlValueAccessor, NG_VALUE_ACCESSOR, Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface CounterRangeValues {
  a: number,
  b: number
}

@Component({
  selector: 'counter-range-form',
  templateUrl: './counter-range-form.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterRangeFormComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CounterRangeFormComponent),
    multi: true
  }]
})
export class CounterRangeFormComponent implements ControlValueAccessor, OnDestroy {
  rangeForm: FormGroup;

  subscriptions: Subscription[] = [];

  onChange: Function = (_: any) => {};
  onTouched: Function = () => {};

  get value(): CounterRangeValues {
    return this.rangeForm.value;
  }

  set value(value: CounterRangeValues) {
    this.rangeForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  constructor(private fb: FormBuilder) {
    this.rangeForm = this.fb.group({
      a: [0, Validators.required],
      b: [10, Validators.required]
    });

    this.subscriptions.push(
      this.rangeForm.valueChanges.subscribe((value: CounterRangeValues) => {
        this.onChange(value);
        this.onTouched();
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  writeValue(value: CounterRangeValues) {
    if(value) {
      this.value = value;
    }

    if(value === null) {
      this.rangeForm.reset();
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(c: FormControl) {
    return this.rangeForm.valid ? null : { range: { valid: false } };
  }

}