"use client"

import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  year: number
  semester: number
}

import Link from "next/link"

export default function Teachers() {
  const year = new Date().getFullYear()
  return (
    <div>
      <div>Teacher Page</div>
      <Link href={"/teachers/create-class"}>Create Class</Link>
      <div className="flex flex-col">
        <button>{year - 2}</button>
        <button>{year - 1}</button>
        <button>{year}</button>
        <button>{year + 1}</button>
        <button>{year + 2}</button>
      </div>
    </div>
  )
}
