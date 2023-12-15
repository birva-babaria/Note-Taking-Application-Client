import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared/user.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const service = inject(UserService);
  if(localStorage.getItem('token')!=null){
    const roles = route.data['permittedRoles'] as Array<string>;
    if(roles){
      if(service.roleMatch(roles)){
        return true;
      }
      else{
        router.navigate(['/forbidden']);
        return false;
      }
    }
    return true
  }
  else{
    router.navigate(['/user/login'])
    return false
  }
};
