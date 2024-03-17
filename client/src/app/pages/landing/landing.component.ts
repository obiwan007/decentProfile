import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  router = inject(Router);

  videos = [
    'https://firebasestorage.googleapis.com/v0/b/decentprofile-95df0.appspot.com/o/My%20Movie%201.mp4?alt=media&token=f8cfd1ca-6a22-48ab-aaf7-c4e8f4ae336c',
    'https://firebasestorage.googleapis.com/v0/b/decentprofile-95df0.appspot.com/o/IMG_0145.mp4?alt=media&token=fc5d6ce8-8e62-4bfe-8ef3-be8a89a1ba00'];
  currentVideo: string;

  /**
   *
   */
  constructor() {
    const v = Math.min(this.videos.length - 1, Math.round(Math.random() * (this.videos.length - 1)));
    this.currentVideo = this.videos[v];
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}
