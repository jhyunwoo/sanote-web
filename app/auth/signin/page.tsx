"use client"
import pb from "@/lib/pocketbase"
import { useForm, SubmitHandler } from "react-hook-form"
import { userInfo } from "@/lib/recoil"
import { useRecoilState } from "recoil"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

type Inputs = {
  email: string
  password: string
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [user, setUser] = useRecoilState(userInfo)
  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const authData = await pb
      .collection("users")
      .authWithPassword(data.email, data.password)
    console.log(authData?.record)
    setUser({
      avatar: authData?.record?.avatar,
      class: authData?.record?.class,
      collectionId: authData?.record?.collectionId,
      collectionName: authData?.record?.collectionName,
      created: authData?.record?.created,
      email: authData?.record?.email,
      emailVisibility: authData?.record?.emailVisibility,
      id: authData?.record?.id,
      isTeacher: authData?.record?.isTeacher,
      name: authData?.record?.name,
      studentId: authData?.record?.studentId,
      updated: authData?.record?.updated,
      username: authData?.record?.username,
      verified: authData?.record?.verified,
      year: authData?.record?.year,
    })
    router.replace("/")
  }

  useEffect(() => {
    if (pb.authStore.model?.id) {
      router.replace("/")
    }
  }, [])

  return (
    <div>
      <div>Sign In</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register("email", {
              required: { value: true, message: "이메일을 입력하세요." },
            })}
          />
          {errors?.email ? <p>{errors?.email?.message}</p> : ""}

          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "비밀번호를 입력하세요." },
            })}
          />
          {errors?.password ? <p>{errors?.password?.message}</p> : ""}
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  )
}
