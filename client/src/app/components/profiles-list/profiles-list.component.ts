import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { FilterData, ProfilesListDataSource } from './profiles-list-datasource';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Profile } from '../../models/profile';
import { tap } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrl: './profiles-list.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatSelectModule,
    MatIconModule
  ]
})
export class ProfilesListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Profile>;

  @Output()
  onClick: EventEmitter<Profile> = new EventEmitter();

  private _filter: FilterData = new FilterData();
  @Input()
  public set filter(value: FilterData) {
    this._filter = value;

  }
  public get filter(): FilterData {
    return this._filter;
  }

  types: string[] = ["pressure", "flow", "advanced"];

  authors: string[] = ["Decent", "Damian", "Stéphane"];

  beverages: string[] = ["espresso", "filter", "pour-over", "tea_portafilter", "cleaning"];

  pageSize = 10;
  dataSource: ProfilesListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'type', 'author', 'beverage_type'];

  /**
   *
   */
  constructor(private _profileSrv: ProfileServiceService) {
    console.log("Loading Profile");
    this.dataSource = new ProfilesListDataSource(this._profileSrv);
    // this.dataSource.insertDefaultProfiles();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sort.sort({ id: "title", start: "asc", disableClear: false });//active = "title";  
    }, 0);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.loadProfiles();
    this.loadLessonsPage();
    this.paginator.page
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

    this.sort.sortChange
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

  }

  onRowClicked(row: Profile) {
    this.onClick.emit(row);
  }

  loadLessonsPage() {
    this.dataSource.loadProfiles(
      '',
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
  filterForType($event: MatSelectChange) {
    this.filter.typesFilter = [...$event.value];
    this.dataSource.setFilter(this._filter);
  }
  filterForBeverage($event: MatSelectChange) {
    this.filter.beverageFilter = [...$event.value];
    this.dataSource.setFilter(this._filter);
  }
  filterForAuthor($event: MatSelectChange) {
    this.filter.authorFilter = [...$event.value];
    this.dataSource.setFilter(this._filter);
  }
}
