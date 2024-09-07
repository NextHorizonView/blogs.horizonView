import { db, storage } from "@/lib/firebase";
import { deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewPosts = async ({data, image}) => {
  console.log("Name", data.name);
  console.log("Image", image);

  if (!data?.title) {
    throw new Error("Name is undefined");
  }
  if (!data?.slug) {
    throw new Error("Slug is undefined");
  }
  if (!image) {
    throw new Error("Image is undefined");
  }

  // Upload image to Firebase Storage
  const imgRef = ref(storage, `blogs/posts/${data?.slug}.png`);
  await uploadBytes(imgRef, image);  // Upload the 'image' file object
  const imageUrl = await getDownloadURL(imgRef); // Get the download URL for the uploaded image

  // Store category data in Firestore, including the image URL
  const firestoreRef = doc(db,`posts/${data?.slug}`); // Reference to the document within the collection
  await setDoc(firestoreRef, {
    ...data,
    id: data?.slug,
    imageURL: imageUrl, // Store the URL, not the image file
    timestamp: Timestamp.now(),
  });
};

export const updatePosts = async ({data, image}) => {
  console.log("Name", data.title);
  console.log("Image", image);

  if (!data?.title) {
    throw new Error("Name is undefined");
  }
  if (!data?.slug) {
    throw new Error("Slug is undefined");
  }
  var imageURl = data?.iconURL;
  if (image) {
  
    const imgRef = ref(storage, `blogs/posts/${data?.slug}.png`);
    await uploadBytes(imgRef, image);  // Upload the 'image' file object
    imageURl = await getDownloadURL(imgRef); // Get the download URL for the uploaded image
  }

  // Upload image to Firebase Storage

  // Store category data in Firestore, including the image URL
  const firestoreRef = doc(db,`posts/${data?.id}`); // Reference to the document within the collection
  await updateDoc(firestoreRef, {
    ...data,
    iconURL: imageURl, // Store the URL, not the image file
    timestamp: Timestamp.now(),
  });
};

export const deletePosts = async (id) =>
{
if(!id)
{
 throw new Error("Id is required");
}
await deleteDoc(doc(db,`posts/${id}`));
}