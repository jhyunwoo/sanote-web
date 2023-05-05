"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import pb from "@/lib/pocketbase"
import { useRouter } from "next/navigation"
import { useRecoilState } from "recoil"
import { authChaged } from "@/lib/recoil"

type Inputs = {
  email: string
  password: string
}

export default function SignInInputArea() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const router = useRouter()
  const [auth, setAuth]=useRecoilState(authChaged)

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const authData = await pb
      .collection("users")
      .authWithPassword(data.email, data.password)
    if (authData?.token) {
      setAuth(auth+1)
      router.replace("/")
    } else {
      alert("login error")
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
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit">로그인</button>
      </form>
    </div>
  )
}
