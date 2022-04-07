import { useEffect, useState } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import {
  User,
  getAuth,
  signOut,
  onAuthStateChanged,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { app } from "@/src/firebase/init";

export const auth = getAuth(app);
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
}
// if (process.env.NEXT_PUBLIC_MODE_AUTH !== "PROD") {
//   if (process.env.NEXT_PUBLIC_MODE === "LOCAL_DEVELOP") {
//     connectAuthEmulator(auth, "http://localhost:9099");
//   }
// }

type UserState = User | null;

const userState = atom<UserState>({
  key: "firebaseUserState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const createAccount = (state: string): Promise<void> => {
  const email = "one.click.creater@gmail.com";
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
