"use client";

import { getAuthors } from "@/lib/firebase/author/read";
import { createNewAuthor, deleteAuthor, updateAuthor } from "@/lib/firebase/author/write";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

// Corrected component name
const AuthorFormContext = createContext();

export default function AuthorFormContextProvider({ children }) {
    const router  = useRouter();
    // const searchParams = useSearchParams();
    // const updateCategoryId = searchParams.get('id');
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isDone, setDone] = useState(false);
    const [image, setImage] = useState(null);

    const handleData = (key, value) => {
        setDone(false);
        setData(prevData => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleCreate = async () => {
        setError(null);
        setLoading(true);
        setDone(false);
        try {
            await createNewAuthor({ data, image });
            setDone(true);
        } catch (error) {
            setError(error?.message || "An error occurred"); // Provide a default error message
        } finally {
            setLoading(false); // Ensure loading state is always reset
        }
    };

    const handleUpdate = async () => {
        setError(null);
        setLoading(true);
        setDone(false);
        try {
            await updateAuthor({ data, image });
            setDone(true);
        } catch (error) {
            setError(error?.message || "An error occurred"); // Provide a default error message
        } finally {
            setLoading(false); // Ensure loading state is always reset
        }
    };
    const handleDelete = async (id) => {
        setError(null);
        setLoading(true);
        setDone(false);
        try {
            await deleteAuthor(id);
            router.push('/admin/authors');
            setDone(true);
        } catch (error) {
            setError(error?.message || "An error occurred"); // Provide a default error message
        } finally {
            setLoading(false); // Ensure loading state is always reset
        }
    };
    const fetchData = async (id)=>
    {
        setError(null);
        setLoading(true);
        setDone(false);
        try {
            const res = await getAuthors(id);
            if(res.exists())
            {
                setData(res.data());
            }else
            {
                throw new Error("No Authors exists");
            }
            // setDone(true);
        } catch (error) {
            setError(error?.message || "An error occurred"); // Provide a default error message
        } 
        setLoading(false);
    }
    return (
        <AuthorFormContext.Provider
            value={{
                data,
                isLoading,
                error,
                isDone,
                setImage,
                image,
                fetchData,
                handleData,
                handleCreate,
                // updateCategoryId,
                handleUpdate,
                handleDelete
            }}
        >
            {children}
        </AuthorFormContext.Provider>
    );
}

export const useAuthorForm = () => useContext(AuthorFormContext);
