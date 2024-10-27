import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../routes/auth/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../routes/auth/auth.selector';
import { Subscription } from 'rxjs';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  accessToken: string | null = null; // Store the access token
  private tokenSubscription: Subscription;

  constructor(private authService: AuthService, private store: Store) {
    this.tokenSubscription = this.store.select(selectAccessToken).subscribe(token => {
      this.accessToken = token; // Update access token
    });
  }

  async isLoggedIn(): Promise<boolean> {
    return this.authService.isAuthenticated(); // Adjust according to your AuthService
  }

  logout() {
    try {
      this.authService.logout();
    } catch (error) {
      console.log(error)
    }
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.tokenSubscription) {
      this.tokenSubscription.unsubscribe();
    }
  }
}
