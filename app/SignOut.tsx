"use client"

import pb from "@/lib/pocketbase"
import { authChaged } from "@/lib/recoil"
import { useRecoilState } from "recoil"

export default function SignOut() {
  const [auth, setAuth] = useRecoilState(authChaged)
  function signout() {
    setAuth(auth + 1)
    pb.authStore.clear()
  }

  return (
    <div>
      <button onClick={signout}>Sign Out</button>
    </div>
  )
}
