import { Input, Output, EventEmitter, Component,OnInit,AfterViewInit} from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, FormBuilder,Validators,AbstractControl } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {sqlSelectValidator} from './sqlValidator';
@Component({
  selector: 'app-map-config',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './map-config.component.html',
  styleUrl: './map-config.component.css'
})
export class MapConfigComponent implements AfterViewInit {
  constructor(private formBuilder: FormBuilder) { }
  @Input() sqlString: string = "no Input";
  @Output() reciveSqlString = new EventEmitter<string>();
  form: FormGroup = new FormGroup({
    sql: new FormControl(''),
  });
  submitted = false;
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  ngAfterViewInit(): void {
    this.form = this.formBuilder.group(
      {
        sql: ["",[Validators.required, sqlSelectValidator()]]
      });
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.sqlString = this.form.value.sql;
    this.reciveSqlString.emit(this.sqlString);
    }




/*   AfterViewInit() {
    this.form = this.form.group(
      {
        fullname: 
  }
} */
}
