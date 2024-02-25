import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { config } from '../../../environments/config';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private apiUrl = config.apiUrl() + 'code';

  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {}

  private codeSource = signal<string>(this.cookieService.get('code') || '');
  code = computed(() => this.codeSource());

  setCode(code: string) {
    this.http.get(`${this.apiUrl}/getCode/${code}`).subscribe(
      response => {
        this.cookieService.set('code', code);
        this.codeSource.set(code);
        this.router.navigate(['budget']);
      },
      error => {
        console.error('Invalid code');
      }
    );
  }

  unsetCode() {
    this.cookieService.delete('code');
    this.codeSource.set('');
    this.router.navigate(['']);
  }
}
