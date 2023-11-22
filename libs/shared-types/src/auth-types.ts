export interface CheckEmailOutput {
    isExist: boolean;
}

export interface CheckUsernamePayload {
    email: string;
}


export interface AuthPayload {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
        email: string;
    }
}

export interface RegisterPayload {
    email: string
    password: string
    name: string | null
    genres: string[]
}

