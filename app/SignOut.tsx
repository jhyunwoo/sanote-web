"use client"

import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"
import { useSetRecoilState } from "recoil"

export default function SignOut() {
  const setUser = useSetRecoilState(userInfo)
  function signout() {
    setUser({
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
    })
    pb.authStore.clear()
  }

  return (
    <div>
      <button onClick={signout}>Sign Out</button>
    </div>
  )
}
