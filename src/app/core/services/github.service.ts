import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubRepo, GithubUser } from '../models/github.model';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.github.com';
  private readonly username = 'infoalexispc';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/vnd.github+json'
    });
  }

  getUserRepositories(): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=100`,
      { headers: this.getHeaders() }
    );
  }

  getUserProfile(): Observable<GithubUser> {
    return this.http.get<GithubUser>(
      `${this.baseUrl}/users/${this.username}`,
      { headers: this.getHeaders() }
    );
  }
}