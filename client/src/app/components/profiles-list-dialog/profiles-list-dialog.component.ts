import {AfterViewInit, Component, EventEmitter, Inject, Input, Output, ViewChild} from '@angular/core';
import {MatTableModule, MatTable} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {ProfileServiceService} from '../../services/profile-service.service';
import {Profile} from '../../models/profile';
import {tap} from 'rxjs/operators';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {AsyncPipe, CommonModule, JsonPipe} from '@angular/common';
import {MatListItem, MatListItemIcon, MatListModule} from '@angular/material/list';
import {MatLineModule} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {UploadFileComponent} from '../upload-file/upload-file.component';
import {MatInputModule} from '@angular/material/input';
import {FavoritesComponent} from '../favorites/favorites.component';
import {ProfilesListComponent} from '../profiles-list/profiles-list.component';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-profiles-list-dialog',
  templateUrl: './profiles-list-dialog.component.html',
  styleUrl: './profiles-list-dialog.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatSelectModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatListModule,
    MatLineModule,
    MatListItem,
    MatIconModule,
    MatListItemIcon,
    MatToolbarModule,
    MatButtonModule,
    JsonPipe,
    AsyncPipe,
    FavoritesComponent,
    ProfilesListComponent,
  ]
})
export class ProfilesListDialogComponent {




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sort: MatSort = new MatSort();
  @ViewChild(MatTable) table!: MatTable<Profile>;

  @Output()
  onClick: EventEmitter<Profile> = new EventEmitter();


  @Input()
  noFilteringPanel = false;

  @Input()
  profiles: Profile[] | undefined;


  selectedProfile: Profile | undefined;

  constructor(
    private _dialogRef: MatDialogRef<ProfilesListDialogComponent>,
  ) {
  }

  onClose() {
    this._dialogRef.close();
  }

}
