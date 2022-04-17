import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { auth } from "@/src/hooks/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
} from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");

  const onChange = (e: any) => {
    setEmail(e.target.value);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const loginWithEMail = () => {
    alert()
    const actionCodeSettings = {
      url: "http://localhost:3000/sample",
      handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then((res) => {
        console.log(res);
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        // ...
      });
  };

  return (
    <Stack>
      <Button variant="outlined" onClick={loginWithGoogle}>
        Googleで登録する
      </Button>
      <br />
      <p style={{ textAlign: "center" }}>または</p>
      <TextField
        id="outlined-basic"
        label="メールアドレス"
        variant="outlined"
        // onChange={onChange}
      />
      <br />
      <Button variant="outlined" disabled onClick={loginWithEMail}>
        メールアドレスで登録する
      </Button>
    </Stack>
  );
};
export default LoginForm;
