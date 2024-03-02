import { Component, effect } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProjectService } from 'src/app/core/services/project.service';
import { GithubUser } from 'src/app/shared/models/github-user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { config } from 'src/environments/config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  codeForm = new FormGroup({
    code: new FormControl('')
  });
  incorrectCode: boolean = false;
  currentGithubUser: GithubUser | undefined = undefined;

  constructor(private projectService: ProjectService, private authService: AuthService) {
    effect(() => {
      this.listenProjectCodeValidity();
      this.currentGithubUser = this.authService.currentGithubUser();
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

  signOutFromGithub() {
    this.authService.signOutFromGithub();
  }

  // This function returns the github oauth url
  getGithubOAuthURL() {
    return (
      'https://github.com/login/oauth/authorize?client_id=' +
      config.github.clientId +
      '&redirect_uri=' +
      config.github.redirectURL +
      '&scope=user'
    );
  }
}
