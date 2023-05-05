import { atom } from "recoil"

type AuthChangedType = number

export const authChaged = atom<AuthChangedType>({
  key: "authChaged",
  default: 0,
})
