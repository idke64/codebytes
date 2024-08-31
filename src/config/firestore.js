import {
  collection,
  getDocs,
  getDoc,
  doc,
  serverTimestamp,
  addDoc,
  setDoc,
  query,
  getCountFromServer,
  count,
} from "firebase/firestore";
import { db } from "./firebase";

// Retrieves all documents from a collection with optional queries
// getCollection([collection,document,collection], [query1,query2])

export const getCollection = async (collections, queries = null) => {
  try {
    const collectionRef = collection(db, ...collections);

    var querySnapshot;
    if (queries) {
      querySnapshot = await getDocs(query(collectionRef, ...queries));
    } else {
      querySnapshot = await getDocs(collectionRef);
    }

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Retrieves a single document from a collection
// getDocument([collection,document,collection],documentId)

export const getDocument = async (collections, docId) => {
  try {
    const docRef = doc(db, ...collections, docId);

    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};

// Adds a document to a collection with a random id unless specified. If document already exists, it will be overwritten
// addDocument([collection,document,collection],fields,id)

export const addDocument = async (collections, data, id = null) => {
  try {
    const collectionRef = collection(db, ...collections);

    if (id) {
      const docRef = doc(collectionRef, id);
      await setDoc(docRef, data, { merge: true });
      return id;
    } else {
      data.created_at = serverTimestamp();
      const docRef = await addDoc(collectionRef, data);
      return docRef.id;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

//returns the number of documents in a collection
//countDocuments([collection,document,collection])

export const countDocuments = async (collections) => {
  try {
    const collectionRef = collection(db, ...collections);
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
