import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Params, Router } from '@angular/router';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [MatDialogModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {

  fileName: String = "";
  profile: Profile | undefined;

  /**
   *
   */
  constructor(private _router: Router, private _profileSrv: ProfileServiceService) {


  }
  onFileSelected(event: any) {

    const file: File = event?.target?.files[0];
    console.log("File Selected", file)
    if (file) {

      this.fileName = file.name;

      // const formData = new FormData();

      // formData.append("thumbnail", file);


      let fileReader = new FileReader();
      fileReader.onload = async (e) => {
        console.log("FILE:", fileReader.result);
        if (fileReader.result) {
          const o = JSON.parse(fileReader.result as string);
          this.profile = this._profileSrv.getProfileFromJson(o);


        }
      }
      fileReader.readAsText(file);

      //const upload$ = this.http.post("/api/thumbnail-upload", formData);

      //upload$.subscribe();
    }
  }

  async onSave() {
    if (this.profile) {
      const id = await this._profileSrv.insertProfile(this.profile);

      const queryParams: Params = { id };

      const urlTree = this._router.createUrlTree(["profiles/edit"], {
        queryParams: queryParams,
        queryParamsHandling: "merge",
        preserveFragment: true
      });

      this._router.navigateByUrl(urlTree);
    }
  }
}
