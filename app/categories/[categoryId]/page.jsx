import { PostCard } from "@/app/components/PostListView";
import { getCategories } from "@/lib/firebase/category/read_server";
import { getAllPostsWithCategory } from "@/lib/firebase/posts/read_server";

export default async function Page({params})
{
    const {categoryId} = params;
    const posts = await getAllPostsWithCategory(categoryId);
    return <main className="p-10">
        <div className="flex flex-row gap-3 p-6">
            <h1 className="font-bold text-2xl">Categories /</h1>
             <CategoryCard categoryId={categoryId}/>
        </div>
        <div className="grid grid-cols-4 gap-5">
        {posts?.map((post,key)=>
        {
            return <PostCard post={post} key={key} />
        })}
        </div>
    </main>

}

async function CategoryCard({categoryId})
{
    const category = await getCategories(categoryId);

    return <div className="flex items-center gap-2 rounded bg-white bg-opacity-60 border px-2 py-1">
        <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} />
        <h4 className="text-lg text-black">{category?.name}</h4>
    </div>
}