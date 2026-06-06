import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Shield, Globe, ChevronRight, BookOpen, Users, Award } from 'lucide-react'
import { courseService } from '@/services/courseService'
import CourseCard from '@/features/courses/CourseCard'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
})

const features = [
  { icon: Zap, title: 'Fast-Track Learning', desc: 'Structured programs designed to get you job-ready in weeks, not years.' },
  { icon: Shield, title: 'Expert Instructors', desc: 'Learn directly from industry veterans with real-world experience.' },
  { icon: Globe, title: 'Learn Anywhere', desc: 'Fully online, self-paced courses accessible on any device, anytime.' },
]

const stats = [
  { icon: BookOpen, value: '50+', label: 'Courses' },
  { icon: Users, value: '12K+', label: 'Students' },
  { icon: Award, value: '98%', label: 'Satisfaction' },
]

export default function Landing() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    courseService.list({ active_only: true, size: 3 })
      .then((d) => setCourses(d.items || []))
      .catch(() => {})
  }, [])

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-24">
        {/* bg glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-800/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp(0.1)} className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 rounded-full px-4 py-1.5 text-primary text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse2" />
            Enrollments Open — 2025 Cohort
          </motion.div>

          <motion.h1 {...fadeUp(0.2)} className="font-display text-5xl md:text-7xl font-bold text-text leading-[1.05] tracking-tight mb-6">
            Build Skills That{' '}
            <span className="text-gradient">Actually</span>{' '}
            Matter
          </motion.h1>

          <motion.p {...fadeUp(0.3)} className="text-muted text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto mb-10">
            Industry-aligned courses crafted with top professionals. Learn at your pace, land your dream role.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="btn bg-primary hover:bg-primary-hover text-white h-12 px-8 text-base shadow-glow hover:shadow-glow">
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/apply" className="btn bg-surface-2 hover:bg-border text-text border border-border h-12 px-8 text-base">
              Apply Now <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.5)} className="flex items-center justify-center gap-10 mt-16 pt-10 border-t border-border/50">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display text-3xl font-bold text-text">{value}</p>
                <p className="text-muted text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div {...fadeUp()} className="text-center mb-16">
          <h2 className="section-title mb-4">Why EducationSpace?</h2>
          <p className="text-muted text-lg max-w-xl mx-auto">Everything you need to go from zero to career-ready, fast.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={title} {...fadeUp(i * 0.1)}
              className="card p-8 hover:border-primary/30 hover:shadow-glow-sm transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-text mb-2">{title}</h3>
              <p className="text-muted leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured courses */}
      {courses.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border/30">
          <motion.div {...fadeUp()} className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title mb-2">Featured Courses</h2>
              <p className="text-muted">Start learning today with our most popular programs.</p>
            </div>
            <Link to="/courses" className="hidden md:flex items-center gap-2 text-primary hover:text-primary-hover text-sm font-medium transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <motion.div key={c.id} {...fadeUp(i * 0.1)}>
                <CourseCard course={c} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div {...fadeUp()} className="relative card p-12 md:p-16 text-center overflow-hidden glow-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <h2 className="section-title mb-4 relative">Ready to Start?</h2>
          <p className="text-muted text-lg mb-8 max-w-lg mx-auto relative">
            Join thousands of students who transformed their careers with EducationSpace.
          </p>
          <Link to="/apply" className="btn bg-primary hover:bg-primary-hover text-white h-12 px-10 text-base shadow-glow relative">
            Apply for Free <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
