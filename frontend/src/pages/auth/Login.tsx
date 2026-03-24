/**
 * Login page
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts';
import { Button, Input, Card } from '../../components/common';
import { useAuth } from '../../hooks';
import { STRINGS } from '../../constants';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    // Basic validation
    const errors: Record<string, string> = {};
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setValidationErrors({ submit: 'Invalid email or password' });
    }
  };

  return (
    <AuthLayout>
      <Card className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
          {STRINGS.AUTH.LOGIN_TITLE}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="email"
            type="email"
            label={STRINGS.LABELS.EMAIL}
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={validationErrors.email}
            disabled={isLoading}
          />

          <Input
            name="password"
            type="password"
            label={STRINGS.LABELS.PASSWORD}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={validationErrors.password}
            disabled={isLoading}
          />

          {(validationErrors.submit || error) && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {validationErrors.submit || error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-6"
          >
            {STRINGS.BUTTON.SIGN_IN}
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Sign up
          </button>
        </p>
      </Card>
    </AuthLayout>
  );
};
