import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-bg bg-noise">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <footer className="border-t border-border mt-24 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">© 2025 EducationSpace. All rights reserved.</p>
          <a href="/admin/login" className="text-muted/50 text-xs hover:text-muted transition-colors">Admin</a>
        </div>
      </footer>
    </div>
  )
}
