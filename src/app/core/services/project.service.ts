import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/shared/models/project.model';
import { config } from 'src/environments/config';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = config.apiUrl() + 'project';

  constructor(private router: Router, private http: HttpClient) {}

  // Get project by project code endpoint
  getProject(projectCode: string) {
    this.http.get<Project>(`${this.apiUrl}/getProject/${projectCode}`).subscribe(
      project => {
        this.setProject(project);
        this.unsetInvalidProjectCode();
      },
      error => {
        this.setInvalidProjectCode();
      }
    );
  }

  private projectSource = signal<Project | undefined>(
    sessionStorage.getItem('project') !== null ? JSON.parse(sessionStorage.getItem('project')!) : undefined
  );
  project = computed(() => this.projectSource());

  setProject(project: Project) {
    sessionStorage.setItem('project', JSON.stringify(project));
    this.projectSource.set(project);
    this.router.navigate(['budget']);
  }

  unsetProject() {
    sessionStorage.removeItem('project');
    this.projectSource.set(undefined);
    this.router.navigate(['']);
  }

  private invalidProjectCodeSource = signal<boolean>(false);
  invalidProjectCode = computed(() => this.invalidProjectCodeSource());

  setInvalidProjectCode() {
    this.invalidProjectCodeSource.set(true);
  }

  unsetInvalidProjectCode() {
    this.invalidProjectCodeSource.set(false);
  }
}
