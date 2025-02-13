import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/authSlice";
import { FilesPage } from "../pages/FilesPage";
import { LoginPage } from "../pages/LoginPage";

export function AuthGuard() {
  const user = useSelector(selectUser)

  if (user) {
    return <FilesPage />
  }

  return <LoginPage />
}
