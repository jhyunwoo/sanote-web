"use client"
import pb from "@/lib/pocketbase"
import { useForm, SubmitHandler } from "react-hook-form"
import { useState } from "react"
import axios from "axios"

type SearchType = {
  search: string
}

type PushType = {
  title: string
  message: string
}

type Any = any

type SenderType = {
  name: string
  id: string
  studentId: number
  year: number
  class: number
}

export default function SendNote() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchType>()

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<PushType>()

  const [searchResult, setSearchResult] = useState<Any[]>([])
  const [sender, setSender] = useState<SenderType[]>([])

  const onSubmit: SubmitHandler<SearchType> = async data => {
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

  const sendPush: SubmitHandler<PushType> = async data => {
    if (sender.length > 0) {
      console.log(data)
      await axios.post("/api/send-push", {
        userInfo: sender,
        push: { title: data.title, message: data.message },
      })
    } else {
      alert("보낼 사람을 선택하세요")
    }
  }

  function addList(userInfo: any) {
    let isInclude = false
    for (let i = 0; i < sender.length; i++) {
      if (
        JSON.stringify({
          name: userInfo.name,
          id: userInfo.id,
          studentId: userInfo.studentId,
          year: userInfo.year,
          class: userInfo.class,
        }).includes(JSON.stringify(sender[i]))
      )
        isInclude = true
    }
    if (!isInclude)
      setSender([
        ...sender,
        {
          name: userInfo.name,
          id: userInfo.id,
          studentId: userInfo.studentId,
          year: userInfo.year,
          class: userInfo.class,
        },
      ])
  }

  function deleteSender(key: number) {
    let senderList = sender
    let newList = []
    let deleteSenderInfo = JSON.stringify(sender[key])
    for (let i = 0; i < senderList.length; i++) {
      if (!(JSON.stringify(senderList[i]) === deleteSenderInfo)) {
        newList.push(senderList[i])
      }
    }
    setSender(newList)
  }

  async function sendNote() {
    console.log(sender)
    await axios.post("/api/send-push", { userInfo: sender, message: "hello" })
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
          <button
            key={key}
            className="flex w-full justify-around"
            onClick={() => addList(data)}
          >
            <div>{data.name}</div>
            <div>{data.studentId}</div>
            <div>{data.year}학년</div>
            <div>{data.class}반</div>
          </button>
        ))}
      </div>

      <div>
        <div>List</div>
        {sender.map((data, key) => (
          <div key={key} className="flex">
            <div>{data.name}</div>
            <button onClick={() => deleteSender(key)}>삭제</button>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit2(sendPush)}>
        <input {...register2("title", { required: true })} />
        <input {...register2("message", { required: true })} />
        <button type="submit">전송</button>
      </form>
      {/* <button onClick={sendNote}>쪽지 전송</button> */}
    </div>
  )
}
