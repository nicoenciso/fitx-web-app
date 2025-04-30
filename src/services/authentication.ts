import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseConfig } from "../firebase/connection";

import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const createUserWithoutAffectingSession = async (
  email: string,
  password: string
) => {
  const secondaryApp = initializeApp(firebaseConfig, "Secondary");

  try {
    const secondaryAuth = getAuth(secondaryApp);

    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      email,
      password
    );

    return userCredential.user.uid;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  } finally {
    await getAuth(secondaryApp).signOut();
    await deleteApp(secondaryApp);
  }
};

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

export { createUserWithoutAffectingSession, login, logout };
