"use client"
import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  name: string
  year: number
  semester: number
  pac: number
}

export default function CreateClass() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()
  const router = useRouter()

  const onChangeYear = register("semester", {
    required: { value: true, message: "학기를 선택하세요." },
  }).onChange

  async function onSubmit(data: Inputs) {
    const classData = {
      name: data.name,
      pac: Number(data.pac),
      year: Number(data.year),
      semister: Number(data.semester),
      owner: pb.authStore.model?.id,
    }

    await pb.collection("classes").create(classData)
    router.replace("/teachers")
  }

  return (
    <div>
      <div>Create Class</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>수업명</div>
          <input
            {...register("name", {
              required: { value: true, message: "수업 이름을 작성해주세요." },
            })}
          />
          <div>PAC</div>
          <input
            type="number"
            {...register("pac", {
              required: { value: true, message: "팩을 입력하세요." },
              min: { value: 1, message: "올바른 팩을 입력하세요." },
            })}
          />
          <div>개설 연도</div>
          <input
            type="number"
            {...register("year", {
              required: {
                value: true,
                message: "수업 개설 연도를 입력해주세요.",
              },
              min: { value: 2023, message: "올바른 연도를 입력해주세요." },
              max: { value: 2050, message: "올바른 연도를 입력해주세요." },
            })}
          />
          <div>학기</div>
          <div>
            <button type="button" onClick={() => setValue("semester", 1)}>
              1학기
            </button>
            <button type="button" onClick={() => setValue("semester", 2)}>
              2학기
            </button>
          </div>
          <button type="submit">제출</button>
        </form>
      </div>
    </div>
  )
}
