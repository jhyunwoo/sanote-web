"use client"
import pb from "@/lib/pocketbase"
import { useForm, SubmitHandler } from "react-hook-form"
import { useEffect, useState } from "react"
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

type PushTypeType = string

type ClassListType = {
  name: string
  pac: number
  semister: number
  year: number
  students: string[]
  id: string
}

export default function SendNote() {
  const [pushType, setPushType] = useState<PushTypeType>("")

  const [classList, setClassList] = useState<ClassListType[]>([])

  // 검색 React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchType>()

  // Push React Hook Form 설정
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<PushType>()

  // 검색 결과 리스트
  const [searchResult, setSearchResult] = useState<Any[]>([])
  // 보내는 사람 리스트
  const [sender, setSender] = useState<SenderType[]>([])

  const [classSender, setClassSender] = useState<ClassListType[]>([])

  /** 검색 후 리스트 저장 */
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

  /** 사용자로부터 받은 메세지 정보를 전달하고 메세지 전송 */
  const sendPush: SubmitHandler<PushType> = async data => {
    if (pushType === "individual") {
      if (sender.length > 0) {
        await axios.post("/api/send-push", {
          userInfo: sender,
          push: { title: data.title, message: data.message },
        })
      } else {
        alert("보낼 사람을 선택하세요")
      }
    } else if (pushType === "announcement") {
      if (classSender.length > 0) {
        await axios.post("/api/send-push-announcement", {
          userInfo: classSender,
          push: { title: data.title, message: data.message },
        })
      } else {
        alert("보낼 사람을 선택하세요")
      }
    } else if (pushType === "emergency") {
      await axios.post("/api/send-push-emergency", {
        push: { title: data.title, message: data.message },
      })
    }
  }

  /** 보내는 사람 리스트에 사람 추가 */
  function addSender(userInfo: any) {
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

  function addClass(classInfo: ClassListType) {
    let isInclude = false
    for (let i = 0; i < classSender.length; i++) {
      if (
        JSON.stringify({
          name: classInfo.name,
          pac: classInfo.pac,
          semister: classInfo.semister,
          year: classInfo.year,
          students: classInfo.students,
          id: classInfo.id,
        }).includes(JSON.stringify(classSender[i]))
      )
        isInclude = true
    }
    if (!isInclude)
      setClassSender([
        ...classSender,
        {
          name: classInfo.name,
          pac: classInfo.pac,
          semister: classInfo.semister,
          year: classInfo.year,
          students: classInfo.students,
          id: classInfo.id,
        },
      ])
  }

  /** 보내는 사람 리스트에서 사람 삭제 */
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

  function deleteClassSender(key: number) {
    let classSenderList = classSender
    let newList = []
    let deleteSenderInfo = JSON.stringify(classSender[key])
    for (let i = 0; i < classSenderList.length; i++) {
      if (!(JSON.stringify(classSenderList[i]) === deleteSenderInfo)) {
        newList.push(classSenderList[i])
      }
    }
    setClassSender(newList)
  }

  return (
    <div>
      <div>Send Note</div>
      <div className="flex w-full justify-around">
        <button onClick={() => setPushType("individual")}>개별</button>
        <button
          onClick={async () => {
            setPushType("announcement")
            const classListResult = await pb
              .collection("classes")
              .getFullList({ filter: `owner.id="${pb?.authStore?.model?.id}"` })
            let updateList: ClassListType[] = []
            classListResult.map(data => {
              updateList.push({
                name: data.name,
                pac: data.pac,
                semister: data.semister,
                year: data.year,
                students: data.students,
                id: data.id,
              })
            })
            setClassList(updateList)
          }}
        >
          공지
        </button>
        <button onClick={() => setPushType("emergency")}>긴급</button>
      </div>
      {pushType === "individual" ? (
        <div>
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
                onClick={() => addSender(data)}
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
        </div>
      ) : (
        ""
      )}

      {pushType === "announcement" ? (
        <div>
          <div>공지</div>
          <div>
            {classList.map((data, key) => (
              <button
                onClick={() => addClass(data)}
                key={key}
                className="flex w-full justify-around"
              >
                <div>{data.name}</div>
                <div>{data.pac}</div>
                <div>{data.year}</div>
                <div>{data.students.length}</div>
              </button>
            ))}
          </div>
          <div>
            <div>List</div>
            {classSender.map((data, key) => (
              <div key={key} className="flex">
                <div>{data.name}</div>
                <button onClick={() => deleteClassSender(key)}>삭제</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit2(sendPush)}>
        <input {...register2("title", { required: true })} />
        <input {...register2("message", { required: true })} />
        <button type="submit">전송</button>
      </form>
    </div>
  )
}
