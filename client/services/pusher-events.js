import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
 cluster: "ap2"
});

const electionChannel = pusher.subscribe("election");

export default electionChannel;
