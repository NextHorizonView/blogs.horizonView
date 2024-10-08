import { db, storage } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewAuthor = async ({data, image}) => {
  console.log("Name", data.name);
  console.log("Image", image);

  if (!data?.name) {
    throw new Error("Name is undefined");
  }
  if (!data?.email) {
    throw new Error("email is undefined");
  }
  if (!image) {
    throw new Error("Image is undefined");
  }
  const id = doc(collection(db,'ids')).id;
  // Upload image to Firebase Storage
  const imgRef = ref(storage, `blogs/authors/${id}.png`);
  await uploadBytes(imgRef, image);  // Upload the 'image' file object
  const imageUrl = await getDownloadURL(imgRef); // Get the download URL for the uploaded image

  // Store category data in Firestore, including the image URL
  const firestoreRef = doc(db,`authors/${id}`); // Reference to the document within the collection
  await setDoc(firestoreRef, {
    ...data,
    id: id,
    email: data?.email,
    photoURL: imageUrl, // Store the URL, not the image file
    timestamp: Timestamp.now(),
  });
};

export const updateAuthor = async ({data, image}) => {
  console.log("Name", data.name);
  console.log("Image", image);

  if (!data?.name) {
    throw new Error("Name is undefined");
  }
  if (!data?.email) {
    throw new Error("email is undefined");
  }
  var imageURl = data?.photoURL;
  if (image) {
  
    const imgRef = ref(storage, `blogs/authors/${data?.id}.png`);
    await uploadBytes(imgRef, image);  // Upload the 'image' file object
    imageURl = await getDownloadURL(imgRef); // Get the download URL for the uploaded image
  }

  // Upload image to Firebase Storage

  // Store category data in Firestore, including the image URL
  const firestoreRef = doc(db,`authors/${data?.id}`); // Reference to the document within the collection
  await updateDoc(firestoreRef, {
    ...data,
    photoURL: imageURl, // Store the URL, not the image file
    timestamp: Timestamp.now(),
  });
};

export const deleteAuthor = async (id) =>
{
if(!id)
{
 throw new Error("Id is required");
}
await deleteDoc(doc(db,`authors/${id}`));
}