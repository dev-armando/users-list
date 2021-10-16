import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableMaterialComponent } from '../../table-material/table-material.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUser implements OnInit {
  formCreate: FormGroup;
  

  constructor(
    public dialogRef: MatDialogRef<TableMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userMaintainer: UserService,
    private snackbarService: SnackbarService,
    
  ) {}

  ngOnInit(): void {
    forkJoin({
      user: this.userMaintainer.getCode(this.data.code)
    }).subscribe(({ user }) => {
      this.loadUser(user);
    
    });
    this.validateForm();
  }
  private loadUser(user: User) {
    this.data = user;
    this.validateForm();
  }


  validateForm() {
    this.formCreate = this.fb.group({
      code: [this.data.code, [Validators.required, Validators.maxLength(12)   ]],
      population: [this.data.population, [Validators.required, Validators.maxLength(100)]],
      postal_code: [this.data.postal_code, [Validators.required, Validators.maxLength(50)]],
      city: [this.data.city, [Validators.required, Validators.maxLength(100)]],
      email: [this.data.email, [Validators.required, Validators.email , Validators.maxLength(100) ]],
      address: [this.data.address, [Validators.required , Validators.maxLength(200) ]],
      phone: [
        this.data.phone,
        [Validators.required, Validators.pattern(/[0-9]+/) , , Validators.maxLength(20) ],

      ],
      name: [this.data.name, [Validators.required , Validators.maxLength(200)  ]],
      _id: [this.data._id, [Validators.required]],
    });
  }
  onSubmit() {
    if (this.formCreate.valid) {
      const { value } = this.formCreate;
      value.deleted = this.data.deleted;
      this.dialogRef.close({ data: value });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
  error(err) {
    this.snackbarService.error(err);
  }
}
