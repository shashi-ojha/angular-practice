import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, switchMap, filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  get isLoggedIn$() {
    return this.loggedInSubject.asObservable();
  }

  get user$() {
    return this.userSubject.asObservable();
  }


  initializeAuthState() {
    const storedAccessToken = this.getAccessToken();

    if (storedAccessToken) {
      this.loggedInSubject.next(true);
      this.fetchUserDetails().subscribe({
        next: (user) => {
          this.userSubject.next(user); // Populate userSubject
        },
        error: () => {
          this.logout();
        },
      });
    }
  }


  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      map((response) => {
        this.storeTokens(response);
        this.userSubject.next(response); // Update userSubject with the user data
        this.loggedInSubject.next(true);
        return response;
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError('Login failed. Please check your credentials.');
      })
    );
  }


  fetchUserDetails() {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return throwError('No access token found');
    }

      return this.http.get<any>(`${this.apiUrl}/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching user details:', error);
          return throwError('Failed to fetch user details');
        })
      );
  }


  fetchCarts() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return throwError('No access token found');
    }

    return this.user$.pipe(
      filter((user) => user !== null), // Wait until user is available
      map((user) => {
        if (!user.id) {
          throw new Error('User ID not found');
        }
        return user.id;
      }),
      switchMap((userId) => {
        return this.http.get<any>(`https://dummyjson.com/users/${userId}/carts`);
      }),
      catchError((error) => {
        console.error('Error fetching carts:', error);
        return throwError('Failed to fetch carts');
      })
    );
  }



  logout() {
    this.removeAccessToken();
    this.cookieService.delete('refreshToken');
    this.loggedInSubject.next(false);
    this.userSubject.next(null);
  }

  private storeTokens(response: any) {
    this.setAccessToken(response.accessToken);
    this.cookieService.set('refreshToken', response.refreshToken);
  }

  private getAccessToken(): string {
    return localStorage.getItem('accessToken') || '';
  }

  private setAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  private removeAccessToken() {
    localStorage.removeItem('accessToken');
  }
}
