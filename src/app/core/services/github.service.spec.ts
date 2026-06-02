import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { GithubRepo, GithubUser } from '../models/github.model';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  const mockUser: GithubUser = {
    login: 'infoalexispc',
    name: 'Alexis Rodriguez',
    bio: 'Full Stack Developer',
    avatar_url: 'https://avatar.url',
    html_url: 'https://github.com/infoalexispc',
    followers: 100,
    following: 50,
    public_repos: 20
  };

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
      topics: ['angular', 'typescript'],
      visibility: 'public',
      updated_at: '2024-01-01'
    },
    {
      id: 2,
      name: 'repo2',
      full_name: 'infoalexispc/repo2',
      description: null,
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

    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUserProfile', () => {
    it('should return user profile data', () => {
      service.getUserProfile().subscribe({
        next: (user) => {
          expect(user).toEqual(mockUser);
        }
      });

      const req = httpMock.expectOne('https://api.github.com/users/infoalexispc');
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept')).toBe('application/vnd.github+json');
      req.flush(mockUser);
    });
  });

  describe('getUserRepositories', () => {
    it('should return user repositories', () => {
      service.getUserRepositories().subscribe({
        next: (repos) => {
          expect(repos).toEqual(mockRepos);
          expect(repos.length).toBe(2);
        }
      });

      const req = httpMock.expectOne(
        'https://api.github.com/users/infoalexispc/repos?sort=updated&per_page=100'
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Accept')).toBe('application/vnd.github+json');
      req.flush(mockRepos);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});