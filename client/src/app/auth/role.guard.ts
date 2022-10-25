import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from './auth.service';
import { Role } from './auth.types';

@Injectable({
	providedIn: 'root',
})
export class RoleGuard implements CanActivate {
	constructor(private auth: AuthService) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const roles: Role[] = route.data['roles'];
		return roles.includes(this.auth.user!.role);
	}
}
