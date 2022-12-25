const Pusher = require("pusher");

const pusherInstance = new Pusher({
 appId: process.env.PUSHER_APP_ID,
 key: process.env.PUSHER_KEY,
 secret: process.env.PUSHER_SECRET,
 cluster: "ap2",
 useTLS: true
});

module.exports = pusherInstance;