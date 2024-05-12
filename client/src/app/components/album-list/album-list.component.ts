import {AfterViewInit, Component, EventEmitter, Inject, Input, Output, ViewChild, inject} from '@angular/core';
import {MatTableModule, MatTable} from '@angular/material/table';
import {MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import {MatSortModule, MatSort} from '@angular/material/sort';
import {FilterData, AlbumsDataSource} from './album-list-datasource';
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
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {UploadFileComponent} from '../upload-file/upload-file.component';
import {MatInputModule} from '@angular/material/input';
import {FavoritesComponent} from '../favorites/favorites.component';
import {Album} from '../../models/album';
import {MatCardImage, MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Params, Router} from '@angular/router';


@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatSelectModule,
    MatIconModule,
    FormsModule,
    MatInputModule,

    MatListModule,
    MatLineModule,
    MatListItem,
    MatIconModule,
    MatListItemIcon,
    MatToolbarModule,
    MatDialogModule,
    JsonPipe,
    AsyncPipe,
    FavoritesComponent,
    MatCardModule,
    MatButtonModule,
    MatCardImage,
    MatMenuModule,
  ]
})
export class AlbumListComponent implements AfterViewInit {



  sort: MatSort = new MatSort();

  @Output()
  onClick: EventEmitter<Album> = new EventEmitter();

  private _filter: FilterData = new FilterData();
  selectedAlbum?: Album;
  filteredEntries: any;
  search: string = '';

  // @Input()
  public set filter(value: FilterData) {
    this._filter = value;

  }
  public get filter(): FilterData {
    return this._filter;
  }

  types: string[] = ["pressure", "flow", "advanced"];

  authors: string[] = ["Decent", "Damian", "Stéphane"];

  beverages: string[] = ["espresso", "filter", "pourover", "tea_portafilter", "cleaning"];

  pageSize = 10;
  dataSource: AlbumsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'type', 'author', 'beverage_type'];

  _router = inject(Router);

  /**
   *
   */
  constructor(private _profileSrv: ProfileServiceService,
    private dialog: MatDialog) {
    console.log("Loading Profile");
    this.dataSource = new AlbumsDataSource(this._profileSrv);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sort?.sort({id: "title", start: "asc", disableClear: false});//active = "title";  
    }, 0);

    this.dataSource.sort = this.sort;
    this.dataSource.loadAlbums();
    this.loadLessonsPage();

    this.sort?.sortChange
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

  }
  compareObjects(o1: any, o2: any) {
    if (o2.value === o1.value) return true;
    return false;
  }
  // onRowClicked(row: Profile) {
  //   this.onClick.emit(row);
  //   this.selectedAlbum = row;
  // }

  searchChanged($event: any) {
    console.log("Search", $event);
    this.search = $event;
    this.filter.search = $event;
    localStorage.setItem("search", $event);
    this.dataSource.setFilter(this._filter);
  }


  openUpload() {
    const dialogRef = this.dialog.open(UploadFileComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  loadLessonsPage() {
    this.dataSource.loadAlbums(
      '',
      'asc',
      0,
      100);
  }

  navigateToAlbum(id: string) {
    const queryParams: Params = {id};

    const urlTree = this._router.createUrlTree(["myalbums/edit"], {
      queryParams: queryParams,
      queryParamsHandling: "merge",
      preserveFragment: true
    });

    this._router.navigateByUrl(urlTree);
  }

}
