import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  constructor(private router: Router) {}

  private codeSource = signal<string>(localStorage.getItem('code') || '');
  code = computed(() => this.codeSource());

  setCode(code: string) {
    localStorage.setItem('code', code);
    this.codeSource.set(code);
  }

  unsetCode() {
    localStorage.removeItem('code');
    this.codeSource.set('');
    this.router.navigate(['']);
  }
}
