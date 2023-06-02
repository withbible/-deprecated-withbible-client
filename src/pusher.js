import Pusher from "pusher-js";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

// Pusher.logToConsole = true;

const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  encrypted: true,
});

const beamsClient = new PusherPushNotifications.Client({
  instanceId: process.env.REACT_APP_PUSHER_BEAMS_INSTANCE_ID,
});

beamsClient
  .start()
  .then(() => beamsClient.addDeviceInterest("quizCreatedCountByPrevMonth"))
  .catch((error) => console.error("Could not add device interest", error));

export { pusher, beamsClient };
