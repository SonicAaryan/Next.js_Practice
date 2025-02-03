import { prisma } from '@/lib/prisma';
import React from 'react'

const SnippetDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
   const id = Number((await params).id);
   const snippet = await prisma.snippet.findUnique({
      where: {
         id,
      }
   })
   if (!snippet) {
      return (
         <h1>No Snippet Found!!</h1>
      )
   }
   return (
      <div>
         <h1 className="font-semibold text-xl">{snippet?.title}</h1>
         <pre className="bg-gray-100 p-4 rounded">{snippet?.code}</pre>
         <div className='flex gap-7 mt-3'>
            <button className='w-15 h-10 p-5 bg-gray-500 hover:bg-gray-300 hover:text-black text-white flex items-center rounded-xl'>Edit</button>
            <button className='w-15 h-10 p-5 bg-red-500 hover:bg-red-400 text-white flex items-center rounded-xl'>Delete</button>
         </div>
      </div>
   );
}

export default SnippetDetailPage