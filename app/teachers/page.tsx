"use client"

import pb from "@/lib/pocketbase"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Teachers() {
  const date = new Date()
  const [year, setYear] = useState<Number>()
  const [semester, setSemester] = useState<Number>()

  function checkSemester(month: number) {
    if (month <= 7) {
      return 1
    } else {
      return 2
    }
  }

  useEffect(() => {
    async function getClassList() {
      const records = await pb.collection("classes").getFullList({
        filter: `year=${date.getFullYear()}`,
      })
      console.log(records)
    }
    getClassList()
  }, [])

  return (
    <div>
      <div>Teacher Page</div>
      <Link href={"/teachers/create-class"}>Create Class</Link>
      <div className="flex flex-col">
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
        <button onClick={() => setSemester(1)}>1학기</button>
        <button onClick={() => setSemester(2)}>2학기</button>
      </div>
      <div></div>
    </div>
  )
}
