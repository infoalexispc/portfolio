import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatMenuTrigger,
    MatListModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isMobile = signal(false);

  readonly navItems = computed(() => [
    { label: 'Home', route: '/', icon: 'home' },
    { label: 'Proyectos', route: '/projects', icon: 'folder' },
    { label: 'Sobre Mí', route: '/about', icon: 'person' },
    { label: 'Skills', route: '/skills', icon: 'build' },
    { label: 'Contacto', route: '/contact', icon: 'email' }
  ]);

  constructor() {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.isMobile.set(result.matches);
    });
  }
}