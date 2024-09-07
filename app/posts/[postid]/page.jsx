import { getPosts } from "@/lib/firebase/posts/read_server";
import { getAuthors } from "@/lib/firebase/author/read_server";
import { getCategories } from "@/lib/firebase/category/read_server";


export async function generateMetadata({ params}) {
  const { postid } = params;
  const post = await getPosts(postid);

  return {
    title: post?.title,
    openGraph: {
      images: [post?.imageURL],
    },
  }
}


export default async function Page({ params }) {
  const { postid } = params;
  const post = await getPosts(postid);
  return (
    <main  className="flex justify-center">
        <section className="p-10 flex flex-col gap-5 px-16 py-10 max-w-[900px]">
        <CategoryCard categoryId={post?.categoryId}/>
      <h1 className="text-5xl font-bold">{post?.title}</h1>
      <img className="w-full object-cover" src={post?.imageURL}/>
      <div className="flex justify-between items-center">
      <AuthorCard authorId={post?.authorId}/>
      <h5>{post?.timestamp?.toDate()?.toLocaleDateString()}</h5> {/* Corrected method name */}
      </div>
      <div dangerouslySetInnerHTML={{__html: post?.content}}>
      {/* {post?.content} */}

      </div>
        </section>
    </main>
  );
}
async function AuthorCard({authorId})
{
    const author = await getAuthors(authorId);
    console.log("Author",author);
    return <div className="flex gap-2 items-center">
        <img className="h-7 w-7 rounded-full object-cover " src={author?.photoURL}  alt="Author"/>
        <h4 className="text-sm text-black">{author?.name}</h4>
    </div>
}

async function CategoryCard({categoryId})
{
    const category = await getCategories(categoryId);

    return <div className="flex">
        <div className="flex items-center gap-2 rounded-xl  p-3 bg-gray-200 bg-opacity-30 px-4 py-3 border">

        <img className="h-4 w-4 rounded-full object-cover" src={category?.iconURL} />
        <h4 className="text-lg text-black">{category?.name}</h4>
        </div>
    </div>
}