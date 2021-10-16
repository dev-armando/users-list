import { Component, OnInit, ViewChild } from '@angular/core';
import { TableMaterialComponent } from '../table-material/table-material.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  displayedColumns: string[] = [
    'code',
    'name',
    'address',
    'population',
    'postal_code',
    'city',
    'phone',
    'email',
    'acciones',
  ];
  data: any = [];

  @ViewChild(TableMaterialComponent)
  tableMaterialComponent: TableMaterialComponent;

  constructor() {}

  ngOnInit(): void {}
}
