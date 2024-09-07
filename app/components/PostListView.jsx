import { getAuthors } from "@/lib/firebase/author/read_server";
import { getCategories } from "@/lib/firebase/category/read_server";
import { getCategory } from "@/lib/firebase/category/read";
import getAllPosts from "@/lib/firebase/posts/read_server";
import Link from "next/link";

export default async function PostListView()
{
    const posts = await getAllPosts();
    if(!posts)
    {
        return <div>
            <h3>Posts Not Available</h3>
        </div>
    }
    return <section className="p-10">
        <div className="grid grid-cols-4 gap-5 ">

        {posts?.map((posts,key)=>
        {
            return <PostCard  post={posts} key={key} />
        }
    )}
    </div>
    </section>
}

export function PostCard({ post }) {
    return (
        <Link href={`/posts/${post?.id}`}>
        <div className="p-5 rounded border flex flex-col gap-3">
            <div className="relative">
            <div className="absolute flex justify-end w-full p-3 ">
           <CategoryCard  categoryId={post?.categoryId}/>
            </div>
            <img className="h-[400px] w-full object-cover" src={post?.imageURL} alt="Post Image" />
            </div>
            <h1 className="font-bold">{post?.title}</h1>
            <div className="flex justify-between">
            <AuthorCard authorId={post?.authors}/>
            <h5>{post?.timestamp?.toDate()?.toLocaleDateString()}</h5> {/* Corrected method name */}
            </div>
        </div>
        </Link>
    );
}
async function AuthorCard({authorId})
{
    const author = await getAuthors(authorId);

    return <div className="flex items-center gap-6">
        <img className="h-7 w-7 rounded-full object-cover" src={author?.photoURL} />
        <h4 className="text-sm text-gray-600">{author?.name}</h4>
    </div>
}

async function CategoryCard({categoryId})
{
    const category = await getCategories(categoryId);

    return <div className="flex items-center gap-2 rounded bg-gray-400 bg-opacity-60 p-3">
        <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} />
        <h4 className="text-lg text-black">{category?.name}</h4>
    </div>
}