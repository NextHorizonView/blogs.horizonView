"use client";
import useCollectionCount from "@/lib/firebase/count";
import { count } from "firebase/firestore";

export default function CountCard({ path, name, icon }) {
  const { data, isLoading, error } = useCollectionCount({ path: path });
  if (isLoading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <p></p>;
  }
  return (
    <div className="bg-gray-50 flex gap-2 items-center rounded px-10 py-8">
      {icon}
      <div>
        <h1 className="font-bold">{name}</h1>{" "}
        <h2 className="text-xl font-bold">{data}</h2>
      </div>
    </div>
  );
}
