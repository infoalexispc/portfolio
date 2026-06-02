import { GithubRepo, GithubUser } from './github.model';

describe('GithubModel', () => {
  describe('GithubRepo', () => {
    it('should create a repo with all properties', () => {
      const repo: GithubRepo = {
        id: 1,
        name: 'test-repo',
        full_name: 'user/test-repo',
        description: 'A test repository',
        html_url: 'https://github.com/user/test-repo',
        stargazers_count: 100,
        forks_count: 50,
        language: 'TypeScript',
        topics: ['angular', 'test'],
        visibility: 'public',
        updated_at: '2024-01-15'
      };

      expect(repo.id).toBe(1);
      expect(repo.name).toBe('test-repo');
      expect(repo.full_name).toBe('user/test-repo');
      expect(repo.description).toBe('A test repository');
      expect(repo.html_url).toBe('https://github.com/user/test-repo');
      expect(repo.stargazers_count).toBe(100);
      expect(repo.forks_count).toBe(50);
      expect(repo.language).toBe('TypeScript');
      expect(repo.topics).toEqual(['angular', 'test']);
      expect(repo.visibility).toBe('public');
      expect(repo.updated_at).toBe('2024-01-15');
    });

    it('should allow null description', () => {
      const repo: GithubRepo = {
        id: 2,
        name: 'repo-no-desc',
        full_name: 'user/repo-no-desc',
        description: null,
        html_url: 'https://github.com/user/repo-no-desc',
        stargazers_count: 0,
        forks_count: 0,
        language: null,
        topics: [],
        visibility: 'public',
        updated_at: '2024-01-01'
      };

      expect(repo.description).toBeNull();
      expect(repo.language).toBeNull();
    });
  });

  describe('GithubUser', () => {
    it('should create a user with all properties', () => {
      const user: GithubUser = {
        login: 'testuser',
        name: 'Test User',
        bio: 'A test user',
        avatar_url: 'https://avatar.url',
        html_url: 'https://github.com/testuser',
        followers: 150,
        following: 75,
        public_repos: 25
      };

      expect(user.login).toBe('testuser');
      expect(user.name).toBe('Test User');
      expect(user.bio).toBe('A test user');
      expect(user.avatar_url).toBe('https://avatar.url');
      expect(user.html_url).toBe('https://github.com/testuser');
      expect(user.followers).toBe(150);
      expect(user.following).toBe(75);
      expect(user.public_repos).toBe(25);
    });

    it('should allow null name and bio', () => {
      const user: GithubUser = {
        login: 'testuser',
        name: null,
        bio: null,
        avatar_url: 'https://avatar.url',
        html_url: 'https://github.com/testuser',
        followers: 0,
        following: 0,
        public_repos: 0
      };

      expect(user.name).toBeNull();
      expect(user.bio).toBeNull();
    });
  });
});