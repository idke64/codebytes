import {
  collection,
  doc,
  serverTimestamp,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/config/firebase";

// Adds a document to a collection with a random id unless specified. If document already exists, it will be overwritten
// Ex. addDocument([collection,document,collection],fields,id)

export async function POST(req) {
  const { collections, data, id = null } = await req.json();
  try {
    const collectionRef = collection(db, ...collections);

    if (id) {
      const docRef = doc(collectionRef, id);
      await setDoc(docRef, data, { merge: true });
      return NextResponse.json({ id: id }, { status: 201 });
    } else {
      data.created_at = serverTimestamp();
      const docRef = await addDoc(collectionRef, data);
      return NextResponse.json({ id: docRef.id }, { status: 201 });
    }
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
