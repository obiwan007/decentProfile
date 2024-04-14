import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Favorite } from '../models/favorite';
import { DeleteFavGQL, DeleteFavMutationVariables, FavoritesGQL, InsertFavoritesGQL, UpdateFavoritesGQL, favoritesInsertInput, favoritesUpdateInput } from '../graphql/generated';
import { plainToClassFromExist } from 'class-transformer';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private _favorites$: BehaviorSubject<Favorite[]> = new BehaviorSubject<Favorite[]>([]);
  private _favorites: Favorite[] = [];

  constructor(private _queryFavorites: FavoritesGQL,
    private _insertFavorites: InsertFavoritesGQL,
    private _updateFavorites: UpdateFavoritesGQL,
    private _deleteFavorites: DeleteFavGQL,
  ) {
    this.queryFavorites();
  }

  favorites() {
    console.log("Return favorites observable", this._favorites);
    return this._favorites$.asObservable();
  }

  insertFavorite(favorite: Favorite) {
    const v: favoritesInsertInput = {
      group_id: favorite.group_id,
      profile_id: favorite.profile_id,
      isGroup: favorite.isGroup,
      isSeperator: favorite.isSeperator,
      label: favorite.label,
      user_id: favorite.id,
    };
    this._insertFavorites.mutate({ set: [v] }).subscribe(res => {
      const id = res.data?.insertIntofavoritesCollection?.records[0].id;
      console.log("ID:", id);
      favorite.id = id!;
      this._favorites.push(favorite);
      this._favorites$.next(this._favorites);
    });
  }

  updateFavorite(favorite: Favorite) {
    const v: favoritesUpdateInput = {
      group_id: favorite.group_id,
      profile_id: favorite.profile_id,
      isGroup: favorite.isGroup,
      isSeperator: favorite.isSeperator,
      label: favorite.label,
      user_id: favorite.id,
    };
    this._updateFavorites.mutate({ id: favorite.id, set: v }).subscribe(res => {
      const id = res.data?.updatefavoritesCollection?.records[0].id;
      console.log("ID:", id);
      favorite.id = id!;
      this._favorites$.next(this._favorites);
    });
  }

  deleteFavorite(id: string): Promise<string | undefined> {
    return new Promise<string | undefined>(async resolver => {
      const v: DeleteFavMutationVariables = {
        id: id,
      };
      this._deleteFavorites.mutate(v).subscribe(res => {
        const id = res.data?.deleteFromfavoritesCollection?.records[0].id;
        console.log("Deleted Profile ID:", id);
        resolver(id);
        const i = this._favorites.indexOf(this._favorites.find(f => f.id === id)!);
        this._favorites.splice(i, 1);
        this._favorites$.next(this._favorites);
      });
    });

  }

  queryFavorites() {
    this._queryFavorites.fetch().subscribe(res => {
      const edges = res.data?.favoritesCollection?.edges;
      const f = edges?.map(e => plainToClassFromExist(new Favorite(), e.node));
      console.log("Favorites:", f);
      this._favorites = f ?? [];
      this._favorites$.next(this._favorites);
    })
  }
}
