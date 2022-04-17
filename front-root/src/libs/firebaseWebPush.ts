import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "@/src/libs/initFirebase";

export const fetchToken = (setTokenFound: (token: string | null) => VoidFunction) => {
  const fcmMessaging = getMessaging(app);

  return getToken(fcmMessaging, {
    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(currentToken);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(null);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () => {
  const fcmMessaging = getMessaging(app);

  return new Promise((resolve) => {
    onMessage(fcmMessaging, (payload) => {
      resolve(payload);
    });
  });
};
