"use client"

import pb from "@/lib/pocketbase"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useResetRecoilState } from "recoil"
import { userInfo } from "@/lib/recoil"

type ClassListType = any

export default function Teachers() {
  const resetUserInfo = useResetRecoilState(userInfo)
  const date = new Date()
  const [year, setYear] = useState<Number>()
  const [semister, setSemister] = useState<Number>()
  const [classes, setClasses] = useState<ClassListType[]>([])

  function checkSemister(month: number) {
    if (month <= 7) {
      return 1
    } else {
      return 2
    }
  }

  function userSignOut() {
    pb.authStore.clear()
    resetUserInfo()
  }

  useEffect(() => {
    async function getClassList() {
      setYear(date.getFullYear())
      setSemister(checkSemister(date.getMonth()))
      const records = await pb.collection("classes").getFullList({
        filter: `year=${date.getFullYear()}&&semister=${checkSemister(
          date.getMonth(),
        )}`,
      })
      setClasses(records)
    }
    getClassList()
  }, [])

  useEffect(() => {
    async function getClassList(filter: string) {
      const records = await pb.collection("classes").getFullList({
        filter: filter,
      })
      setClasses(records)
    }
    if (year && !semister) {
      getClassList(`year=${year}`)
    } else if (!year && semister) {
      getClassList(`semister=${semister}`)
    } else if (year && semister) {
      getClassList(`year=${year}&&semister=${semister}`)
    } else if (!year && !semister) {
      getClassList(
        `year=${date.getFullYear()}&&semister=${checkSemister(
          date.getMonth(),
        )}`,
      )
    }
  }, [year, semister])

  return (
    <div>
      <div>Teacher Page</div>
      <div className="flex w-full">
        <Link
          href={"/teachers/create-class"}
          className={"p-4 m-2 rounded-lg bg-yellow-400 text-white"}
        >
          Create Class
        </Link>
        <Link href={"/teachers/send-note"}>Send Note</Link>
        <button onClick={userSignOut}>Sign Out</button>
      </div>
      <div className="flex justify-around w-full">
        <button
          className={`p-2  text-white text-center rounded-lg px-4 ${
            year === date.getFullYear() - 1 ? "bg-orange-700" : "bg-orange-500"
          }`}
          onClick={() => setYear(date.getFullYear() - 1)}
        >
          {date.getFullYear() - 1}
        </button>
        <button
          className={`p-2  text-white text-center rounded-lg px-4 ${
            year === date.getFullYear() ? "bg-orange-700" : "bg-orange-500"
          }`}
          onClick={() => setYear(date.getFullYear())}
        >
          {date.getFullYear()}
        </button>
        <button
          className={`p-2  text-white text-center rounded-lg px-4 ${
            year === date.getFullYear() + 1 ? "bg-orange-700" : "bg-orange-500"
          }`}
          onClick={() => setYear(date.getFullYear() + 1)}
        >
          {date.getFullYear() + 1}
        </button>
      </div>
      <div className="flex justify-around m-4">
        <button
          className={`p-2 px-4 rounded-lg text-white ${
            semister === 1 ? "bg-orange-700" : "bg-orange-500"
          }`}
          onClick={() => setSemister(1)}
        >
          1학기
        </button>
        <button
          className={`p-2 px-4 rounded-lg text-white ${
            semister === 2 ? "bg-orange-700" : "bg-orange-500"
          }`}
          onClick={() => setSemister(2)}
        >
          2학기
        </button>
      </div>
      <div>
        {classes.map((data, key) => (
          <Link key={key} href={`/teachers/class/${data.id}`}>
            <div className="bg-slate-50 p-4 m-2 rounded-xl flex flex-col">
              <div>
                {data.name} ({data.year} {data.semister}학기)
              </div>
              <div>{data.pac}팩</div>
              <div>{data?.students?.length}명</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
