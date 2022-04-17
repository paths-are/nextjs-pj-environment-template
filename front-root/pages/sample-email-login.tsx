import React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();

  const loginWithEMailLink = () => {
    // Confirm the link is a sign-in with email link.
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      if (!email) return
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          console.log(result)
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          router.push("/sample");

          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  };
  React.useEffect(() => loginWithEMailLink, []);

  return (
    <>
      <Container
        sx={{ height: "100vh", display: "flex", alignItems: "center" }}
      >
        Loginしました。
      </Container>
    </>
  );
};

export default Home;
