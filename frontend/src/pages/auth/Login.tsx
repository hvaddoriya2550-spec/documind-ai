/**
 * Login page
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts';
import { Button, Input, Card } from '../../components/common';
import { useAuth } from '../../hooks';
import { STRINGS } from '../../constants';
import { LOGIN_STYLES } from '../../styles/loginStyles';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [linkHover, setLinkHover] = useState(false);

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
      <Card style={LOGIN_STYLES.cardStyles()}>
        <h1 style={LOGIN_STYLES.titleStyles()}>
          {STRINGS.AUTH.LOGIN_TITLE}
        </h1>
        <p style={LOGIN_STYLES.subtitleStyles()}>
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} style={LOGIN_STYLES.formContainerStyles()}>
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
            <div style={LOGIN_STYLES.errorBoxStyles()}>
              {validationErrors.submit || error}
            </div>
          )}

          <div style={LOGIN_STYLES.submitButtonContainerStyles()}>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              {STRINGS.BUTTON.SIGN_IN}
            </Button>
          </div>
        </form>

        <p style={LOGIN_STYLES.footerTextStyles()}>
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            onMouseEnter={() => setLinkHover(true)}
            onMouseLeave={() => setLinkHover(false)}
            style={{
              ...LOGIN_STYLES.footerLinkStyles(),
              ...(linkHover && LOGIN_STYLES.footerLinkHoverStyles()),
            }}
          >
            Sign up
          </button>
        </p>
      </Card>
    </AuthLayout>
  );
};
