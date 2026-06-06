import clsx from 'clsx'
import Spinner from './Spinner'

const variants = {
  primary: 'bg-primary hover:bg-primary-hover text-white shadow-glow-sm hover:shadow-glow',
  secondary: 'bg-surface-2 hover:bg-border text-text border border-border',
  ghost: 'hover:bg-surface-2 text-muted hover:text-text',
  danger: 'bg-danger/10 hover:bg-danger/20 text-danger border border-danger/20',
}
const sizes = {
  sm: 'h-8 px-3 text-xs rounded-lg',
  md: 'h-10 px-5 text-sm rounded-xl',
  lg: 'h-12 px-7 text-base rounded-xl',
}

export default function Button({
  children, variant = 'primary', size = 'md',
  loading, disabled, className, ...props
}) {
  return (
    <button
      className={clsx('btn', variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  )
}
