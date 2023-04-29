"use client"

import pb from "@/lib/pocketbase"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type ClassInfoType = {
  collectionId: string | undefined
  collectionName: string | undefined
  created: string | undefined
  expand: any | undefined
  id: string | undefined
  name: string | undefined
  owner: any | undefined
  pac: number | undefined
  semister: number | undefined
  students: any | undefined
  updated: string | undefined
  year: number | undefined
}

export default function ClassDetail() {
  const params = useParams()
  const [classInfo, setClassInfo] = useState<ClassInfoType>()

  async function deleteStudent(studentId: string) {
    let studentList = classInfo?.students
    let newStudentList: any[] = []

    for (let i = 0; i < studentList.length; i++) {
      if (studentList[i].id !== studentId) {
        newStudentList.push(studentList[i])
      }
    }
    let updateList: string[] = []
    if (newStudentList.length > 0) {
      newStudentList.map(data => {
        updateList.push(data.id)
      })
    }
    if (typeof params?.classId === "string") {
      const record = await pb
        .collection("classes")
        .update(params.classId, { students: updateList })
      setClassInfo({
        collectionId: classInfo?.collectionId,
        collectionName: classInfo?.collectionName,
        created: classInfo?.created,
        expand: classInfo?.expand,
        id: classInfo?.id,
        name: classInfo?.name,
        owner: classInfo?.owner,
        pac: classInfo?.pac,
        semister: classInfo?.semister,
        students: newStudentList,
        updated: classInfo?.updated,
        year: classInfo?.year,
      })
    }
  }

  useEffect(() => {
    async function getClassDetail() {
      if (typeof params?.classId === "string") {
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
    }
    getClassDetail()
  }, [])
  return (
    <div>
      <div>Class Detail</div>
      <div>{classInfo?.name}</div>
      <div>{classInfo?.pac}팩</div>
      <div>{classInfo?.owner?.name} 선생님</div>
      <div>학생</div>
      {classInfo?.students?.map((data: any, key: number) => (
        <div key={key} className="flex">
          <div>{data.name}</div>
          <button onClick={() => deleteStudent(data.id)}>삭제</button>
        </div>
      ))}
    </div>
  )
}
