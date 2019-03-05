import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/map';
import { map,switchMap, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService  implements CanActivate{

  constructor(private auth:AuthService,private userService:UserService,private router:Router) { }
  // canActivate():Observable<boolean>
  // {
  //   return this.auth.user$
  //   .switchMap(user=>this.userService.get(user.uid))
  //    .map(appUser=>appUser.isAdmin); 
  // }
  canActivate(route,state:RouterStateSnapshot) {

    return this.auth.user$.pipe(
      take(1),
      map((user:any) => user && user.admin),
      tap(isAdmin => {
        if (!isAdmin) {
          
// re-route to wherever you want 
          this.router.navigate(['/']); 
        }
      })
    );

  }

}
