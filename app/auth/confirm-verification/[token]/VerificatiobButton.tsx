"use client"
import pb from "@/lib/pocketbase"
import { useParams } from "next/navigation"

export default function VerificationButton() {
  const params = useParams()
  async function verification() {
    if (params?.token && typeof params.token === "string") {
      await pb.collection("users").confirmVerification(params.token)
    }
  }
  return (
    <div>
      <button onClick={verification}>verification</button>
    </div>
  )
}
