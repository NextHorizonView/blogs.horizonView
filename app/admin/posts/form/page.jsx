"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePostsForm } from "./context/PostsFormContext";
import { useCategories } from "@/lib/firebase/category/read";
import { useAuthors } from "@/lib/firebase/author/read";
import { RTEField } from "./components/RTEField";

export default function Page() {
  const {
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
  } = usePostsForm();

  const searchParams = useSearchParams();
    const updatePostId = searchParams.get('id');
  useEffect(() => {
    if (updatePostId) {
      fetchData(updatePostId);
    }
  }, [updatePostId]);
  return (
    <main className="w-full p-6 flex flex-col gap-6">
      <h1 className="font-bold text-lg">Post | Form</h1>
      {updatePostId && (
        <div>
          <h3 className="text-white bg-gray-400 rounded-full px-4 py-3 text-center">
            Update
          </h3>
        </div>
      )}
      <section className="flex">
        <form
          className="flex flex-col gap-2 rounded-xl p-7"
          onSubmit={(e) => {
            if (updatePostId) {
              handleUpdate();
            } else {
              handleCreate();
            }
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-2 p-2">
            <label className="text-lg">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the Title"
              className="px-4 py-4 rounded-full border"
              required
              onChange={(e) => {
                handleData("title", e.target.value);
              }}
              value={data?.title || ""}
            />
          </div>

          <div className="flex flex-col gap-2 p-2">
            <label className="text-lg">
            Post Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the Post Slug"
              className="px-4 py-4 rounded-full border"
              required
              onChange={(e) => {
                handleData("slug", e.target.value);
              }}
              value={data?.slug || ""}
            />
          </div>

          {image && (
            <div className="">
              <img
                className="w-40"
                src={URL.createObjectURL(image)}
                alt="Post Preview"
              />
            </div>
          )}
          {data?.imageURL && (
            <div className="">
              <img
                className="w-40"
                src={data?.imageURL}
                alt="Post Preview"
              />
            </div>
          )}
          <SelectCategoryField />
          <SelectAuthorsField/>
          <div className="flex flex-col gap-2 p-2">
            <label className="text-lg">
              Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="px-4 py-4 rounded-full border"
              onChange={(e) => {
                e.preventDefault();
                setImage(e.target.files[0]);
              }}
              required
            />
          </div>
          
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!isDone && (
            <button
              type="submit"
              disabled={isLoading || isDone}
              className="bg-black text-gray-50 px-4 py-4 rounded-lg"
            >
              {isLoading
                ? "Loading.. "
                : updatePostId
                ? "Update"
                : "Create"}
            </button>
          )}
          {updatePostId && !isDone && (
            <button
              disabled={isLoading || isDone}
              className="bg-black text-gray-50 px-4 py-4 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                handleDelete(updatePostId);
              }}
            >
              {isLoading ? "Loading.. " : "Delete"}
            </button>
          )}
          {isDone && (
            <h3 className="text-green-400 text-lg text-center">
              Successfully {updatePostId ? "Update" : "Created"}{" "}
            </h3>
          )}
        </form>
        <RTEField />
      </section>
    </main>
  );
}
function SelectCategoryField()
{
  const {
    data,
    handleData,
  } = usePostsForm();
  const {data : categories} = useCategories();
  return <div className="flex flex-col gap-2 p-2">
  <label className="text-lg">
  Select Category <span className="text-red-500">*</span>
  </label>
    <select className="px-4 py-4 rounded-full border" name="category" id="category" placeholder="Select Category"
    onChange={(e)=>
    {
      handleData('categoryId',e.target.value)
    }
    }
    >
    {categories && categories.map((item) =>
    {
      return <option value={item?.id}>{item?.name}</option>
    })}
    </select>
  </div>
}
function SelectAuthorsField()
{
  const {
    data,
    handleData,
  } = usePostsForm();
  const {data : authors} = useAuthors();
  return <div className="flex flex-col gap-2 p-2">
  <label className="text-lg">
  Select Category <span className="text-red-500">*</span>
  </label>
    <select className="px-4 py-4 rounded-full border" name="category" id="category" placeholder="Select Author"
    onChange={(e)=>
    {
      handleData('authors',e.target.value)
    }
    }
    >
    {authors && authors.map((item) =>
    {
      return <option value={item?.id}>{item?.name}</option>
    })}
    </select>
  </div>
}