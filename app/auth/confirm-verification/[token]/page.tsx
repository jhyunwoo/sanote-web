"use client"

import pb from "@/lib/pocketbase"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

export default function ConfirmVerification() {
  const params = useParams()
  const router = useRouter()

  async function verification() {
    await pb.collection("users").confirmVerification(params.token)
    router.push("/")
  }

  return (
    <div>
      <div>Confirm Verification</div>
      <div>
        <button
          className="p-4 m-4 rounded-xl bg-orange-400 text-white font-bold"
          onClick={verification}
        >
          이메일 인증
        </button>
      </div>
    </div>
  )
}
