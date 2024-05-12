import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {catchError, finalize, map} from 'rxjs/operators';
import {Observable, of as observableOf, merge, BehaviorSubject, of} from 'rxjs';
import {Profile} from '../../models/profile';
import {ProfileServiceService} from '../../services/profile-service.service';
import {Apollo, gql} from 'apollo-angular';
import {inject} from '@angular/core';
import {AlbumsGQL, InputMaybe, OrderByDirection, ProfilesListGQL, ProfilesListQueryVariables, profilesFilter, profilesOrderBy, } from '../../graphql/generated';
import {VariablesInAllowedPositionRule} from 'graphql';
import {PageInfo} from '../../models/dataWithPageinfo';
import {WatchQueryOptions} from '@apollo/client';
import {SharedWatchQueryOptions} from '@apollo/client/core/watchQueryOptions';
import {Album} from '../../models/album';
import {Title} from '@angular/platform-browser';

export class FilterData {
  typesFilter: string[] = [];
  beverageFilter: string[] = [];
  authorFilter: string[] = [];
  defaultFilter: boolean = false;
  publicFilter: boolean = false;
  search: string = '';
}

/**
 * Data source for the ProfilesList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AlbumsDataSource extends DataSource<Album> {

  data: Profile[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private albumsSubject = new BehaviorSubject<Album[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  maxlength: number = 11;
  apollo = inject(Apollo);

  _albumsGQL = inject(AlbumsGQL);
  pageInfo: PageInfo | undefined;
  lastPage: number = 0;
  lastCursor: string | null | undefined;
  lastOrder: [profilesOrderBy] | undefined;
  cursorHist: string[] = [''];
  private _filter: FilterData = new FilterData();
  lastFilter: profilesFilter = {};

  constructor(private _profileSrv: ProfileServiceService) {
    super();


  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Album[]> {
    return this.albumsSubject.asObservable();

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
    return data.map(d => d.node);
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(collectionViewer: CollectionViewer): void {
    this.albumsSubject.complete();
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
    this.loadAlbums();
  }

  loadAlbums(f = '', sortDirection = 'asc', pageIndex = 0, pageSize = this._profileSrv.allProfiles.length) {
    console.log(this.paginator, this.sort);
    this.loadingSubject.next(true);


    const albums: Album[] = [];

    // albums.push({
    //   title: 'Decent',
    //   author: 'Decent',
    //   notes: 'Default profiles provided from Decent',
    //   __typename: 'Album',
    //   image: 'assets/images/anastasiia-chepinska-lcfH0p6emhw-unsplash.jpg',
    //   id: '1',
    // });
    // albums.push({
    //   title: 'Meine Favoriten',
    //   author: 'Markus',
    //   notes: 'Default profiles provided from Decent',
    //   __typename: 'Album',
    //   id: '1',
    //   image: 'assets/images/fahmi-fakhrudin-nzyzAUsbV0M-unsplash.jpg',
    // });
    // albums.push({
    //   title: 'Filter 3.0',
    //   author: 'Someone',
    //   notes: 'A collection of different filter profiles',
    //   __typename: 'Album',
    //   id: '1',
    //   image: 'assets/images/jakub-dziubak-XtUd5SiX464-unsplash.jpg',
    // });
    // albums.push({
    //   title: 'Favorites 1000',
    //   author: 'Professional Barrista',
    //   notes: 'My most liked profiles',
    //   __typename: 'Album',
    //   id: '1',
    //   image: 'assets/images/jeremy-yap-jn-HaGWe4yw-unsplash.jpg',
    // });
    // albums.push({
    //   title: 'Decent',
    //   author: 'Decent',
    //   notes: 'Default profiles provided from Decent',
    //   __typename: 'Album',
    //   id: '1',
    //   image: 'assets/images/jeremy-yap-jn-HaGWe4yw-unsplash.jpg',
    // });
    // albums.push({
    //   title: 'Decent',
    //   author: 'Decent',
    //   notes: 'Default profiles provided from Decent',
    //   __typename: 'Album',
    //   id: '1',
    //   image: 'assets/images/mike-kenneally-TD4DBagg2wE-unsplash.jpg',
    // });
    // albums.push({
    //   title: 'Decent',
    //   author: 'Decent',
    //   notes: 'Default profiles provided from Decent',
    //   __typename: 'Album',
    //   id: '1',
    //   image: 'assets/images/nathan-dumlao-zUNs99PGDg0-unsplash.jpg',
    // });

    // albums.push({
    //   title: 'Decent',
    //   author: 'Decent',
    //   notes: 'Default profiles provided from Decent',
    //   __typename: 'Album',
    //   id: '1',
    //   image: 'assets/images/lucija-ros-5DvnFEsKmBo-unsplash.jpg',
    // });

    // this.albumsSubject.next(albums);


    const s = this._albumsGQL.watch().valueChanges
      .pipe(map(result => this._profileSrv.mapAlbumFromGraphQl(result.data))).subscribe(res => {
        this.pageInfo = res.pageInfo;
        this.maxlength = res.totalCount;
        this.albumsSubject.next(res.data);
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
    // this._profileSrv.getProfilesFromIndex("", "asc",
    //   0, 1000).pipe(
    //     catchError(() => of([])),
    //     finalize(() => this.loadingSubject.next(false))
    //   )
    //   .subscribe(profiles => {
    //     this.albumsSubject.next(profiles);
    //     profiles.forEach(p => this._profileSrv.insertProfile(p));

    //   });
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getSortedData(data: Profile[]): Profile[] {
  //   if (!this.sort || !this.sort.active || this.sort.direction === '') {
  //     return data;
  //   }

  //   return data.sort((a, b) => {
  //     const isAsc = this.sort?.direction === 'asc';
  //     switch (this.sort?.active) {
  //       case 'title': return compare(a.title, b.title, isAsc);
  //       case 'author': return compare(+a.author, +b.author, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
