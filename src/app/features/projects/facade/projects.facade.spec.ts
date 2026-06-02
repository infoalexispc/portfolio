import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProjectsFacade } from './projects.facade';
import { GithubService } from '../../../core/services/github.service';
import { GithubRepo } from '../../../core/models/github.model';

describe('ProjectsFacade', () => {
  let facade: ProjectsFacade;
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
    },
    {
      id: 3,
      name: 'repo3',
      full_name: 'infoalexispc/repo3',
      description: null,
      html_url: 'https://github.com/infoalexispc/repo3',
      stargazers_count: 5,
      forks_count: 2,
      language: 'TypeScript',
      topics: ['node'],
      visibility: 'public',
      updated_at: '2024-01-03'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService, ProjectsFacade]
    });

    facade = TestBed.inject(ProjectsFacade);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('loadProjects', () => {
    it('should load projects successfully', () => {
      let projects: GithubRepo[] = [];

      facade.loadProjects();

      expect(facade.loading()).toBe(true);

      facade.projects.subscribe(p => projects = p);

      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);

      expect(facade.loading()).toBe(false);
      expect(facade.projects().length).toBe(3);
    });

    it('should set error on failure', () => {
      facade.loadProjects();

      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.error(new ProgressEvent('error'), { status: 500, statusText: 'Server Error' });

      expect(facade.loading()).toBe(false);
      expect(facade.error()).toBe('Failed to load projects. Please try again later.');
    });
  });

  describe('filteredProjects', () => {
    beforeEach(() => {
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);
    });

    it('should return all projects when no language selected', () => {
      expect(facade.filteredProjects().length).toBe(3);
    });

    it('should filter projects by language', () => {
      facade.selectLanguage('TypeScript');

      const filtered = facade.filteredProjects();
      expect(filtered.length).toBe(2);
      expect(filtered.every(p => p.language === 'TypeScript')).toBe(true);
    });

    it('should be case insensitive when filtering', () => {
      facade.selectLanguage('typescript');

      const filtered = facade.filteredProjects();
      expect(filtered.length).toBe(2);
    });

    it('should return empty array when no matches', () => {
      facade.selectLanguage('Python');

      const filtered = facade.filteredProjects();
      expect(filtered.length).toBe(0);
    });
  });

  describe('selectLanguage', () => {
    beforeEach(() => {
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);
    });

    it('should set selected language', () => {
      expect(facade.selectedLanguage()).toBeNull();

      facade.selectLanguage('TypeScript');

      expect(facade.selectedLanguage()).toBe('TypeScript');
    });
  });

  describe('clearFilter', () => {
    beforeEach(() => {
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);
    });

    it('should clear language filter', () => {
      facade.selectLanguage('TypeScript');
      expect(facade.selectedLanguage()).toBe('TypeScript');

      facade.clearFilter();

      expect(facade.selectedLanguage()).toBeNull();
    });
  });

  describe('projectCount', () => {
    it('should return correct count', () => {
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);

      expect(facade.projectCount()).toBe(3);
    });
  });

  describe('languages', () => {
    it('should return unique sorted languages', () => {
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(mockRepos);

      const languages = facade.languages();
      expect(languages).toEqual(['JavaScript', 'TypeScript']);
    });

    it('should handle repos with null language', () => {
      const reposWithNull: GithubRepo[] = [
        { ...mockRepos[0], language: null }
      ];
      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100');
      req.flush(reposWithNull);

      const languages = facade.languages();
      expect(languages).toEqual([]);
    });
  });
});