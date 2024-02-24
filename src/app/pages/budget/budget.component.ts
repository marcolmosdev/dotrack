import { Component, effect } from '@angular/core';
import { CodeService } from 'src/app/core/services/code.service';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
  code: string = '';

  constructor(private codeService: CodeService) {
    effect(() => {
      this.code = codeService.code();
    });
  }
}
