import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { GithubUser } from 'src/app/shared/models/github-user.model';
import { config } from 'src/environments/config';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.scss'
})
export class DeveloperComponent {
  currentGithubUser: GithubUser | undefined = undefined;

  constructor(private authService: AuthService) {
    effect(() => {
      this.currentGithubUser = this.authService.currentGithubUser();
    });
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

  signOutFromGithub() {
    this.authService.signOutFromGithub();
  }
}
