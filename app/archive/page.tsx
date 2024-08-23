import { Sidebar } from '@/widgets'
import { Header } from '@/widgets/Header'

export default function Page() {
  return (
    <>
      <Header />
      <div className="flex pt-14 h-screen">
        <Sidebar />
        <main className="p-12 ml-[280px] flex-1 flex">archive page</main>
      </div>
    </>
  )
}
