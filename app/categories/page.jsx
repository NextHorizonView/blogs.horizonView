import { getAllCategories } from "@/lib/firebase/category/read_server";
import Link from "next/link";

export default async function Page() {
    const categories = await getAllCategories();
    console.log("All Categories", categories);

    return (
        <main className="p-10">
            <section className="grid grid-cols-5 p-2">
                {categories?.map((category, key) => {
                    return <CategoryCard category={category} key={key} />;
                })}
            </section>
        </main>
    );
}

function CategoryCard({ category }) {
    return (
        <Link href={`/categories/${category?.id}`}>
            <div className="flex flex-col items-center justify-center gap-2 hover:bg-blue-50 rounded-xl p-6">
                <img
                    className="h-28 w-28 object-cover rounded-full"
                    src={category?.iconURL}
                    alt={category?.name}
                />
                <h1 className="text-black font-bold">{category?.name}</h1>
            </div>
        </Link>
    );
}
