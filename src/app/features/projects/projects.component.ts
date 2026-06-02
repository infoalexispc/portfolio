import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { ProjectsFacade } from './facade/projects.facade';

@Component({
  selector: 'app-projects',
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatChipsModule,
    ProjectCardComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  readonly facade = inject(ProjectsFacade);

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.facade.loadProjects();
  }
}