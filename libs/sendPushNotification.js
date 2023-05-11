const admin = require("firebase-admin");
const serviceAccount = require("./srevicekey.json");

// initialize the Firebase app with your FCM server key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

/**
 *
 * @param {import("firebase-admin/lib/messaging/messaging-api").Message} message
 */
// function to send a push notification to a specific device
async function sendPushNotification(message) {
  try {
    let result = await admin.messaging().send(message);
    console.log(result);
  } catch (err) {
    throw err;
  }
}
module.exports = sendPushNotification;
