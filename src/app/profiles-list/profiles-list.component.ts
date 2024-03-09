import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ProfilesListDataSource } from './profiles-list-datasource';
import { ProfileServiceService } from '../services/profile-service.service';
import { Profile } from '../models/profile';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrl: './profiles-list.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule,]
})
export class ProfilesListComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Profile>;

  dataSource: ProfilesListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title'];

  /**
   *
   */
  constructor(private _profileSrv: ProfileServiceService) {
    console.log("Loading Profile");
    this.dataSource = new ProfilesListDataSource(this._profileSrv);
    // this._profileSrv.getProfileById("1");
  }

  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.loadLessons();
    this.loadLessonsPage();
    this.paginator.page
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

  }

  onRowClicked(row: Profile) {
    console.log('Row clicked: ', row);
  }
  loadLessonsPage() {
    this.dataSource.loadLessons(
      '',
      'asc',
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

}
