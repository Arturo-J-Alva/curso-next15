"use client"

import { Heading, Text } from "@chakra-ui/react"

import { Bookmark } from "@/components/bookmark"

import { useQuery } from "@tanstack/react-query"
import { BookmarkType } from "./schema"
// import { orm } from "./db"

export default function Bookmarks() {

  const {
    data: bookmarks = [],
    status
  } = useQuery<BookmarkType[], Error>({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/bookmarks/api", {
        // `next` options are typically for Next.js fetch, not directly used by react-query's fetch function
        // If server-side caching with tags is still desired, it should be handled by the API route itself
        // or by Next.js fetch if used outside react-query's queryFn.
      });
      if (!res.ok) {
        throw new Error("Error al cargar los marcadores");
      }
      const data = await res.json();
      return data.data; // Assuming the API returns { data: BookmarkType[] }
    },
  });

  console.log("status", status)

  // const bookmarks=  await orm.query.bookmarks.findMany({
  //     limit: 10,
  //     with: {
  //       author: true,
  //     },
  //   })

  return (
    <main className="mt-12">
      <header className="">
        <Heading size="lg" className="mb-1">
          Marcadores
        </Heading>
        <Text>
          Estrategías de consumo de datos desde el servidor y el cliente
        </Text>
      </header>

      <ul className="text-lg mt-10">
        {bookmarks.map((bookmark) => (
          <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
            <Bookmark {...bookmark} />
            {/* <div className="my-1 text-gray-600 text-xs ml-7">
              Creado por {bookmark.author?.name || "Anónimo"}
            </div> */}
          </li>
        ))}
      </ul>
    </main>
  )
}
