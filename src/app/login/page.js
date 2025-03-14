'use client'
import { signIn, useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { IconBrandGoogle } from '@tabler/icons-react'
import { useEffect } from 'react'
import {  useRouter } from 'next/navigation'

export default function LoginPage() {

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Welcome to Bitotsav
          </h1>
          <p className="text-gray-400 mt-2">Sign in to continue to Bitotsav</p>
        </div>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
        >
          <span className="text-purple-400">BIT Mesra Students:</span>{' '}
          <span className="text-gray-300">Get free access with your @bitmesra.ac.in email!</span>
        </motion.p>
        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm text-white py-4 px-6 rounded-2xl hover:bg-white/20 transition-all duration-200 border border-white/10"
        >
          <IconBrandGoogle size="1.5rem" />
          <span>Continue with Google</span>
        </motion.button>

        {/* Additional Info */}
        <p className="text-center text-sm text-gray-500 mt-8">
          By continuing, you agree to our{' '}
          <a href="/terms" className="text-purple-400 hover:text-purple-300">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-purple-400 hover:text-purple-300">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  )
}