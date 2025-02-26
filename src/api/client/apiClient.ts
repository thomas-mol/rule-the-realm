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
    try {
      const query = await getDocs(collection(db, this.collectionRef));
      console.log("Fetching data..");
      return query.docs.map((doc) => ({
        ...(doc.data() as T),
        id: doc.id,
      }));
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw new Error("Failed to fetch data.");
    }
  }

  async getById(id: string): Promise<T> {
    try {
      const document = await getDoc(doc(db, this.collectionRef, id));
      if (!document.exists()) {
        throw new Error(`Document with id: ${id} not found.`);
      }
      return { ...(document.data() as T), id: document.id };
    } catch (error) {
      console.error(`Error fetching document:`, error);
      throw new Error("Failed to fetch document.");
    }
  }

  async add(data: T): Promise<T> {
    try {
      const { id, ...dataWithoutId } = data;
      const documentRef = await addDoc(
        collection(db, this.collectionRef),
        dataWithoutId
      );
      console.log("Document added.");
      return this.getById(documentRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
      throw new Error("Failed to add document.");
    }
  }

  async update(data: Partial<T> & { id: string }): Promise<T> {
    try {
      const documentRef = doc(db, this.collectionRef, data.id);
      const document = await getDoc(documentRef);
      if (!document.exists()) {
        throw new Error(
          `Cannot update: Document with id: ${data.id} not found.`
        );
      }
      await updateDoc(documentRef, data);
      console.log(`Document successfully edited!`);

      return this.getById(data.id);
    } catch (error) {
      console.error(`Error updating document:`, error);
      throw new Error("Failed to update document.");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionRef, id));
      console.log(`Document successfully deleted.`);
    } catch (error) {
      console.error(`Error deleting document:`, error);
      throw new Error("Failed to delete document.");
    }
  }
}

export default APIClient;
