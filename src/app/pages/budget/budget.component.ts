import { Component, effect } from '@angular/core';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project.model';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent {
  project: Project | undefined;

  constructor(private projectService: ProjectService) {
    effect(() => {
      this.project = projectService.project();
    });
  }

  unsetProject() {
    this.projectService.unsetProject();
  }
}
