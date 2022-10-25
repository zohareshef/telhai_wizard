export type LoginRequest = {
	email: string;
	password: string;
};

export type LoginResponse = {
	token: string;
};

export type RegisterRequest = {
	email: string;
	firstname: string;
	lastname: string;
	password: string;
};

export type RegisterResponse = LoginResponse;

export type User = {
	_id: string;
	email: string;
	role: Role;
	firstname: string;
	lastname: string;
};

export type Role = 'user' | 'creator' | 'admin';
