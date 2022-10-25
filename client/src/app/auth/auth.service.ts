import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, map } from 'rxjs';
import { JWT_KEY } from './auth.constants';
import {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	RegisterResponse,
	User,
} from './auth.types';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _user = new BehaviorSubject<User | null>(null);
	private _token: string;
	public get user$() {
		return this._user.asObservable();
	}

	public get user() {
		return this._user.value;
	}
	public get token() {
		return this._token;
	}

	constructor(private http: HttpClient) {
		const token = localStorage.getItem(JWT_KEY);
		if (token) {
			this._user.next(jwt_decode<User>(token));
			this._token = token;
		}
	}

	login(body: LoginRequest) {
		return this.http
			.post<LoginResponse>('/api/auth/login', body)
			.pipe(map(res => this.setToken(res.token)));
	}

	register(body: RegisterRequest) {
		return this.http
			.post<RegisterResponse>('/api/auth/register', body)
			.pipe(map(res => this.setToken(res.token)));
	}

	logout() {
		localStorage.removeItem(JWT_KEY);
		this._user.next(null);
	}

	private setToken(token: string) {
		localStorage.setItem(JWT_KEY, token);
		this._token = token;
		this._user.next(jwt_decode<User>(token));
	}
}
