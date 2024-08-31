import { collection, getDocs, getDoc, doc, query } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/config/firebase";

// Retrieves all documents from a collection with optional queries or a single document from a collection given a document id
// Ex. getDocument([collection,document,collection],documentId) or getCollection([collection,document,collection], [query1,query2])

export async function POST(req) {
  const { collections, docId = null, queries = null } = await req.json();
  try {
    if (docId) {
      const docRef = doc(db, ...collections, docId);

      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        return NextResponse.json(
          { data: { id: docSnapshot.id, ...docSnapshot.data() } },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Document not found" },
          { status: 404 }
        );
      }
    } else {
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

      return NextResponse.json({ data: data }, { status: 201 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
