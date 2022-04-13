import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { auth } from "@/src/hooks/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
} from "firebase/auth";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

const SampleLoginForm = () => {
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
    const actionCodeSettings = {
      url: "http://localhost:3000/sample-email-login",
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
    <Container maxWidth="xs">
      <Box sx={{ my: 1 }}>
        <Button
          variant="outlined"
          onClick={loginWithGoogle}
          sx={{ width: "100%" }}
        >
          Googleで登録する
        </Button>
      </Box>
      <Box sx={{ my: 1, textAlign: "center" }}>または</Box>
      <Box sx={{ my: 1 }}>
        <TextField
          id="outlined-basic"
          label="メールアドレス"
          variant="standard"
          onChange={onChange}
          sx={{ width: "100%" }}
        />
      </Box>
      <Box sx={{ my: 1 }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="利用規約、プライバシーポリシーに同意する"
          />
        </FormGroup>
      </Box>
      <Box sx={{ my: 1 }}>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={loginWithEMail}
        >
          メールアドレスで登録する
        </Button>
      </Box>
    </Container>
  );
};
export default SampleLoginForm;
