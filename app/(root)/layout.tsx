import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from 'sonner'
// import { Toaster } from '@/components/ui/toaster'


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />

      <div className="root-container">
        <div className="wrapper">
          {children}
          <Toaster />
        </div>
      </div>
      
      {/* <Toaster /> */}
    </main>
  )
}

export default Layout