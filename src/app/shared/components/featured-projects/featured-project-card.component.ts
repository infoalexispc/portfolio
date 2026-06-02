import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { FeaturedProject } from './featured-project.model';

@Component({
  selector: 'app-featured-project-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './featured-project-card.component.html',
  styleUrl: './featured-project-card.component.scss'
})
export class FeaturedProjectCardComponent {
  project = input.required<FeaturedProject>();
}