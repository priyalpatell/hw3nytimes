export enum LoginState {
    User = "USER",
    Mod = "MODERATOR",
    None = "NONE",
    Loading = "LOADING"
}

export enum SidebarState {
    Acc = "ACCOUNT",
    Comment = "COMMENT",
    None = "NONE"
}

class Status {
    loginState: LoginState = $state(LoginState.None);
    email?: String;
    sidebar: SidebarState = $state(SidebarState.None);
    
    logIn(email: String, name: String) {
        if (name == "moderator") {
            this.loginState = LoginState.Mod;
        } else if (name == "user") {
            this.loginState = LoginState.User;
        } else if (name == "admin") {
            this.loginState = LoginState.Mod;
        }
        this.email = email;
    }

    loggingIn() {
        this.loginState = LoginState.Loading;
        window.location.href = "http://localhost:8000/login";
    }

    mainpage() {
        if (this.loginState == LoginState.Loading) {
            this.loginState = LoginState.None;
        } else {
            this.loginState = this.loginState;
        }
    }

    toggleAccount() {
        this.sidebar = SidebarState.Acc;
    };

    closeSidebar() {
        this.sidebar = SidebarState.None;
    }
}

export const status = new Status();