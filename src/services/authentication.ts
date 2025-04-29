import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/connection";

const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return "Error inesperado.";
  }
};

const logout = async () => {
  try {
    await auth.signOut();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error.message;
    }
    return "Error inesperado.";
  }
};

export { login, logout };
