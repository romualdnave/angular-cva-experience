import { Component, Input, forwardRef, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { createCounterRangeValidator } from './validator';

@Component({
  selector: 'counter-input',
  templateUrl: './counter-input.component.html',
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CounterInputComponent),
      multi: true
    },
    { 
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CounterInputComponent),
      multi: true
    }
  ]
})
export class CounterInputComponent implements ControlValueAccessor, OnChanges {

  @Input() _counterValue: number = 0;

  @Input() counterRangeMax: number;

  @Input() counterRangeMin: number;
  
  get counterValue(): number {
    return this._counterValue;
  }

  set counterValue(value: number) {
    this._counterValue = value;
    this.onChange(this._counterValue);
  }

  validateFn: Function;

  onChange: Function = (_: any) => {};
  onTouched: Function = () => {};

  constructor() {}

  ngOnChanges(changes: any) {
    if (changes.counterRangeMin || changes.counterRangeMax) {
      this.validateFn = createCounterRangeValidator(this.counterRangeMax, this.counterRangeMin);
    }
  }

  validate(c: FormControl) {
    return this.validateFn(c);
  }

  increment(): void {
    this.counterValue++;
  }

  decrement(): void {
    this.counterValue--;
  }

  writeValue(value: number): void {
    if(value !== undefined) {
      this.counterValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}