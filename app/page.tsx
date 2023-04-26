"use client"

import ProtectedPage from "./ProtectedPage"
import pb from "@/lib/pocketbase"
import { useResetRecoilState } from "recoil"
import { userInfo } from "@/lib/recoil"

export default function Home() {
  const resetUserInfo = useResetRecoilState(userInfo)

  function userSignOut() {
    pb.authStore.clear()
    resetUserInfo()
  }

  return (
    <div>
      <ProtectedPage />
      <div>Sanote Home</div>
      <div>
        <button onClick={userSignOut}>Sign Out</button>
      </div>
    </div>
  )
}
