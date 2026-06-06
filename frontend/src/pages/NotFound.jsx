import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      <p className="font-display text-8xl font-bold text-primary/20 mb-4">404</p>
      <h1 className="font-display text-3xl font-bold text-text mb-3">Page Not Found</h1>
      <p className="text-muted mb-8">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn bg-primary hover:bg-primary-hover text-white h-10 px-6 text-sm">
        Go Home
      </Link>
    </div>
  )
}
