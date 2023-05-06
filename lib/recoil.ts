import { atom } from "recoil"

type UserInfoType = {
  id: string | null
  username: string | null
  email: string | null
  name: string | null
  avatar: string | null
  type: string | null
  studentId: number | null
  year: number | null
  class: number | null
  department: string | null
  valid: boolean | null
}

export const userInfo = atom<UserInfoType>({
  key: "userInfo",
  default: {
    id: null,
    username: null,
    email: null,
    name: null,
    avatar: null,
    type: null,
    studentId: null,
    year: null,
    class: null,
    department: null,
    valid: null,
  },
})
