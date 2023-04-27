"use client"

import pb from "@/lib/pocketbase"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type ClassInfoType = {
  collectionId: string
  collectionName: string
  created: string
  expand: any
  id: string
  name: string
  owner: any
  pac: number
  semister: number
  students: any
  updated: string
  year: number
}

export default function ClassDetail() {
  const params = useParams()
  const [classInfo, setClassInfo] = useState<ClassInfoType>()

  async function deleteStudent(studentId: string) {
    let studentList = classInfo?.students
    let newStudentList: any[] = []
    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].id !== studentId) {
        newStudentList.push()
      }
    }
    console.log(newStudentList)
    const record = await pb
      .collection("classes")
      .update(params.classId, { students: newStudentList })
    console.log(record)
  }

  useEffect(() => {
    async function getClassDetail() {
      const record = await pb.collection("classes").getOne(params.classId, {
        expand: "students,owner",
      })
      console.log(record)
      setClassInfo({
        collectionId: record.collectionId,
        collectionName: record.collectionName,
        created: record.created,
        expand: record.expand,
        id: record.id,
        name: record.name,
        owner: record.expand.owner,
        pac: record.pac,
        semister: record.semister,
        students: record?.expand?.students,
        updated: record.updated,
        year: record.year,
      })
    }
    getClassDetail()
  }, [])
  return (
    <div>
      <div>Class Detail</div>
      <div>{classInfo?.name}</div>
      <div>{classInfo?.pac}</div>
      <div>{classInfo?.owner?.name}</div>
      <div>학생</div>
      {classInfo?.students?.map((data: any, key: number) => (
        <div key={key}>
          <div>{data.name}</div>
          <button onClick={() => deleteStudent(data.id)}>삭제</button>
        </div>
      ))}
    </div>
  )
}
