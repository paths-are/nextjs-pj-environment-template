import { Button } from "@mui/material";
import { app } from "@/src/utils/initFirebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const InsertFirestoreButton = () => {
  const onClickHandler = async () => {
    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    const now = new Date();

    // Add a new document in collection "cities"
    await setDoc(doc(db, "cities", JSON.stringify(now)), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
      time: now,
    });
  };
  return <Button onClick={onClickHandler}>更新</Button>;
};
export default InsertFirestoreButton;
