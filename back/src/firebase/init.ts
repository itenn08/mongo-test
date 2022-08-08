import admin from "firebase-admin";

import * as serviceAccount from "src/firebase/serviceAccountKey.json";

export const appFirebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  storageBucket: "gs://dashboard-storage-b846f.appspot.com/",
});

export const storage = admin.storage().bucket();
