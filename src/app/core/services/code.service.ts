import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeService {

  constructor() { }

  private codeSource = signal<string>('');
  code = computed(() => this.codeSource());
}
