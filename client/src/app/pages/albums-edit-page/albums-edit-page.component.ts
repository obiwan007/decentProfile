import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ProfileServiceService} from '../../services/profile-service.service';

import {AlbumEditComponent} from '../../components/album-edit/album-edit.component';
import {Album} from '../../models/album';

@Component({
  selector: 'app-albums-edit-page',
  standalone: true,
  imports: [
    AlbumEditComponent],
  templateUrl: './albums-edit-page.component.html',
  styleUrl: './albums-edit-page.component.css'
})
export class AlbumsEditPageComponent {
  album: Album | undefined = undefined;

  /**
   *
   */
  constructor(private _profileSrv: ProfileServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,) {

    const {id} = activatedRoute.snapshot.queryParams;
    if (!id) {
      this.album = new Album();
    } else {

      this._profileSrv.getAlbumById(id).subscribe(p => {
        this.album = p.data[0];
        // setTimeout(() => this.album = p.data[0], 1000);
      });
    }

  }

}
