import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { Profile } from '../../models/profile';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Apollo, gql } from 'apollo-angular';
import { inject } from '@angular/core';
import { InputMaybe, OrderByDirection, ProfilesListGQL, ProfilesListQueryVariables, profilesFilter, profilesOrderBy, } from '../../graphql/generated';
import { VariablesInAllowedPositionRule } from 'graphql';
import { PageInfo } from '../../models/dataWithPageinfo';

export class FilterData {
  typesFilter: string[] = [];
  beverageFilter: string[] = [];
}

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
  maxlength: number = 11;
  apollo = inject(Apollo);

  _profilesGQL = inject(ProfilesListGQL);
  pageInfo: PageInfo | undefined;
  lastPage: number = 0;
  lastCursor: string | null | undefined;
  lastOrder: [profilesOrderBy] | undefined;
  cursorHist: string[] = [''];
  private _filter: FilterData = new FilterData();

  constructor(private _profileSrv: ProfileServiceService) {
    super();


  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Profile[]> {
    return this.profilesSubject.asObservable();

    // const s = this._profilesGQL.watch().valueChanges
    //   .pipe(map(result => this._profileSrv.mapFromGraphQl(result.data)));

    // return s as Observable<any[]>;

    // const s = this._profilesGQL.watch().valueChanges
    //   .pipe(map(result => result.data && result.data.profilesCollection?.edges))
    //   .pipe(map(data => data!.map(d => d.node)));
    // return s as Observable<any[]>;


    // if (this.paginator && this.sort) {
    //   // Combine everything that affects the rendered data into one update
    //   // stream for the data-table to consume.
    //   // const data = await this.getPagedData(this.getSortedData([...this.data]))
    //   return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
    //     .pipe(map(() => {
    //       console.log("Data:", this.data);
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

  setFilter(_filter: FilterData) {
    this._filter = _filter;
    this.cursorHist = [""];
    this.lastCursor = undefined;
    this.lastPage = 0;
    this.loadProfiles();
  }

  loadProfiles(f = '', sortDirection = 'asc', pageIndex = 0, pageSize = this._profileSrv.allProfiles.length) {
    console.log(this.paginator, this.sort);
    this.loadingSubject.next(true);
    let cursor = this.lastCursor;
    let goForward = false;
    if ((this.paginator?.pageIndex ?? 0) > this.lastPage) {
      cursor = this.pageInfo?.endCursor;
      goForward = true;

    } else if ((this.paginator?.pageIndex ?? 0) < this.lastPage) {
      cursor = this.cursorHist.pop();
      cursor = this.cursorHist.pop();
      if (cursor === '') cursor = undefined;
    }

    this.lastPage = (this.paginator?.pageIndex ?? 0);
    this.lastCursor = cursor;

    let order: [profilesOrderBy] | undefined;
    if (this.sort?.active) {
      const s: profilesOrderBy = {};
      const sortBy: string = this.sort?.active;
      (s as any)[sortBy] = this.sort?.direction === 'asc' ? OrderByDirection.AscNullsLast : OrderByDirection.DescNullsLast;
      order = [s];

      if (JSON.stringify(order) != JSON.stringify(this.lastOrder)) {
        this.lastOrder = order;
        this.lastCursor = undefined;
        cursor = undefined;
        this.paginator!.pageIndex = 0;
      }
    }

    const orCollection: InputMaybe<profilesFilter[]> = [];
    this._filter.typesFilter.forEach(t => {
      orCollection.push({ type: { eq: t }, });
    })
    this._filter.beverageFilter.forEach(t => {
      orCollection.push({ beverage_type: { eq: t }, });
    })
    const filter: profilesFilter = {
      or: [
        ...orCollection,
      ]
    }


    const vars: ProfilesListQueryVariables = {
      first: this.paginator?.pageSize,
      cursor,
      order,
      filter,
    };
    const s = this._profilesGQL.watch(vars).valueChanges
      .pipe(map(result => this._profileSrv.mapFromGraphQl(result.data))).subscribe(res => {
        this.pageInfo = res.pageInfo;
        this.maxlength = res.totalCount;
        if (goForward) {
          this.cursorHist.push(this.pageInfo?.startCursor!);
        }
        this.profilesSubject.next(res.data);
      });





    // this._profileSrv.getProfilesFromIndex(filter, sortDirection,
    //   pageIndex, pageSize).pipe(
    //     catchError(() => of([])),
    //     finalize(() => this.loadingSubject.next(false))
    //   )
    //   .subscribe(profiles => {
    //     this.profilesSubject.next(profiles);
    //     // profiles.forEach(p => this._profileSrv.insertProfile(p));

    //   });
  }

  public insertDefaultProfiles() {
    this._profileSrv.getProfilesFromIndex("", "asc",
      0, 1000).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(profiles => {
        this.profilesSubject.next(profiles);
        profiles.forEach(p => this._profileSrv.insertProfile(p));

      });
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
