import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { Label } from '@radix-ui/react-label'
import { redirect } from 'next/navigation'
import React from 'react'

function CreateSnippetPage() {
   async function createSnippet(formData: FormData) {
      "use server" // use Server directive
      const title = formData.get("title") as string
      const code = formData.get("code") as string

      const snippet = await prisma.snippet.create({
         data: {
            title,
            code
         }
      });
      console.log("create snippet :", snippet);
      redirect("/")
   }

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
         <form action={createSnippet} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl space-y-6">
            <div className="space-y-2">
               <Label htmlFor="title" className="block text-lg font-semibold text-gray-700">Title</Label>
               <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter title"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
               />
            </div>

            <div className="space-y-2">
               <Label htmlFor="code" className="block text-lg font-semibold text-gray-700">Code</Label>
               <textarea
                  name="code"
                  id="code"
                  placeholder="Enter code"
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
               />
            </div>

            <div className="flex justify-start">
               <Button type="submit" className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">Submit</Button>
            </div>
         </form>
      </div>
   )
}

export default CreateSnippetPage
