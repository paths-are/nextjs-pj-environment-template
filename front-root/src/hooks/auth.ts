import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  User,
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  // connectAuthEmulator,
} from "firebase/auth";

import { app } from "@/src/utils/initFirebase";

export const auth = getAuth(app);
// if (process.env.NODE_ENV === "development") {
//   connectAuthEmulator(auth, "http://localhost:9099");
// }

type UserState = User | null;

const userState = atom<UserState>({
  key: "firebaseUserState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const createAccount = (state: string): Promise<void> => {
  const email = "abc@gmail.com";
  const pass = "password";

  return createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert(`string is -> ${state}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const logout = (): Promise<void> => {
  return signOut(auth);
};

export const useAuth = (): boolean => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, [setUser]);

  return isLoading;
};

export const useUser = (): UserState => {
  return useRecoilValue(userState);
};
