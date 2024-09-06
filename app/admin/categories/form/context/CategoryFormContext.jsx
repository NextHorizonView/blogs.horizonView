"use client";

import { getCategory } from "@/lib/firebase/category/read";
import { createNewCategory, deleteCategory, updateCategory } from "@/lib/firebase/category/write";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

// Corrected component name
const CategoryFormContext = createContext();

export default function CategoryFormContextProvider({ children }) {
    const router  = useRouter();
    const searchParams = useSearchParams();
    const updateCategoryId = searchParams.get('id');
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
            await createNewCategory({ data, image });
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
            await updateCategory({ data, image });
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
            await deleteCategory(id);
            router.push('/admin/categories');
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
            const res = await getCategory(id);
            if(res.exists())
            {
                setData(res.data());
            }else
            {
                throw new Error("No category exists");
            }
            // setDone(true);
        } catch (error) {
            setError(error?.message || "An error occurred"); // Provide a default error message
        } 
        setLoading(false);
    }
    return (
        <CategoryFormContext.Provider
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
                updateCategoryId,
                handleUpdate,
                handleDelete
            }}
        >
            {children}
        </CategoryFormContext.Provider>
    );
}

export const useCategoryForm = () => useContext(CategoryFormContext);
