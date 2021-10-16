import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMaintainerRoutingModule } from './user-routing.module';
import { ListUsersComponent } from './list-users/list-users.component';
import { TableMaterialComponent } from './table-material/table-material.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateUserComponent } from './modals/create-user/create-user.component';
import { MatInputModule } from '@angular/material/input';
import { EditUser } from './modals/edit-user/edit-user.component';
import { NoResultsComponent } from './shared-components/no-results.component';
import { ButtonFloatComponent } from './shared-components/button-float.component';

@NgModule({
  declarations: [
    ListUsersComponent,
    TableMaterialComponent,
    CreateUserComponent,
    EditUser,
    NoResultsComponent,
    ButtonFloatComponent
  ],
  imports: [
    CommonModule,
    UserMaintainerRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule

  ],
  providers: [],
})
export class UserModule {}
