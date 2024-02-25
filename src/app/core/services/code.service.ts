import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { config } from '../../../environments/config';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private apiUrl = config.apiUrl() + 'code/';

  constructor(private router: Router, private http: HttpClient) {}

  private codeSource = signal<string>(localStorage.getItem('code') || '');
  code = computed(() => this.codeSource());

  setCode(code: string) {
    this.http.get(`${this.apiUrl}/getCode/${code}`).subscribe(
      response => {
        localStorage.setItem('code', code);
        this.codeSource.set(code);
        this.router.navigate(['budget']);
      },
      error => {
        console.error('Invalid code');
      }
    );
  }

  unsetCode() {
    localStorage.removeItem('code');
    this.codeSource.set('');
    this.router.navigate(['']);
  }
}
