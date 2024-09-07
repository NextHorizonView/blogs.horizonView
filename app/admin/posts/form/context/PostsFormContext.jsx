"use client";

import { getPosts } from "@/lib/firebase/posts/read";
import { createNewPosts, deletePosts, updatePosts } from "@/lib/firebase/posts/write";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState } from "react";

// Corrected component name
const PostsFormContext = createContext();

export default function PostsFormContextProvider({ children }) {
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
            await createNewPosts({ data, image });
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
            await updatePosts({ data, image });
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
            await deletePosts(id);
            router.push('/admin/posts');
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
            const res = await getPosts(id);
            if(res.exists())
            {
                setData(res.data());
            }else
            {
                throw new Error("No posts exists");
            }
            // setDone(true);
        } catch (error) {
            setError(error?.message || "An error occurred"); // Provide a default error message
        } 
        setLoading(false);
    }
    return (
        <PostsFormContext.Provider
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
        </PostsFormContext.Provider>
    );
}

export const usePostsForm = () => useContext(PostsFormContext);
