export interface User {
  id: number;
  username: string;
}

export interface UserData {
  user: User;
  authToken: string;
}