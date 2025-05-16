export enum LoginState {
    User = "USER",
    Mod = "MODERATOR",
    None = "NONE",
    Loading = "LOADING"
}

class Status {
    loginState: LoginState = $state(LoginState.None)
    
    logIn(email: String, password: String) {
        if (email == "priyal@ucdavis.edu" && password == "priyalisthebest") {
            this.loginState = LoginState.Mod;
        } else if (email == "ann@ucdavis.edu" && password == "annisthebest") {
            this.loginState = LoginState.Mod;
        } else {
            this.loginState = LoginState.User;
        }
    }

    loggingIn() {
        this.loginState = LoginState.Loading;
    }
}

export const status = new Status();