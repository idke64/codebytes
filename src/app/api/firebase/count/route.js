import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/config/firebase";
import { NextResponse } from "next/server";

//returns the number of documents in a collection
//Ex. countDocuments([collection,document,collection])

export async function GET(req) {
  const { collections } = await req.json();

  try {
    const collectionRef = collection(db, ...collections);
    const snapshot = await getCountFromServer(collectionRef);
    return NextResponse.json({ count: snapshot.data().count }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
