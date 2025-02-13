import { User } from "../models/models";
import { authApi } from "./api/authApi";
import { filesApi } from "./api/filesApi";

export interface CommonState {
  errors: string[]
}

export interface AuthState {
  user?: User;
  authToken?: string;
  isLoading: boolean;
}

export interface FilesState {
  userFilesMap: Record<User['id'], string[]>;
  isLoading: boolean;
}

export interface AppState {
  auth: AuthState;
  files: FilesState;
  common: CommonState;
  authApi: ReturnType<typeof authApi.reducer>;
  filesApi: ReturnType<typeof filesApi.reducer>;
}
