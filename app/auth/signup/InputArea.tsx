"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation"

type Inputs = {
  email: string
  password: string
  passwordConfirm: string
  name: string
  studentId: number
  year: number
  class: number
}

export default function SignUpInputArea() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    if (data.password === data.passwordConfirm) {
      const userData = {
        email: data.email,
        emailVisibility: true,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
        name: data.name,
        type: "student",
        studentId: Number(data.studentId),
        year: Number(data.year),
        class: Number(data.class),
      }
      const record = await pb.collection("users").create(userData)
      if (record?.id) {
        await pb.collection("users").requestVerification(data.email)
        router.replace("/")
      } else {
        console.log("error")
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.")
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div>email</div>
        <input
          type="email"
          {...register("email", {
            required: { value: true, message: "이메일을 입력해주세요" },
          })}
        />
        <div>password</div>
        <input
          type="password"
          {...register("password", {
            required: { value: true, message: "비밀번호를 입력해주세요." },
            minLength: {
              value: 8,
              message: "비밀번호는 8자리 이상으로 설정해야합니다.",
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <div>Password Confirm</div>
        <input
          type="password"
          {...register("passwordConfirm", {
            required: { value: true, message: "비밀번호를 입력해주세요." },
            minLength: {
              value: 8,
              message: "비밀번호는 8자리 이상으로 설정해야합니다.",
            },
          })}
        />
        {errors.passwordConfirm && (
          <span>{errors.passwordConfirm.message}</span>
        )}
        <div>Name</div>
        <input
          {...register("name", {
            required: { value: true, message: "이름을 입력해주세요." },
          })}
        />
        {errors.name && <span>{errors.name.message}</span>}

        <div>Student Id</div>
        <input
          type="number"
          {...register("studentId", {
            required: { value: true, message: "학번을 입력해주세요." },
          })}
        />
        {errors.studentId && <span>{errors.studentId.message}</span>}

        <select {...register("year")}>
          <option value={1}>1학년</option>
          <option value={2}>2학년</option>
          <option value={3}>3학년</option>
        </select>

        <select {...register("class")}>
          <option value={1}>1반</option>
          <option value={2}>2반</option>
          <option value={3}>3반</option>
          <option value={4}>4반</option>
          <option value={5}>5반</option>
          <option value={6}>6반</option>
          <option value={7}>7반</option>
          <option value={8}>8반</option>
          <option value={9}>9반</option>
          <option value={10}>10반</option>
          <option value={11}>11반</option>
          <option value={12}>12반</option>
        </select>

        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}
