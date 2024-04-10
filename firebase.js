import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import for storage

const firebaseConfig = {
  apiKey: "AIzaSyAFlI95QPvJ5sDmOBNjwqUbp0P-TMqLdpA",
  authDomain: "magic-md.firebaseapp.com",
  projectId: "magic-md",
  storageBucket: "gs://magic-md.appspot.com",
  messagingSenderId: "825554049894",
  appId: "1:825554049894:web:21f9e964b3810ba7c6c6a7",
  measurementId: "G-8WMF9P85FP"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app); // Get storage instance

export { storage, app as default };
