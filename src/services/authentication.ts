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

const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error al cerrar sesión", error);
  }
};

export { createUserWithoutAffectingSession, logout };
