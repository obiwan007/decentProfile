import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { SupabaseService } from './services/supabase.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggleModule, MainNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'decentProfiler';
  session = this.supabase.session
  /**
   *
   */
  constructor(private readonly supabase: SupabaseService) {
    console.log("App Version:", environment.VERSION);

  }
  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session))
  }
}
