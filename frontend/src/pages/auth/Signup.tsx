/**
 * Signup page
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts';
import { Button, Input, Card } from '../../components/common';
import { useAuth } from '../../hooks';
import { STRINGS } from '../../constants';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    // Validation
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setValidationErrors({ submit: 'Signup failed. Email may already exist.' });
    }
  };

  return (
    <AuthLayout>
      <Card className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-900">
          {STRINGS.AUTH.SIGNUP_TITLE}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Create your account to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            type="text"
            label={STRINGS.LABELS.NAME}
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            error={validationErrors.name}
            disabled={isLoading}
          />

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            error={validationErrors.password}
            disabled={isLoading}
            helperText="At least 6 characters"
          />

          <Input
            name="confirmPassword"
            type="password"
            label={STRINGS.LABELS.CONFIRM_PASSWORD}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={validationErrors.confirmPassword}
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
            {STRINGS.BUTTON.SIGN_UP}
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Sign in
          </button>
        </p>
      </Card>
    </AuthLayout>
  );
};
