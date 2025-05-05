import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/connection";
import { toast } from "react-toastify";
import { createUserWithoutAffectingSession } from "./authentication";
import { CreateOwnerGymData } from "../interfaces/OwnerGym";

const getOwners = async () => {
  const usersRef = collection(db, "users");
  const gymsRef = collection(db, "gyms");
  const customersRef = collection(db, "customers");

  const q = query(usersRef, where("role", "==", "ownergym"));
  const snapshot = await getDocs(q);

  const owners = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const ownerData = doc.data();
      const gymQuery = query(gymsRef, where("ownerId", "==", doc.id));
      const gymSnapshot = await getDocs(gymQuery);

      const gym = gymSnapshot.docs[0]?.data();
      const gymId = gymSnapshot.docs[0]?.id;

      let activeCustomerCount = 0;

      if (gymId) {
        const customerQuery = query(
          customersRef,
          where("gymId", "==", gymId),
          where("active", "==", true)
        );
        const customerSnapshot = await getDocs(customerQuery);
        activeCustomerCount = customerSnapshot.size;
      }

      return {
        id: doc.id,
        ...ownerData,
        gymName: gym?.name || null,
        activeCustomerCount,
      };
    })
  );

  return owners;
};

const createOwner = async (data: CreateOwnerGymData) => {
  try {
    const uid = await createUserWithoutAffectingSession(
      data.email,
      data.password
    );
    await setDoc(doc(db, "users", uid), {
      active: true,
      email: data.email,
      role: "ownergym",
    });
    toast.success("Usuario creado con éxito");
  } catch (error) {
    console.error(error);
    toast.error("Error al crear el usuario");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editOwner = async (id: string, data: any) => {
  try {
    const { gymName, ...ownerData } = data;

    const ownerRef = doc(db, "users", id);
    await updateDoc(ownerRef, ownerData);

    if (gymName) {
      const gymsRef = collection(db, "gyms");
      const gymQuery = query(gymsRef, where("ownerId", "==", id));
      const gymSnapshot = await getDocs(gymQuery);

      if (gymSnapshot.empty) {
        await setDoc(doc(gymsRef), {
          name: gymName,
          ownerId: id,
        });
      } else {
        const gymDocRef = gymSnapshot.docs[0].ref;
        await updateDoc(gymDocRef, {
          name: gymName,
        });
      }
    }

    toast.success("Gimnasio editado con éxito");
  } catch (error) {
    console.error(error);
    toast.error("Error al editar el gimnasio");
  }
};

const deleteOwner = async (userId: string) => {
  try {
    const ownerRef = doc(db, "users", userId);
    await deleteDoc(ownerRef);
    toast.success("Cliente eliminado correctamente");
  } catch (error) {
    console.error(error);
    toast.error("Error al eliminar cliente");
    throw error;
  }
};

export { getOwners, createOwner, editOwner, deleteOwner };
