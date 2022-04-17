import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import * as serviceAccount from "../sercrets/serviceAccountKey.json";

// admin.initializeApp({
//   credential: cert(serviceAccount),
// });

// export GOOGLE_APPLICATION_CREDENTIALS="path/to/key.json"
// export -n GOOGLE_APPLICATION_CREDENTIALS # 削除
// firebase emulators:start
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
// });
admin.initializeApp();
const db = admin.firestore();

/* eslint-disable */
export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    const now = new Date();
    await db
      .collection("user")
      .doc(JSON.stringify(now))
      .set({ test: "data" });

    response.send("Hello world from functions!");
  }
);

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (userRecord: admin.auth.UserRecord) => {
    // userRecord.toJSON に不具合があるため、解消されるまでは下記のコードを実行する
    const {
      email,
      displayName,
      photoURL,
      phoneNumber,
      disabled,
      providerData,
      customClaims,
      passwordSalt,
      passwordHash,
      tokensValidAfterTime,
    } = userRecord;

    await db.collection("user").doc(userRecord.uid).set({
      email,
      displayName,
      photoURL,
      phoneNumber,
      disabled,
      providerData,
      customClaims,
      passwordSalt,
      passwordHash,
      tokensValidAfterTime,
    });

    // userRecord.toJSON に不具合が解消されたら下記のコードで実行する
    //   await db
    //   .collection("user")
    //   .doc(userRecord.uid)
    //   .set(JSON.parse(JSON.stringify(userRecord)));
  });

/* eslint-disable */
