import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

abstract class APIClient<T extends { id: string }> {
  collectionRef: string;

  constructor(collectionName: string) {
    this.collectionRef = collectionName;
  }

  async getAll(): Promise<T[]> {
    const query = await getDocs(collection(db, this.collectionRef));
    console.log("Fetching data..");
    return query.docs.map((doc) => ({
      ...(doc.data() as T),
      id: doc.id,
    }));
  }

  async getById(id: string): Promise<T> {
    const document = await getDoc(doc(db, this.collectionRef, id));

    if (!document.exists()) {
      throw new Error(`Document with id: ${id} not found.`);
    }

    return { ...(document.data() as T), id: document.id };
  }

  async add(data: T): Promise<T> {
    const { id, ...dataWithoutId } = data;
    const documentRef = await addDoc(
      collection(db, this.collectionRef),
      dataWithoutId
    );

    alert("Game added.");

    return this.getById(documentRef.id);
  }

  async update(data: Partial<T> & { id: string }): Promise<T> {
    const documentRef = doc(db, this.collectionRef, data.id);
    const document = await getDoc(documentRef);
    if (!document.exists()) {
      throw new Error(`Cannot update: Document with id: ${data.id} not found.`);
    }
    await updateDoc(documentRef, data);
    console.log(`Document successfully edited!`);

    return this.getById(data.id);
  }

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, this.collectionRef, id));
    console.log(`Document successfully deleted.`);
  }
}

export default APIClient;
