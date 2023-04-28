"use client"
import pb from "@/lib/pocketbase"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  search: string
}

export default function SendNote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const record = await pb.collection("users").getFullList({
      filter: `studentId~${data.search} || name~${data.search}`,
    })
    console.log(record)
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
    </div>
  )
}
