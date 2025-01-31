import MyAccount from '@/views/my-account'

import { DefaultHeader } from '@/widgets/default-header'
import { Sidebar } from '@/widgets/sidebar'

export default function MyAccountPage() {
  return (
    <>
      <DefaultHeader />
      <div className="flex h-screen pt-14">
        <Sidebar />
        <main className="ml-[240px] flex-1 pr-5 pt-3 lg:ml-[280px] lg:px-12">
          <MyAccount />
        </main>
      </div>
    </>
  )
}
