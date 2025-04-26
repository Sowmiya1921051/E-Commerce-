'use  client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Lock, User, ShoppingBag } from 'lucide-react'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError('')
    
    try {
      // Mock login - would connect to API in production
      if (data.email === 'admin@example.com' && data.password === 'password') {
        // Mock JWT creation - would be done by server in production
        const mockToken = 'mock-jwt-token'
        document.cookie = `auth=${mockToken}; path=/; max-age=86400`
        router.push('/dashboard')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <ShoppingBag className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-2xl font-bold">ProductHub</h1>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="input pl-10"
                  placeholder="admin@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className="input pl-10"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">Password is required</p>
              )}
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Demo credentials: admin@example.com / password</p>
          </div>
        </div>
      </div>
      
      <div className="hidden md:block md:w-1/2 relative">
        <Image
          src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlLWNvbW1lcmNlJTIwYWRtaW4lMjBkYXNoYm9hcmQlMjB1aXxlbnwwfHx8fDE3NDU2NDYyODN8MA&ixlib=rb-4.0.3"
          alt="Dashboard background"
          fill
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-primary/30 flex flex-col items-center justify-center text-white p-12">
          <h2 className="text-3xl font-bold mb-4">Product Management Dashboard</h2>
          <p className="text-lg text-center max-w-md">
            Manage your product inventory, categories, and more with our powerful dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
 