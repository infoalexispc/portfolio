import { inject, signal, computed } from '@angular/core';
import { GithubRepo } from '../../../core/models/github.model';
import { GithubService } from '../../../core/services/github.service';

export class ProjectsFacade {
  private readonly githubService = inject(GithubService);

  private readonly _projects = signal<GithubRepo[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _selectedLanguage = signal<string | null>(null);

  readonly projects = this._projects.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly selectedLanguage = this._selectedLanguage.asReadonly();

  readonly filteredProjects = computed(() => {
    const lang = this._selectedLanguage();
    const repos = this._projects();
    if (!lang) return repos;
    return repos.filter(repo => repo.language?.toLowerCase() === lang.toLowerCase());
  });

  readonly projectCount = computed(() => this._projects().length);
  readonly languages = computed(() => {
    const langs = this._projects()
      .map(repo => repo.language)
      .filter((lang): lang is string => lang !== null);
    return [...new Set(langs)].sort();
  });

  loadProjects(): void {
    this._loading.set(true);
    this._error.set(null);

    this.githubService.getUserRepositories().subscribe({
      next: (repos) => {
        this._projects.set(repos);
        this._loading.set(false);
      },
      error: (err) => {
        this._error.set('Failed to load projects. Please try again later.');
        this._loading.set(false);
      }
    });
  }

  selectLanguage(language: string | null): void {
    this._selectedLanguage.set(language);
  }

  clearFilter(): void {
    this._selectedLanguage.set(null);
  }
}

export const projectsFacade = new ProjectsFacade();