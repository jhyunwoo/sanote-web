"use client"

import pb from "@/lib/pocketbase"
import Link from "next/link"
import { useEffect, useState } from "react"

type ClassListType = any

export default function Teachers() {
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
    }
  }, [year, semister])

  return (
    <div>
      <div>Teacher Page</div>
      <Link href={"/teachers/create-class"}>Create Class</Link>
      <div className="flex justify-around w-full">
        <button onClick={() => setYear(date.getFullYear() - 1)}>
          {date.getFullYear() - 1}
        </button>
        <button onClick={() => setYear(date.getFullYear())}>
          {date.getFullYear()}
        </button>
        <button onClick={() => setYear(date.getFullYear() + 1)}>
          {date.getFullYear() + 1}
        </button>
      </div>
      <div>
        <button onClick={() => setSemister(1)}>1학기</button>
        <button onClick={() => setSemister(2)}>2학기</button>
      </div>
      <div>
        {classes.map((data, key) => (
          <div
            key={key}
            className="bg-slate-50 p-4 m-2 rounded-xl flex flex-col"
          >
            <div>
              {data.name} ({year} {semister}학기)
            </div>
            <div>{data.pac}팩</div>
            <div>{data?.students?.length}명</div>
          </div>
        ))}
      </div>
    </div>
  )
}
