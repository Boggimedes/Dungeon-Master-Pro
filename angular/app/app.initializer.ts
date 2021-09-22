import { AuthService } from './shared/auth/auth.service';

export function appInitializer(authService: AuthService) {
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        console.log("refresh");
        authService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}