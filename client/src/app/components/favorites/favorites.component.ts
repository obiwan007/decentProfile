import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { FavoritesService } from '../../services/favorites.service';
import { Observable, Subscription } from 'rxjs';
import { Favorite } from '../../models/favorite';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RenderStepComponent } from '../render-step/render-step.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatLabel,
    MatButtonModule, MatIconModule,
    CommonModule,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnDestroy {
  favorites: Favorite[] = [];
  favorites$: Observable<Favorite[]>;
  subs: Subscription[] = [];

  constructor(private _favoritesSrv: FavoritesService) {
    this.favorites$ = _favoritesSrv.favorites();
    this.subs.push(this.favorites$.subscribe(f => {
      console.log("Favlist:", f);
      this.favorites = f
    }));
  }
  ngOnDestroy() { this.subs.forEach(s => s.unsubscribe()); }

  selectFavorite($event: MatSelectChange) {
    throw new Error('Method not implemented.');
  }

}
