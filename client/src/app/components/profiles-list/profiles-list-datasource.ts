import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { Profile } from '../../models/profile';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Apollo, gql } from 'apollo-angular';
import { inject } from '@angular/core';
import { ProfilesGQL, ProfilesQuery } from '../../graphql/generated';

/**
 * Data source for the ProfilesList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProfilesListDataSource extends DataSource<Profile> {
  data: Profile[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private profilesSubject = new BehaviorSubject<Profile[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  maxlength: number = 0;
  apollo = inject(Apollo);

  profilesGQL = inject(ProfilesGQL);

  constructor(private _profileSrv: ProfileServiceService) {
    super();

    this.maxlength = _profileSrv.getProfilesCount();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Profile[]> {

    const s = this.profilesGQL.watch().valueChanges
      .pipe(map(result => result.data && result.data.profilesCollection?.edges))
      .pipe(map(data => data!.map(d => d.node)));
    return s as Observable<any[]>;
    // if (this.paginator && this.sort) {
    //   // Combine everything that affects the rendered data into one update
    //   // stream for the data-table to consume.
    //   // const data = await this.getPagedData(this.getSortedData([...this.data]))
    //   return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
    //     .pipe(map(() => {
    //       return this.data;
    //     }));
    // } else {
    //   throw Error('Please set the paginator and sort on the data source before connecting.');
    // }
  }

  mapId(data: any[]) {
    console.log("Map", data, data.map(d => d.node));
    return data.map(d => d.node);
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.profilesSubject.complete();
    this.loadingSubject.complete();
  }



  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private async getPagedData(data: Profile[]): Promise<Profile[]> {
  //   if (this.paginator) {
  //     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //     const profiles = await this._profileSrv.getProfilesFromIndex(startIndex, startIndex + this.paginator.pageSize)
  //     return profiles;
  //   } else {
  //     return data;
  //   }
  // }

  loadProfiles(filter = '',
    sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

    this.loadingSubject.next(true);


    this._profileSrv.getProfilesFromIndex(filter, sortDirection,
      pageIndex, pageSize).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(lessons => this.profilesSubject.next(lessons));
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Profile[]): Profile[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'author': return compare(+a.author, +b.author, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
