export interface AuthState {
    user: any; // Your user model
    access_token: string | null; // Add access token to the state
    error: string | null; // Existing error message
}

export const initialAuthState: AuthState = {
    user: null,
    access_token: null, // Initialize as null
    error: null,
};
