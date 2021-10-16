import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../modals/create-user/create-user.component';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { EditUser } from '../modals/edit-user/edit-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'table-material',
  templateUrl: './table-material.component.html',
  styleUrls: ['./table-material.component.css'],
})
export class TableMaterialComponent implements OnInit, AfterViewInit {
  @Input() displayedColumns: string[];
  @Input() data: any[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  public dataSource: MatTableDataSource<any> = new MatTableDataSource([]);

  private setData = () => {
    this.userMaintainer.getAll().subscribe(
      (user) => {
        this.data = [];
        user.forEach((e) => {
         
            this.data.push({
              name: e.name,
              email: e.email,
              code: e.code,
              population: e.population,
              postal_code: e.postal_code,
              city: e.city,
              address:e.address,
              phone: e.phone,
            });
          
        });

        this.dataSource = new MatTableDataSource([]);
        this.dataSource.data = this.data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      },
      () => {
        Swal.fire('Ups', 'Algo salió mal', 'error');
      }
    );
  };

  constructor(
    private dialog: MatDialog,
    private userMaintainer: UserService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = [];
    this.setData();
  }
  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  get isEmpty(): boolean {
    return !this.dataSource.data.length;
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '50%',
      minWidth: '350px',
    });
    dialogRef
      .afterClosed()
      .subscribe((data) => this.create(data, this.userMaintainer));
  }
  editDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUser, {
      data: user,
      width: '50%',
      minWidth: '350px',
    });
    dialogRef
      .afterClosed()
      .subscribe((data) => this.edit(data, this.userMaintainer));
  }
  deleteDialog(user: User): void {
    Swal.fire({
      title: 'Confirmar acción',
      text: `Desea eliminar al usuario ${user.name} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          `El usuario ${user.name} ha sido eliminado`,
          'success'
        );

        this.delete(user);
      }
    });
  }

  private create(data: any, userMaintainer: UserService) {

    console.log('uso')
    console.log(data)
    if (data) {
      if (data.data) data = data.data;
      userMaintainer.create(data).subscribe(
        (rsp) => {
          this.setData();
          Swal.fire(rsp, '', 'success');
        },
        (error) => Swal.fire('Ups', error, 'error')
      );
    }
  }
  private edit(data: any, userMaintainer: any) {
    if (data) {
      if (data.data) data = data.data;
      userMaintainer.edit(data).subscribe(
        (rsp) => {
          this.setData();
          Swal.fire(rsp, '', 'success');
        },
        (error) => Swal.fire('Ups', error, 'error')
      );
    }
  }

  private delete(data: User) {
    if (data) {
      this.userMaintainer.delete(data.code).subscribe(
        () => {
          this.setData();
        },
        () => Swal.fire('Ups', 'Algo salió mal', 'error')
      );
    }
  }


}
