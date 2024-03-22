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
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { MatListItem, MatListItemIcon, MatListModule } from '@angular/material/list';
import { MatLineModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrl: './profiles-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatSelectModule,
    MatIconModule,
    FormsModule,

    MatListModule,
    MatLineModule,
    MatListItem,
    MatIconModule,
    MatListItemIcon,
    JsonPipe,
    AsyncPipe,
  ]
})
export class ProfilesListComponent implements AfterViewInit {



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Profile>;

  @Output()
  onClick: EventEmitter<Profile> = new EventEmitter();

  private _filter: FilterData = new FilterData();
  selectedProfile?: Profile;
  selected: any;

  @Input()
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
  dataSource: ProfilesListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['title', 'type', 'author', 'beverage_type'];

  /**
   *
   */
  constructor(private _profileSrv: ProfileServiceService) {
    console.log("Loading Profile");
    this.dataSource = new ProfilesListDataSource(this._profileSrv);

    const f = localStorage.getItem("filter");
    if (f) {
      this.selected = JSON.parse(f);
      this.filterForBeverage({ source: this as any, value: this.selected });
    } else {
      this.selected = [{
        value: 'default', groupValue: 'default',
      },
      {
        value: 'public', groupValue: 'default',
      }
      ];
    }
    // this.dataSource.insertDefaultProfiles();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sort?.sort({ id: "title", start: "asc", disableClear: false });//active = "title";  
    }, 0);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.table)
      this.table.dataSource = this.dataSource;
    this.dataSource.loadProfiles();
    this.loadLessonsPage();
    this.paginator.page
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

    this.sort?.sortChange
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

  }
  compareObjects(o1: any, o2: any) {

    console.log("Compare", o1, o2)
    if (o2.value === o1.value) return true;
    return false;
  }
  onRowClicked(row: Profile) {
    this.onClick.emit(row);
    this.selectedProfile = row;
  }

  loadLessonsPage() {
    this.dataSource.loadProfiles(
      '',
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  filterForBeverage($event: MatSelectChange) {
    console.log("Filter: ", this.selected)

    this.filter.typesFilter = [...$event.value
      .filter((f: any) => f.groupValue === 'type')
      .map((m: any) => m.value)];
    this.filter.beverageFilter = [...$event.value
      .filter((f: any) => f.groupValue === 'beverage')
      .map((m: any) => m.value)];
    this.filter.authorFilter = [...$event.value
      .filter((f: any) => f.groupValue === 'author')
      .map((m: any) => m.value)];

    this.filter.defaultFilter = $event.value.find((v: any) => v.value === "default") ? true : false;
    this.filter.publicFilter = $event.value.find((v: any) => v.value === "public") ? true : false;
    //this.filter.beverageFilter = [...$event.value];

    console.log(this.filter.publicFilter)
    this.dataSource.setFilter(this._filter);

    localStorage.setItem("filter", JSON.stringify(this.selected));
  }

}
