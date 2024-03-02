import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'src/environments/config';
import { GithubUser } from 'src/app/shared/models/github-user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = config.apiUrl() + 'auth';

  constructor(private http: HttpClient, private router: Router) {}

  private currentGithubUserSource = signal<GithubUser | undefined>(
    sessionStorage.getItem('currentGithubUser') !== null
      ? JSON.parse(sessionStorage.getItem('currentGithubUser')!)
      : undefined
  );
  currentGithubUser = computed(() => this.currentGithubUserSource());

  handleGithubCallback(code: string) {
    this.http
      .get<GithubUser>(`${this.apiUrl}/handleGithubCallback`, {
        params: { code }
      })
      .subscribe(res => {
        this.setCurrentGithubUser(res);
        this.router.navigate(['/developer']);
      });
  }

  setCurrentGithubUser(githubUser: GithubUser) {
    sessionStorage.setItem('currentGithubUser', JSON.stringify(githubUser));
    this.currentGithubUserSource.set(githubUser);
  }

  getCurrentUser(): void {
    this.http.get<GithubUser>(`${this.apiUrl}/getCurrentUser`).subscribe(res => {
      this.setCurrentGithubUser(res);
    });
  }

  signOutFromGithub(): void {
    this.http.get(`${this.apiUrl}/signOutFromGithub`).subscribe(() => {
      this.unsetCurrentGithubUser();
      this.router.navigate(['']);
    });
  }

  unsetCurrentGithubUser() {
    sessionStorage.removeItem('currentGithubUser');
    this.currentGithubUserSource.set(undefined);
  }
}
