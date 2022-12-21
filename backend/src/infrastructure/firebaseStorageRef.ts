const admin = require("firebase-admin");
const { firebaseStorageService } = require("../../configs/");

const firebaseAdmin = admin.initializeApp({
 credential: admin.credential.cert(firebaseStorageService)
});

export const firebaseStorageRef = firebaseAdmin.storage().bucket(process.env.FIREBASE_STORAGE_URL);

