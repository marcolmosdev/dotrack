import { Component, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent {
  codeForm = new FormGroup({
    code: new FormControl('')
  });
  incorrectCode: boolean = false;

  constructor(private projectService: ProjectService) {
    effect(() => {
      this.listenProjectCodeValidity();
    });
  }

  // This function listens for the project code validity
  listenProjectCodeValidity() {
    this.incorrectCode = this.projectService.invalidProjectCode();
    this.incorrectCode && this.codeForm.get('code')?.setValue('');
  }

  // This function unset the project code invalid flag
  unsetInvalidCodeProject() {
    this.projectService.unsetInvalidProjectCode();
  }

  // This function tries to get the project from the server
  getProject() {
    if (this.codeForm.valid && this.codeForm.controls.code.value) {
      this.projectService.getProject(this.codeForm.controls.code.value);
    }
  }
}
