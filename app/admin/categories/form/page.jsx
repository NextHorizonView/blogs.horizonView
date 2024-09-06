"use client";

import React, { useEffect } from "react";
import { useCategoryForm } from "./context/CategoryFormContext";

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
    updateCategoryId,
    handleUpdate,
    handleDelete
  } = useCategoryForm();
  useEffect(() => {
    if (updateCategoryId) {
      fetchData(updateCategoryId);
    }
  }, [updateCategoryId]);
  return (
    <main className="w-full p-6 flex flex-col gap-6">
      <h1 className="font-bold text-lg">Categories | Form</h1>
      {updateCategoryId && (
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
            if (updateCategoryId) {
              handleUpdate();
            } else {
              handleCreate();
            }
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-2 p-2">
            <label className="text-lg">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the Category Name"
              className="px-4 py-4 rounded-full border"
              required
              onChange={(e) => {
                handleData("name", e.target.value);
              }}
              value={data?.name || ""}
            />
          </div>

          <div className="flex flex-col gap-2 p-2">
            <label className="text-lg">
              Category Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter the Category Slug"
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
                alt="Category Preview"
              />
            </div>
          )}
          {data?.iconURL && (
            <div className="">
              <img
                className="w-40"
                src={data?.iconURL}
                alt="Category Preview"
              />
            </div>
          )}

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
                : updateCategoryId
                ? "Update"
                : "Create"}
            </button>
          )}
          {updateCategoryId && !isDone && (
            <button
              disabled={isLoading || isDone}
              className="bg-black text-gray-50 px-4 py-4 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                handleDelete(updateCategoryId);
              }}
            >
              {isLoading ? "Loading.. " : "Delete"}
            </button>
          )}
          {isDone && (
            <h3 className="text-green-400 text-lg text-center">
              Successfully {updateCategoryId ? "Update" : "Created"}{" "}
            </h3>
          )}
        </form>
      </section>
    </main>
  );
}
