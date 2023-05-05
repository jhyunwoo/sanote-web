import SignOut from "./SignOut"
import ProtectedPage from "./components/ProtectedPage"

export default function Home() {
  return (
    <div>
      <ProtectedPage />
      <div>Home</div>
      <SignOut />
    </div>
  )
}
