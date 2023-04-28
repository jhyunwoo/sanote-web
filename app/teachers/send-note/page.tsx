"use client"
import pb from "@/lib/pocketbase"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"

type Inputs = {
  search: string
}

type Any = any

export default function SendNote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [searchResult, setSearchResult] = useState<Any[]>([])

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      parseInt(data.search)
      const record = await pb.collection("users").getFullList({
        filter: `studentId=${Number(data.search)}`,
      })
      setSearchResult(record)
    } catch {
      const record = await pb.collection("users").getFullList({
        filter: `name~"${data.search}"`,
      })
      setSearchResult(record)
    }
  }

  return (
    <div>
      <div>Send Note</div>
      <div>
        <div>Search</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("search")} />
          <button type="submit">검색</button>
        </form>
      </div>
      <div>
        {searchResult.map((data, key) => (
          <div key={key} className="flex w-full justify-around">
            <div>{data.name}</div>
            <div>{data.studentId}</div>
            <div>{data.year}학년</div>
            <div>{data.class}반</div>
          </div>
        ))}
      </div>
    </div>
  )
}
