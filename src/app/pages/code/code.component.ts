import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CodeService } from 'src/app/core/services/code.service';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent {
  codeForm = new FormGroup({
    code: new FormControl('')
  });

  constructor(private codeService: CodeService, private router: Router) {}

  // This function sets the code in the code service and navigates to the budget page
  setCode() {
    if (this.codeForm.valid && this.codeForm.controls.code.value) {
      this.codeService.setCode(this.codeForm.controls.code.value);
      this.router.navigate(['budget']);
    }
  }
}
