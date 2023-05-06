"use client"

import pb from "@/lib/pocketbase"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"

type Inputs = {
  search: string
}

type SearchResultType = {
  users: any[]
  classes: any[]
}

export default function Input() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [searchResult, setSearchResult] = useState<SearchResultType>({
    users: [],
    classes: [],
  })

  const [receiver, setReceiver] = useState<any[]>([])
  const [receiveClass, setReceiveClass] = useState<any[]>([])

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const users = await pb.collection("users").getFullList({
      filter: `name~"${data.search}" || studentId="${data.search}"`,
      expand: "pushInfos(user)",
    })
    const classes = await pb.collection("classes").getFullList({
      filter: `title~"${data.search}"`,
      expand: "students.pushInfos(user)",
    })
    const results = { users: users, classes: classes }
    setSearchResult(results)
  }

  function addReceiver(data: any) {
    if (!receiver.includes(data)) {
      setReceiver([...receiver, data])
    }
  }

  function addReceiverClass(data: any) {
    if (!receiveClass.includes(data)) {
      setReceiveClass([...receiveClass, data])
    }
  }

  function deleteReceiver(data: any) {
    let list = receiver
    let filtered = list.filter(element => element !== data)
    setReceiver(filtered)
  }

  function deleteReceiverClass(data: any) {
    let list = receiveClass
    let filtered = list.filter(element => element !== data)
    setReceiveClass(filtered)
  }

  return (
    <div>
      <div>보낼 사람</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("search")} />
        <button type="submit">검색</button>
      </form>
      <div>
        {searchResult.classes?.map((data, key) => (
          <button
            onClick={() => addReceiverClass(data)}
            key={key}
            className={"flex"}
          >
            <div>{data.title}</div>
            <div>{data.pac}팩</div>
            <div>{data.students?.length}명</div>
          </button>
        ))}
        {searchResult.users?.map((data, key) => (
          <button
            onClick={() => addReceiver(data)}
            key={key}
            className={"flex"}
          >
            <div>{data.name}</div>
            <div>{data.studentId ? data.studentId : "선생님"}</div>
          </button>
        ))}
      </div>
      <div>
        <div>목록</div>
        <div>
          {receiver.map((data, key) => (
            <div key={key} className="flex">
              <div>{data.name}</div>
              <div>{data.studentId ? data.studentId : "선생님"}</div>
              <button onClick={() => deleteReceiver(data)}>삭제</button>
            </div>
          ))}
          {receiveClass.map((data, key) => (
            <div key={key} className="flex">
              <div>{data.title}</div>
              <div>{data.pac}</div>
              <button onClick={() => deleteReceiverClass(data)}>삭제</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
