import { db } from '@/lib/firebase'
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
export const getCategories = async (id)=>{
    return await getDoc(doc(db,`categories/${id}`)).then((snap)=> snap.data())
   }

   export const getAllCategories = async ()=>{
    return await getDocs(collection(db,`categories`)).then((snap)=> snap.docs.map((d)=> d.data()));
   }