import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, ViewChild, HostListener, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  appName: string = 'PWA App';
  userName: string = '';
  tempUserName: string = '';
  currentRoute: string = '';
  isEditing: boolean = false;
  userNameModalInstance: any;

  @ViewChild('appNameElement') appNameElement!: ElementRef;
  deferredPrompt: any;
  showInstallButton = false;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.loadAppName();
    this.loadUserName();

    // Écoute les changements de route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        this.closeNavbar();
      }
    });

    // Écoute l'événement beforeinstallprompt uniquement côté navigateur
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('beforeinstallprompt', (event: Event) => {
        event.preventDefault();
        this.deferredPrompt = event;
        this.showInstallButton = true;
      });

      window.addEventListener('appinstalled', () => {
        console.log('PWA installed');
        this.showInstallButton = false;
      });
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId) && !this.userName) {
      this.showUserNameModal();
    }
  }

  // === App Name Functions ===
  loadAppName() {
    if (isPlatformBrowser(this.platformId)) {
      const storedAppName = localStorage.getItem('appName');
      if (storedAppName) {
        this.appName = storedAppName;
      }
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  saveAppName(event: any) {
    if (isPlatformBrowser(this.platformId)) {
      const newName = event.target.innerText.trim();
      if (newName) {
        this.appName = newName;
        localStorage.setItem('appName', newName);
      }
      this.isEditing = false;
    }
  }

  // === User Name Functions ===
  loadUserName() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        this.userName = storedUserName;
      }
    }
  }

  showUserNameModal() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const modalElement = document.getElementById('userNameModal');
        if (modalElement) {
          this.userNameModalInstance = new bootstrap.Modal(modalElement, {
            backdrop: 'static',
            keyboard: false,
          });
          this.userNameModalInstance.show();
        }
      }, 500);
    }
  }

  saveUserName() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.tempUserName.trim()) {
      this.userName = this.tempUserName.trim();
      localStorage.setItem('userName', this.userName);

      if (this.userNameModalInstance) {
        this.userNameModalInstance.hide();
      }
    } else {
      alert("Please enter your name!");
    }
  }

  installPWA() {
    if (!isPlatformBrowser(this.platformId) || !this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      this.deferredPrompt = null;
      this.showInstallButton = false;
    });
  }

  closeNavbar() {
    if (!isPlatformBrowser(this.platformId)) return;

    const navbar = document.getElementById('navbarNav');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show');
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbar = document.getElementById('navbarNav');

    if (
      navbar &&
      navbarToggler &&
      !navbar.contains(event.target as Node) &&
      !navbarToggler.contains(event.target as Node)
    ) {
      this.closeNavbar();
    }
  }
}
