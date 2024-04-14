import { Input, Output, EventEmitter, Component, OnInit, AfterViewInit} from '@angular/core';
import { NgxAngularQueryBuilderModule,QueryBuilderClassNames,QueryBuilderConfig } from "ngx-angular-query-builder";

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-map-config',
  standalone: true,
  imports: [CommonModule, NgxAngularQueryBuilderModule, FormsModule],
  templateUrl: './map-config.component.html',
  styleUrl: './map-config.component.css'
})
export class MapConfigComponent  {
  constructor() { }
  @Input() sqlString: string = "no Input";
  @Output() reciveSqlString = new EventEmitter<string>();
//https://github.com/raysuelzer/ngx-angular-query-builder
  query = {
    condition: 'and',
    rules: [
      { field: 'age', operator: '<=', value: 'Bob' },
      { field: 'gender', operator: '>=', value: 'm' }
    ]
  };

  config: QueryBuilderConfig = {
    fields: {
      age: { name: 'Age', type: 'number' },
      gender: {
        name: 'Gender',
        type: 'category',
        options: [
          { name: 'Male', value: 'm' },
          { name: 'Female', value: 'f' }
        ]
      }
    }
  }

   classNames: QueryBuilderClassNames = {
    removeIcon: "fa fa-minus",
    addIcon: "fa fa-plus",
    arrowIcon: "fa fa-chevron-right px-2",
    button: "btn",
    buttonGroup: "btn-group",
    rightAlign: "order-12 ml-auto",
    switchRow: "d-flex px-2",
    switchGroup: "d-flex align-items-center",
    switchRadio: "custom-control-input",
    switchLabel: "custom-control-label",
    switchControl: "custom-control custom-radio custom-control-inline",
    row: "row p-2 m-1",
    rule: "border",
    ruleSet: "border",
    invalidRuleSet: "alert alert-danger",
    emptyWarning: "text-danger mx-auto",
    operatorControl: "form-control",
    operatorControlSize: "col-auto pr-0",
    fieldControl: "form-control",
    fieldControlSize: "col-auto pr-0",
    entityControl: "form-control",
    entityControlSize: "col-auto pr-0",
    inputControl: "form-control",
    inputControlSize: "col-auto"
  };


}
