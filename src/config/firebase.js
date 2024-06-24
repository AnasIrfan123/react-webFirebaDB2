//javscript me CDN link ( https:// )      // react me Npm  (firebase/app)

// ----------------------------------------------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut } from "firebase/auth";

// db link
import { getFirestore, setDoc, doc, collection, addDoc, getDocs, getDoc} from "firebase/firestore";
//storage link image etc
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnACHrJAdYG4yq9UPR4_uyC2CfHg2sWl8",
  authDomain: "reactapp-fef60.firebaseapp.com",
  projectId: "reactapp-fef60",
  storageBucket: "reactapp-fef60.appspot.com",
  messagingSenderId: "965692277447",
  appId: "1:965692277447:web:4d5eda2d4d419d05d5b4e2",
  measurementId: "G-76JZS65E0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// ----------------------- REGISTER ------------------------------------

export async function register (user) {

  const {fullname, email, password, age, phoneNumb} = user
  
 await createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
    // alert('Registered Successfully')

        //db start
    try {
      const docRef = await setDoc(doc(db, "users", userCredential.user.uid), {   
        fullname,  
        uid: userCredential.user.uid,  //ye uid bh bhejni thi user ki detail me 
        email,
        age,
        phoneNumb
      });

      alert('Registered Successfully')

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  //   alert(errorMessage)
  //   console.log(errorMessage, '==center==', error);
  // });

}

// ---------------------- Login ----------------Sign existing users------------------  => (authen/web/Get Started)

export async function login(user) {

  const {email, password} = user

 await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    alert('Logged In Successfully')
  })

}

// -------------------- FORGOT PASS ---------------Send a password reset email----------- => (authen/web/manageUser)

async function forgotPasword(user) {
  
  const {email} = user

 await sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    alert('password reset email has been sent \nCheck your "Email"');

  })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  //   console.log('forg :',errorMessage)
  //   alert(error.message)
  // });
}

export {
  forgotPasword
}

// ------------------ ADPOSTTODB --------------------------------------------- => (storage/web/createReference/uploadFilesDownloadUrl)

async function adPostToDB(ad) {
    /* //image ko dtabase ki storage me bhejhne ka alag tareeqe kar ha wo ye ha
     1. Upload image to Storage
     2. Get the URL of the image
     3. Add all data with URL in database
     */ 

     try {

     // Create a storage reference from our storage service
    const storageRef = ref(storage, `ads/${ad.image.name}`);   // sb sy img name stoarge ka referenece crete krna ha ads/ ads k path me ad aye 

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, ad.image)    // 2nd m storage me img ko upload krwaengy ad.image ko

    // Get the download URL
    const url = await getDownloadURL(storageRef) // 3rd me url ko downlo krwengy storageRef me

    ad.image = url  // img ka url

    // --------------- add DATA to DB collection ----------- Add a document ----------  (cloud firestore/add&mangeddata/add-data)  //after upload img to upload the data from Db collection
    
    // Add a new document with a generated id.
    await addDoc(collection(db, "ads"),ad)  //multiple jga use hoa ad is lye parameter me ad

   alert('Data Added Successfully')

  } catch (e) {
      alert(e.message)
      console.log(e.message);
  }

}

export {
  adPostToDB
} //postAd sy insert kye firebase dashboard me fireb sy nikalegy



// ------------------------ DASHBOARD -------------- get all documts in a subcollectin------------------ (clud firest/readdata/get data)

// all documts sy dta nikalna ha collection stoage img user etc

export async function dashboard() {     
//declares an asynchronous function named dashboard

   // Query a reference to a subcollection
   const querySnapshot = await getDocs(collection(db, "ads"));   // firestore me collection ads sy receive hoga data 

   const ads = []  // 1 empty ads name sy variba initiailize kia gya ha .  where we'll store the data retrieved from Firestore.

   querySnapshot.forEach((doc) => {

    // doc.data() is never undefined for query doc snapshots

    //  console.log(doc.id, " => ", doc.data()); 

   const ad = doc.data()   //This line extracts the data of the current document and assigns it to a variable named ad.
   ad.id = doc.id       //It adds the document ID to the ad object.

    ads.push(ad)   //This adds the ad object to the ads array.
   
  });

  return ads;    // ads name ka array return kia gya ha jis all collect ka data firestore DB m save ho ga wo yhn ayga 

}

// ========================

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log('uid ..', uid)
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export {
  auth,
  onAuthStateChanged
}


// ------------------------ GET AD DETAIL -------------- get a document------------------ (clud firest/readdata/get data)

export async function getSingleAd(adId) {
// debugger

const docRef = doc(db, "ads", adId);
const docSnap = await getDoc(docRef);
console.log(adId);
if (docSnap.exists()) {
  const ad = docSnap.data()
  console.log("Document data:", docSnap.data());
  return ad;
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

}


// ------------------------ GET USER AD INFO -------------- get a document------------------ (clud firest/readdata/get data)


export async function getUserInfo(uid) {
  // debugger;
  const docRef = doc(db, "users", uid);   //edit users uid
  console.log('uid==>===> ', uid);

const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  const user = docSnap.data()   //edit this line
  // console.log("Document data:", docSnap.data());
 return user;  // edit this line
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

}


async function logout() {

  await signOut(auth).then(() => {
    // Sign-out successful.
    alert('LogOut SuccessFully!')               //pta nh sahi chal raha ha yanhi
  }).catch((error) => {
    // An error happened.
    alert(error)
  });
}

export {
  logout
}

// myAds and javscript me serach time yeh bh sir ne kia tha 
 