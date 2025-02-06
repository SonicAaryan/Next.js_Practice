import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  
  const snippets = await prisma.snippet.findMany();

  if (!snippets || snippets.length === 0) {
    return <div>No snippets found</div>;
  }

  return (
    <div>
      <h1 className="font-bold text-2xl">Home</h1>
      <div className="flex items-center justify-between">
        <h1>Snippet</h1>
        <Link href={'/snippet/new'}>
          <Button className="w-20 h-10 bg-slate-500 hover:bg-slate-700 hover:text-white text-1xl">New</Button>
        </Link>
      </div>

      {snippets.map((snippet) => {
        return (
          <div key={snippet.id} className="flex justify-between mt-5 mb-2 p-4 border-b bg-gray-200 rounded-2xl">
            <h1 className="font-semibold text-xl">{snippet.title}</h1>
            <Link href={`/snippet/${snippet.id}`}><Button variant={'link'} className="text-xl">View</Button></Link>

          </div>
        );
      })}
    </div>
  );
}
