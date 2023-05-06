"use client"

import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation"
import { useForm, SubmitHandler } from "react-hook-form"
import { useSetRecoilState } from "recoil"
import { userInfo } from "@/lib/recoil"

type Inputs = {
  email: string
  password: string
}

export default function SignInInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const router = useRouter()
  const setUser = useSetRecoilState(userInfo)

  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data)
    const authData = await pb
      .collection("users")
      .authWithPassword(data.email, data.password)
    if (authData.token) {
      setUser({
        id: authData.record.id,
        username: authData.record.username,
        email: authData.record.email,
        name: authData.record.name,
        avatar: authData.record.avatar,
        type: authData.record.type,
        studentId: authData.record.studentId,
        year: authData.record.year,
        class: authData.record.class,
        department: authData.record.department,
        valid: authData.record.valid,
      })
      router.replace("/teachers")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>이메일</div>
        <input
          type="email"
          {...register("email", {
            required: { value: true, message: "이메일을 입력해주세요." },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <div>비밀번호</div>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "비밀번호를 입력해주세요." },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}
