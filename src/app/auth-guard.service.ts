import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import 'rxjs/add/operator/map';
import { map, take, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:AuthService,private router:Router) { }

  canActivate(route,state:RouterStateSnapshot){
    console.log('Auth guard')

    // return this.auth.user$.map(user=>{
    //   if(user)return true;
    //   this.router.navigate(['/login']);
    //   return false;
    // });
    return this.auth.user$.pipe(
    take(1),
      map((authState) => !!authState),
      tap(authenticated => {
        if (!authenticated) this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}})
      })
    )
  }
}
