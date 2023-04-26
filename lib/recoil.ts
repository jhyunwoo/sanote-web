import { atom } from "recoil"

export interface UserInfoTypes {
  avatar: string | null
  class: number | null
  collectionId: string | null
  collectionName: string | null
  created: string | null
  email: string | null
  emailVisibility: boolean | null
  id: string | null
  isTeacher: boolean | null
  name: string | null
  studentId: number | null
  updated: string | null
  username: string | null
  year: number | null
  verified: boolean | null
}

export const userInfo = atom<UserInfoTypes>({
  key: "userInfo",
  default: {
    avatar: null,
    class: null,
    collectionId: null,
    collectionName: null,
    created: null,
    email: null,
    emailVisibility: null,
    id: null,
    isTeacher: null,
    name: null,
    studentId: null,
    updated: null,
    username: null,
    verified: null,
    year: null,
  },
})
