import ProtectTeacherPage from "../components/ProtectTeacherPage"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectTeacherPage>{children}</ProtectTeacherPage>
}
