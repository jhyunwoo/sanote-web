"use client"

import pb from "@/lib/pocketbase"
import { useParams } from "next/navigation"
import { userInfo } from "@/lib/recoil"
import { useRecoilValue } from "recoil"
import Link from "next/link"

export default function ConfirmVerification() {
  const params = useParams()
  const user = useRecoilValue(userInfo)

  async function verification() {
    if(params){
      await pb.collection("users").confirmVerification(params.token[0])
    }
  }

  return (
    <div>
      {user.verified ? (
        <div>
          <div>Sanote 이메일 인증</div>
          <div>
            <button
              className="p-4 m-4 rounded-xl bg-orange-400 text-white font-bold"
              onClick={verification}
            >
              인증
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div>이메일 인증 완료</div>
          <Link href={"/"}>Home</Link>
        </div>
      )}
    </div>
  )
}
