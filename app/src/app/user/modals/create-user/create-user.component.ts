import { SnackbarService } from '../../../services/snackbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableMaterialComponent } from '../../table-material/table-material.component';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  formCreate: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<TableMaterialComponent>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,

  ) {}

  ngOnInit(): void {
    this.initForm();
  }


  private initForm() {
    this.formCreate = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(12)   ]],
      population: ['', [Validators.required, Validators.maxLength(100)]],
      postal_code: ['', [Validators.required, Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email , Validators.maxLength(100) ]],
      address: ['', [Validators.required , Validators.maxLength(200) ]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/[0-9]+/) , , Validators.maxLength(20) ],

      ],
      name: [ '', [Validators.required , Validators.maxLength(200)  ]]
    });
     
   
  }

  checkPasswords(form: FormGroup) {
    // funcion syncrona para verificar que las contraseñas coinciden
    let pass = form.controls.password.value;
    let confirmPass = form.controls.password_verified.value;
    if (pass !== confirmPass) {
      form.controls.password_verified.setErrors({ checkPasswords: true });
    }
    return null;
  }

  onSubmit() {
    if (this.formCreate.valid) {
      let data: User = this.formCreate.value;
      console.log('user')
      this.dialogRef.close({ data });
    }
  }

  close(): void {
    this.dialogRef.close();
    console.log('user2')

  }
  error(err) {
    this.snackbarService.error(err);
  }
}
