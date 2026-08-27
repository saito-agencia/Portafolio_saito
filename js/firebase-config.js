/* ==========================================================================
   FIREBASE CONFIGURATION — René Saito Galleries
   ==========================================================================
   INSTRUCCIONES: Reemplaza los valores de abajo con los de tu proyecto Firebase.
   Los encuentras en: Firebase Console → ⚙️ Configuración → Tus apps → Config
   ========================================================================== */

const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",
    authDomain: "TU_PROYECTO.firebaseapp.com",
    projectId: "TU_PROYECTO_ID",
    storageBucket: "TU_PROYECTO.firebasestorage.app",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export services for use in other scripts
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
