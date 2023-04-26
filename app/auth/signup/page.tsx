"use client"
import pb from "@/lib/pocketbase"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  email: string
  password: string
  passwordConfirm: string
  name: string
  studentId: number
  year: number
  class: number
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const userInfo = {
      email: data.email,
      emailVisibility: true,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      name: data.name,
      studentId: Number(data.studentId),
      year: data.year,
      class: data.class,
      isTeacher: false,
    }
    const record = await pb.collection("users").create(userInfo)
    await pb.collection("users").requestVerification(data.email)
  }

  const onChangeYear = register("year", {
    required: { value: true, message: "학년을 선택하세요." },
  }).onChange
  const onChangeClass = register("class", {
    required: { value: true, message: "반을 입력하세요." },
  }).onChange

  return (
    <div>
      <div>Sign Up</div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>email</div>
          <input
            type="email"
            {...register("email", {
              required: { value: true, message: "이메일을 입력하세요." },
            })}
          />
          {errors?.email ? <p>{errors?.email?.message}</p> : ""}
          <div>password</div>
          <input
            type="password"
            {...register("password", {
              required: { value: true, message: "비밀번호를 입력하세요." },
              minLength: { value: 8, message: "비밀번호는 8자리 이상입니다." },
            })}
          />
          {errors?.password ? <p>{errors?.password?.message}</p> : ""}
          <div>password confirm</div>
          <input
            type="password"
            {...register("passwordConfirm", {
              required: { value: true, message: "비밀번호를 입력하세요." },
              minLength: { value: 8, message: "비밀번호는 8자리 이상입니다." },
            })}
          />
          {errors?.passwordConfirm ? (
            <p>{errors?.passwordConfirm?.message}</p>
          ) : (
            ""
          )}
          <div>name</div>
          <input
            {...register("name", {
              required: { value: true, message: "이름을 입력하세요." },
            })}
          />
          {errors?.name ? <p>{errors?.name?.message}</p> : ""}
          <div>student Id</div>
          <input
            type="number"
            {...register("studentId", {
              required: { value: true, message: "학번을 입력하세요." },
              min: { value: 210101, message: "올바른 학번을 입력하세요." },
              max: { value: 999999, message: "올바른 학번을 입력하세요." },
            })}
          />
          {errors?.studentId ? <p>{errors?.studentId?.message}</p> : ""}
          <div>year</div>
          <div>
            <button type="button" onClick={() => setValue("year", 1)}>
              1학년
            </button>
            <button type="button" onClick={() => setValue("year", 2)}>
              2학년
            </button>
            <button type="button" onClick={() => setValue("year", 3)}>
              3학년
            </button>
          </div>
          {errors?.year ? <p>{errors?.year?.message}</p> : ""}
          <div>class</div>
          <div>
            <button type="button" onClick={() => setValue("class", 1)}>
              1반
            </button>
            <button type="button" onClick={() => setValue("class", 2)}>
              2반
            </button>
            <button type="button" onClick={() => setValue("class", 3)}>
              3반
            </button>
            <button type="button" onClick={() => setValue("class", 4)}>
              4반
            </button>
            <button type="button" onClick={() => setValue("class", 5)}>
              5반
            </button>
            <button type="button" onClick={() => setValue("class", 6)}>
              6반
            </button>
            <button type="button" onClick={() => setValue("class", 7)}>
              7반
            </button>
            <button type="button" onClick={() => setValue("class", 8)}>
              8반
            </button>
            <button type="button" onClick={() => setValue("class", 9)}>
              9반
            </button>
            <button type="button" onClick={() => setValue("class", 10)}>
              10반
            </button>
            <button type="button" onClick={() => setValue("class", 11)}>
              11반
            </button>
            <button type="button" onClick={() => setValue("class", 12)}>
              12반
            </button>
          </div>
          {errors?.class ? <p>{errors?.class?.message}</p> : ""}
          <button className="bg-red-300 p-4 m-4" type="submit">
            제출
          </button>
        </form>
      </div>
    </div>
  )
}
