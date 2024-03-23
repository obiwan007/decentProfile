import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ProfileServiceService } from '../../services/profile-service.service';

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

  /**
   *
   */
  constructor(private _profileSrv: ProfileServiceService) {


  }
  onFileSelected(event: any) {

    const file: File = event?.target?.files[0];
    console.log("File Selected", file)
    if (file) {

      this.fileName = file.name;

      // const formData = new FormData();

      // formData.append("thumbnail", file);


      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        console.log("FILE:", fileReader.result);
        if (fileReader.result) {
          const o = JSON.parse(fileReader.result as string);
          const p = this._profileSrv.getProfileFromJson(o);
          console.log("Profile: ", p)
        }
      }
      fileReader.readAsText(file);

      //const upload$ = this.http.post("/api/thumbnail-upload", formData);

      //upload$.subscribe();
    }
  }
}
