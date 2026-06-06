import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/features/auth/AuthContext'
import ProtectedRoute from '@/features/auth/ProtectedRoute'

// Layouts
import PublicLayout from '@/components/layout/PublicLayout'
import AdminLayout from '@/components/layout/AdminLayout'

// Public pages
import Landing from '@/pages/Landing'
import Courses from '@/pages/Courses'
import CourseDetail from '@/pages/CourseDetail'
import Apply from '@/pages/Apply'
import NotFound from '@/pages/NotFound'

// Admin pages
import Login from '@/pages/admin/Login'
import Dashboard from '@/pages/admin/Dashboard'
import CoursesList from '@/pages/admin/CoursesList'
import TeachersList from '@/pages/admin/TeachersList'
import LeadsList from '@/pages/admin/LeadsList'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/apply" element={<Apply />} />
          </Route>

          {/* Admin auth */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin protected */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<CoursesList />} />
            <Route path="teachers" element={<TeachersList />} />
            <Route path="leads" element={<LeadsList />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
