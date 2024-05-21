import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const noauthGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)
  let myuser = localStorage.getItem('currentUser');
  if(myuser){
    let user = JSON.parse(myuser)
   router.navigateByUrl(`/home-dash/${user.id}`)
    return false;
  }
  else{
    return true;
  }

};
