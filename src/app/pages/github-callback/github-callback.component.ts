import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { GithubUser } from 'src/app/shared/models/github-user.model';

@Component({
  selector: 'app-github-callback',
  standalone: true,
  imports: [],
  templateUrl: './github-callback.component.html',
  styleUrl: './github-callback.component.scss'
})
export class GithubCallbackComponent {
  code = signal<string>('');
  currentGithubUser: GithubUser | undefined = undefined;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['code']) {
        this.code.set(params['code']);
        this.authService.handleGithubCallback(params['code']);
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
