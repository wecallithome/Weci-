'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react'

interface ToastProps {
  message?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToastState {
  show: boolean
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  id: string
}

// Global toast state management (simplified for this demo)
let toastQueue: ToastState[] = []
const toastListeners: ((toasts: ToastState[]) => void)[] = []

export const toast = {
  success: (message: string, duration = 5000) => {
    addToast({ message, type: 'success', duration })
  },
  error: (message: string, duration = 5000) => {
    addToast({ message, type: 'error', duration })
  },
  warning: (message: string, duration = 5000) => {
    addToast({ message, type: 'warning', duration })
  },
  info: (message: string, duration = 5000) => {
    addToast({ message, type: 'info', duration })
  }
}

function addToast({ message, type, duration }: { message: string, type: ToastState['type'], duration: number }) {
  const id = Math.random().toString(36).substr(2, 9)
  const newToast: ToastState = {
    show: true,
    message,
    type,
    id
  }
  
  toastQueue.push(newToast)
  notifyListeners()
  
  setTimeout(() => {
    removeToast(id)
  }, duration)
}

function removeToast(id: string) {
  toastQueue = toastQueue.filter(toast => toast.id !== id)
  notifyListeners()
}

function notifyListeners() {
  toastListeners.forEach(listener => listener([...toastQueue]))
}

export function Toast() {
  const [toasts, setToasts] = useState<ToastState[]>([])
  
  useEffect(() => {
    const listener = (newToasts: ToastState[]) => {
      setToasts(newToasts)
    }
    
    toastListeners.push(listener)
    
    return () => {
      const index = toastListeners.indexOf(listener)
      if (index > -1) {
        toastListeners.splice(index, 1)
      }
    }
  }, [])
  
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({ toast, onClose }: { toast: ToastState, onClose: () => void }) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertCircle,
    info: Info
  }
  
  const colors = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }
  
  const iconColors = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  }
  
  const Icon = icons[toast.type]
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`
        max-w-sm w-full p-4 rounded-lg border shadow-lg backdrop-blur-sm
        ${colors[toast.type]}
      `}
    >
      <div className="flex items-start">
        <Icon className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${iconColors[toast.type]}`} />
        <p className="text-sm font-medium flex-1">{toast.message}</p>
        <button
          onClick={onClose}
          className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  )
}