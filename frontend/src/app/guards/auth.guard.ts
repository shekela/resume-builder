import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token); // Decode the token
        if (decodedToken?.Role === 'Admin') {
          return true; // Allow access if the role is 'Admin'
        } else {
          this.router.navigate(['/admin/login']); // Redirect if not an admin
          return false;
        }
      } catch (error) {
        console.error('Invalid token:', error);
        this.router.navigate(['/admin/login']); // Redirect if token is invalid
        return false;
      }
    } else {
      this.router.navigate(['/admin/login']); // Redirect if no token found
      return false;
    }
  }
  
}

