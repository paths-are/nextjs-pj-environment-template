import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { auth } from "@/src/hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { addProduct } from "@/src/libs/firestoreProduct";

const SampleAfterLoginContainer = () => {
  const [productName, setProductName] = useState<string>("");

  const onChangeProductName = (e: any) => {
    setProductName(e.target.value);
  };

  const registerProduct = () => {
    addProduct({ productName });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1, marginRight: 8 }}>
          <TextField
            label="製品名"
            variant="outlined"
            placeholder="製品名を入力"
            onChange={onChangeProductName}
            value={productName}
            style={{ width: "100%" }}
          />
        </div>
        <Button onClick={registerProduct} variant="contained">
          製品登録
        </Button>
      </Box>
    </Container>
  );
};
export default SampleAfterLoginContainer;
