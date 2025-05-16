export enum LoginState {
    User = "USER",
    Mod = "MODERATOR",
    None = "NONE",
    Loading = "LOADING"
}

class Status {
    loginState: LoginState = $state(LoginState.None);
    email?: String;
    
    logIn(email: String, password: String) {
        if (email == "priyal@ucdavis.edu" && password == "priyalisthebest") {
            this.loginState = LoginState.Mod;
        } else if (email == "ann@ucdavis.edu" && password == "annisthebest") {
            this.loginState = LoginState.Mod;
        } else {
            this.loginState = LoginState.User;
        }
        this.email = email;
    }

    loggingIn() {
        this.loginState = LoginState.Loading;
    }

    mainpage() {
        if (this.loginState == LoginState.Loading) {
            this.loginState = LoginState.None;
        } else {
            this.loginState = this.loginState;
        }
    }
}

export const status = new Status();