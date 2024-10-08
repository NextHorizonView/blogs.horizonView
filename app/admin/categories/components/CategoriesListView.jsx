"use client"

import { useCategories } from "@/lib/firebase/category/read"
import Link from "next/link";

export default function CategoriesListView()
{
    const {data,error,isLoading} = useCategories();
    if(isLoading)
    {
        return <h1>Loading...</h1>
    }
    if(error)
    {
        return <h1>{error}</h1>
    }
    if(!data)
    {
        return <h1>Data not found</h1>
    } 
    return <section>
        <table className="w-full items-center">
            <thead>
                <tr>
                    <th className="border px-4 py-2">Icon</th>
                    <th className="border px-4 py-2">Sr.</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Slug</th>
                    <th className="border px-4 py-2">Action</th>

                </tr>
            </thead>
        <tbody className="items-center">
        {data?.map((item,key)=>
        {
            return <tr>
                <td className="border px-4 py-2 items-center">{key + 1}</td>
                <td className="border px-4 py-2"><img className="h-10" src={item?.iconURL}/></td>
                <td className="border px-4 py-2">{item?.name}</td>
                <td className="border px-4 py-2">{item?.slug}</td>
                <td className="border px-4 py-2">
                    <Link href={`/admin/categories/form?id=${item?.id}`}>
                    <button className="bg-black text-white text-sm rounded-full px-4 py-2">Action</button>
                    </Link>
                </td>
            </tr>
        })}
        </tbody>
        </table>
    </section>
}