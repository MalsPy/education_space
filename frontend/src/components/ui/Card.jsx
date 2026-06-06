import clsx from 'clsx'

export default function Card({ children, className, hover, ...props }) {
  return (
    <div
      className={clsx(
        'card p-6',
        hover && 'transition-all duration-200 hover:border-primary/30 hover:shadow-glow-sm cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
