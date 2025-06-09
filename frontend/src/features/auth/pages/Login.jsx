import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, FormField, Card, Logo } from '../../../components/ui';
import { useAuth } from '../../../hooks/useAuth.jsx';

// Validation schema for login form
const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

/**
 * Login Page Component
 * 
 * Provides a secure authentication interface for users to access the system.
 * Features form validation, password visibility toggle, and error handling.
 */
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  // Configure React Hook Form with validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo variant="dark" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your EduExtra dashboard
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-700 font-medium">
                    Authentication Failed
                  </p>
                </div>
                <p className="text-sm text-red-600 mt-1">
                  {error.message || 'Invalid email or password. Please try again.'}
                </p>
              </div>
            )}

            {/* Email Field */}
            <FormField>
              <Input
                {...register('email')}
                type="email"
                label="Email Address"
                placeholder="Enter your email"
                error={errors.email?.message}
                required
                autoComplete="email"
                autoFocus
              />
            </FormField>

            {/* Password Field */}
            <FormField>
              <div className="relative">
                <Input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password"
                  error={errors.password?.message}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </FormField>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center space-x-2"
              disabled={isSubmitting || loading}
              loading={isSubmitting || loading}
            >
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </Button>
          </form>
        </Card>

        {/* Demo Credentials (only for development) */}
        {import.meta.env.MODE === 'development' && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm font-medium text-amber-800 mb-2">
              Demo Credentials:
            </p>
            <div className="text-xs text-amber-700 space-y-1">
              <p><strong>Admin:</strong> admin@eduextra.com / admin123</p>
              <p><strong>Teacher:</strong> teacher@eduextra.com / teacher123</p>
              <p><strong>Student:</strong> student@eduextra.com / student123</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2025 EduExtra. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
