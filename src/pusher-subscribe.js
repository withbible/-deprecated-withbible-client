import Pusher from "pusher-js";

// Pusher.logToConsole = true;

const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
  cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  encrypted: true,
});

export default pusher;
