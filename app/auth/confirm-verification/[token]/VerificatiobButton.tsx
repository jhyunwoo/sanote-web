"use client"
import pb from "@/lib/pocketbase"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useRecoilState } from "recoil"
import { userInfo } from "@/lib/recoil"

export default function VerificationButton() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useRecoilState(userInfo)
  async function verification() {
    if (params?.token && typeof params.token === "string") {
      const result = await pb
        .collection("users")
        .confirmVerification(params.token)

      if (result) {
        if (user.type === "teacher") {
          router.replace("/teachers")
        } else {
          router.replace("/")
        }
        setUser({
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          type: user.type,
          studentId: user.studentId,
          year: user.year,
          class: user.class,
          department: user.department,
          valid: result,
        })
      }
    }
  }
  return (
    <div>
      <button onClick={verification}>verification</button>
    </div>
  )
}
