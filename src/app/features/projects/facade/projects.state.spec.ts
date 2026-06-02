import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProjectsState, projectsState } from './projects.state';
import { GithubService } from '../../../core/services/github.service';
import { GithubRepo } from '../../../core/models/github.model';

describe('ProjectsState', () => {
  let state: ProjectsState;
  let httpMock: HttpTestingController;

  const mockRepos: GithubRepo[] = [
    {
      id: 1,
      name: 'repo1',
      full_name: 'infoalexispc/repo1',
      description: 'Test repo 1',
      html_url: 'https://github.com/infoalexispc/repo1',
      stargazers_count: 10,
      forks_count: 5,
      language: 'TypeScript',
      topics: ['angular'],
      visibility: 'public',
      updated_at: '2024-01-01'
    },
    {
      id: 2,
      name: 'repo2',
      full_name: 'infoalexispc/repo2',
      description: 'Test repo 2',
      html_url: 'https://github.com/infoalexispc/repo2',
      stargazers_count: 20,
      forks_count: 10,
      language: 'JavaScript',
      topics: [],
      visibility: 'public',
      updated_at: '2024-01-02'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });

    state = TestBed.inject(ProjectsState);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(state).toBeTruthy();
  });

  describe('loadProjects', () => {
    it('should load projects and set loading to false', () => {
      expect(state.loading()).toBe(false);

      state.loadProjects();

      expect(state.loading()).toBe(true);

      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);

      expect(state.loading()).toBe(false);
      expect(state.projects().length).toBe(2);
    });

    it('should set error on failure', () => {
      state.loadProjects();

      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.error(new ProgressEvent('error'), { status: 500, statusText: 'Server Error' });

      expect(state.loading()).toBe(false);
      expect(state.error()).toBe('Failed to load projects. Please try again later.');
    });
  });

  describe('projectCount', () => {
    it('should return correct count', () => {
      state.loadProjects();
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);

      expect(state.projectCount()).toBe(2);
    });
  });

  describe('starredCount', () => {
    it('should return sum of all stars', () => {
      state.loadProjects();
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);

      expect(state.starredCount()).toBe(30);
    });

    it('should return 0 for empty repos', () => {
      state.loadProjects();
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush([]);

      expect(state.starredCount()).toBe(0);
    });
  });

  describe('filterByLanguage', () => {
    beforeEach(() => {
      state.loadProjects();
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);
    });

    it('should return all projects when language is null', () => {
      const filtered = state.filterByLanguage(null);
      expect(filtered.length).toBe(2);
    });

    it('should filter by language case-insensitively', () => {
      const filtered = state.filterByLanguage('typescript');
      expect(filtered.length).toBe(1);
      expect(filtered[0].language).toBe('TypeScript');
    });
  });

  describe('getLanguages', () => {
    it('should return unique sorted languages', () => {
      state.loadProjects();
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);

      const languages = state.getLanguages();
      expect(languages).toEqual(['JavaScript', 'TypeScript']);
    });

    it('should exclude null languages', () => {
      state.loadProjects();
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush([{ ...mockRepos[0], language: null }]);

      const languages = state.getLanguages();
      expect(languages).toEqual(['JavaScript']);
    });
  });
});

describe('projectsState singleton', () => {
  it('should export a singleton instance', () => {
    expect(projectsState).toBeTruthy();
    expect(projectsState).toBeInstanceOf(ProjectsState);
  });
});