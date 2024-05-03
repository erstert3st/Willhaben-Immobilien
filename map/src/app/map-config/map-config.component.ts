import { Input, Output, EventEmitter, Component, OnInit, AfterViewInit } from '@angular/core';
import { NgxAngularQueryBuilderModule, QueryBuilderClassNames, QueryBuilderConfig } from "ngx-angular-query-builder";
import { Parser } from 'node-sql-parser';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//rmme
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-map-config',
  standalone: true,
  imports: [CommonModule, NgxAngularQueryBuilderModule, FormsModule],
  templateUrl: './map-config.component.html',
  styleUrl: './map-config.component.css'
})
export class MapConfigComponent {
  loadOverlay() {
    throw new Error("I am a client error");
  }
  saveOverlay() {
    this.http.get("brokenURL").subscribe();
  }


  constructor(private http: HttpClient) { }
  @Input() sqlString: string = "no Input";
  @Output() reciveSqlString = new EventEmitter<string>();
  //https://github.com/raysuelzer/ngx-angular-query-builder
  //https://stackblitz.com/edit/angular-material-13-starter-x1xj4z-p5tddv?file=src%2Fapp%2Fapp.component.ts
  //std
  parser = new Parser();

  query = {
    condition: 'and',
    rules: [
      { field: 'property_type', operator: '=', value: "test" },
    ]
  };

  public generateSqlWhere(query: any = this.query) {
    try {
      let sqlQuery = '';
      if (query.rules) {
        const conditions = query.rules.map((rule: any) => {
          if ('condition' in rule && 'rules' in rule) {
            // This is a nested condition, so handle it recursively
            return `${this.generateSqlWhere(rule)}`;
          } else {
            // This is a simple rule, so handle it directly
            return `(${rule.field} ${rule.operator} '${rule.value}')`;
          }
        });
        sqlQuery += conditions.join(` ${query.condition} `);
      }
      return sqlQuery;
    } catch (e) {
      throw new Error("SQL where could not be generated");
    }
  }
  public generateSql() {
    try {
      let sqlQuery = 'Select * from test2 where ';
      let where = this.generateSqlWhere();
      sqlQuery = sqlQuery + where;
      this.sqlString = sqlQuery;
      this.checkAndSendSql()
    } catch (e) {
      throw new Error("SQL  could not be generated");
    }
  }

  public checkAndSendSql() {
    try {
      console.log(this.sqlString);
      try {
        const ast = this.parser.astify(this.sqlString); // parse the SQL statement
        console.log('The SQL statement is valid.');
        this.reciveSqlString.emit(this.sqlString);
      } catch (error) {
        console.error('The SQL statement is not valid:', error);
      }
    } catch (e) {
      throw new Error("SQL could not send to Parent");
    }
  }
  config: QueryBuilderConfig = {
    fields: {
      property_type: { name: 'Typ', type: 'string' },
      number_of_rooms: { name: 'Zimmer', type: 'number' },
      price: { name: 'Preis', type: 'number' },
      size_qm: { name: 'Wohnfläche', type: 'number' },
      location: { name: 'Ort', type: 'string' },
      floor: { name: 'Stockwerk', type: 'string' },
      address: { name: 'Adresse', type: 'string' },
      property_type_flat: { name: 'ZusatzTyp', type: 'string' },
      free_area_type_name: { name: 'Zusatz', type: 'string' },
      free_area_total: { name: 'FlächeZusatz', type: 'number' },
      estate_size_living_area: { name: 'Wohnzimmer', type: 'number' },
      is_private: { name: 'Privat', type: 'number' }
    }
  }
  /*   CREATE TABLE insertName (
  
  gender: {
          name: 'Gender',
          type: 'category',
          options: [
            { name: 'Male', value: 'm' },
            { name: 'Female', value: 'f' }
          ]
        }
  
  */
  public bootstrapClassNames: QueryBuilderClassNames = {
    removeIcon: 'fa fa-minus',
    addIcon: 'fa fa-plus',
    arrowIcon: 'fa fa-chevron-right px-2',
    button: 'btn',
    buttonGroup: 'btn-group',
    rightAlign: 'order-12 ml-auto',
    switchRow: 'd-flex px-2',
    switchGroup: 'd-flex align-items-center',
    switchRadio: 'custom-control-input',
    switchLabel: 'custom-control-label',
    switchControl: 'custom-control custom-radio custom-control-inline',
    row: 'row p-2 m-1',
    rule: 'border',
    ruleSet: 'border',
    invalidRuleSet: 'alert alert-danger',
    emptyWarning: 'text-danger mx-auto',
    operatorControl: 'form-control',
    operatorControlSize: 'col-auto pr-0',
    fieldControl: 'form-control',
    fieldControlSize: 'col-auto pr-0',
    entityControl: 'form-control',
    entityControlSize: 'col-auto pr-0',
    inputControl: 'form-control',
    inputControlSize: 'col-auto'
  };


}
