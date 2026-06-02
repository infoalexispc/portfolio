import { FeaturedProject } from './featured-project.model';

describe('FeaturedProject', () => {
  it('should create a featured project with all properties', () => {
    const project: FeaturedProject = {
      id: 1,
      title: 'Test Project',
      description: 'A test project description',
      imageUrl: 'https://example.com/image.jpg',
      url: 'https://example.com/project',
      tags: ['Angular', 'TypeScript']
    };

    expect(project.id).toBe(1);
    expect(project.title).toBe('Test Project');
    expect(project.description).toBe('A test project description');
    expect(project.imageUrl).toBe('https://example.com/image.jpg');
    expect(project.url).toBe('https://example.com/project');
    expect(project.tags).toEqual(['Angular', 'TypeScript']);
  });

  it('should allow empty tags array', () => {
    const project: FeaturedProject = {
      id: 1,
      title: 'Test Project',
      description: 'A test project description',
      imageUrl: 'https://example.com/image.jpg',
      url: 'https://example.com/project',
      tags: []
    };

    expect(project.tags).toEqual([]);
  });
});