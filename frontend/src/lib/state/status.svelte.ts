export enum LoginState {
  User = "USER",
  Mod = "MODERATOR",
  None = "NONE",
  Loading = "LOADING",
}

export enum SidebarState {
  Acc = "ACCOUNT",
  Comment = "COMMENT",
  None = "NONE",
}

type Listener = () => void;

class Status {
  loginState: LoginState = $state(LoginState.None);
  email: String = "";
  user: String = "";
  sidebar: SidebarState = $state(SidebarState.None);
  comments: { user: String; body: String; display: boolean }[] = $state([]);

  private listeners = new Set<Listener>();

  logIn(email: String, name: String) {
    if (name == "moderator") {
      this.loginState = LoginState.Mod;
    } else if (name == "user") {
      this.loginState = LoginState.User;
    } else if (name == "admin") {
      this.loginState = LoginState.Mod;
    }
    this.email = email;
    this.user = name;
  }

  logOut() {
    this.email = "";
    this.sidebar = SidebarState.None;
    this.loginState = LoginState.None;
    window.location.href = "http://localhost:8000/logout";
  }

  getEmail() {
    return this.email;
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
    this.notify();
    console.log("account sidebar");
  }

  toggleComment() {
    this.sidebar = SidebarState.Comment;
    this.notify();
    console.log("comment sidebar");
  }

  closeSidebar() {
    this.sidebar = SidebarState.None;
  }

  onChange(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  appendComment(comment: String) {
    let comm = [
      {
        user: this.user,
        body: comment,
        display: true,
      },
    ];
    this.comments = comm.concat(this.comments);
  }

  putComments(comments: { user: String; body: String; display: boolean }[]) {
    this.comments = comments;
  }

  private notify() {
    for (const fn of this.listeners) {
      console.log("notify");
      fn();
    }
  }
}

export const status = new Status();
