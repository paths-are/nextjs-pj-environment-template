import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { getMessaging } from "firebase/messaging/sw";
import { app } from "@/src/libs/initFirebase";

export const fetchToken = (setTokenFound) => {
  const fcmMessaging = getMessaging(app);

  const VAPID_KEY =
    "BCV_vRBnJ11osR-x85XXcpXCfgPEpsXqTQJWd3xfKa2vZ1jTbywsS5VaqnETzhWh2pPPm3xjgKRLyiXzsepZZhc";
  return getToken(fcmMessaging, {
    vapidKey: VAPID_KEY,
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
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
