/**
 * Enhanced Signup page with modern UI, animations, and password strength indicator
 * Uses centralized styles from styles/ directory for consistency and maintainability
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../layouts';
import { Button, Input, Card } from '../../components/common';
import { useAuth } from '../../hooks';
import { STRINGS } from '../../constants';
import SIGNUP_STYLES from '../../styles/signupStyles';
import { PASSWORD_STRENGTH_STYLES, getStrengthColor, getStrengthText } from '../../styles/passwordStrength';
import THEME from '../../styles/theme';
import RESPONSIVE from '../../styles/responsive';

// Password strength calculator
const calculatePasswordStrength = (password: string): { strength: 'weak' | 'fair' | 'strong' | 'very-strong'; score: number } => {
  let score = 0;
  if (!password) return { strength: 'weak', score: 0 };
  
  if (password.length >= 6) score += 20;
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 20;
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^a-zA-Z0-9]/.test(password)) score += 10;
  
  let strength: 'weak' | 'fair' | 'strong' | 'very-strong' = 'weak';
  if (score >= 80) strength = 'very-strong';
  else if (score >= 60) strength = 'strong';
  else if (score >= 40) strength = 'fair';
  
  return { strength, score };
};

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
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());

  const passwordStrength = useMemo(() => calculatePasswordStrength(formData.password), [formData.password]);
  const strengthColor = getStrengthColor(passwordStrength.strength);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Mark field as completed if it has a value
    if (value.trim()) {
      setCompletedFields((prev) => new Set(prev).add(name));
    } else {
      setCompletedFields((prev) => {
        const updated = new Set(prev);
        updated.delete(name);
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    // Validation
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = 'Please enter your full name';
    if (!formData.email) errors.email = 'Email address is required';
    if (!formData.password) {
      errors.password = 'Create a secure password';
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
      setValidationErrors({ submit: 'Signup failed. This email may already be registered.' });
    }
  };

  // Progress indicator (completed fields)
  const progressPercentage = (completedFields.size / 4) * 100;

  return (
    <AuthLayout>
      <Card style={SIGNUP_STYLES.cardStyles()} className="mb-6 animate-fade-in-up">
        
        {/* Header with Icon */}
        <div style={SIGNUP_STYLES.headerContainerStyles()}>
          <div style={SIGNUP_STYLES.emojiStyles()}>
            ✨
          </div>
          <h1 style={SIGNUP_STYLES.titleStyles()}>
            {STRINGS.AUTH.SIGNUP_TITLE}
          </h1>
          <p style={SIGNUP_STYLES.subtitleStyles()}>
            Join us to revolutionize your documents
          </p>

          {/* Progress Bar */}
          <div style={SIGNUP_STYLES.progressBarContainerStyles()}>
            <div style={SIGNUP_STYLES.progressBarFillStyles(progressPercentage)} />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={SIGNUP_STYLES.formStyles()}>
          
          {/* Name Field */}
          <div style={SIGNUP_STYLES.fieldWrapperStyles('0.4s ease-out')}>
            <Input
              name="name"      
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={validationErrors.name}
              disabled={isLoading}
            />
          </div>

          {/* Email Field */}
          <div style={SIGNUP_STYLES.fieldWrapperStyles('0.5s ease-out')}>
            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={validationErrors.email}
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div style={SIGNUP_STYLES.fieldWrapperStyles('0.6s ease-out')}>
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              error={validationErrors.password}
              disabled={isLoading}
              helperText={formData.password ? `Strength: ${getStrengthText(passwordStrength.strength)}` : 'At least 6 characters recommended'}
            />

            {/* Password Strength Indicator */}
            {formData.password && (
              <div style={{ ...PASSWORD_STRENGTH_STYLES.containerStyles(), borderColor: `${strengthColor}40` }}>
                <div style={PASSWORD_STRENGTH_STYLES.labelStyles()}>
                  <span style={PASSWORD_STRENGTH_STYLES.strengthTextStyles(strengthColor)}>
                    Strength: {getStrengthText(passwordStrength.strength)}
                  </span>
                </div>
                <div style={PASSWORD_STRENGTH_STYLES.barsContainerStyles()}>
                  {[1, 2, 3, 4].map((bar) => (
                    <div
                      key={bar}
                      style={PASSWORD_STRENGTH_STYLES.barStyles(bar <= (passwordStrength.score / 25), strengthColor)}
                    />
                  ))}
                </div>
                {passwordStrength.strength === 'weak' && (
                  <p style={PASSWORD_STRENGTH_STYLES.tipsStyles()}>
                    💡 Use uppercase, numbers, and special characters
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div style={SIGNUP_STYLES.fieldWrapperStyles('0.7s ease-out')}>
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={validationErrors.confirmPassword}
              disabled={isLoading}
            />
          </div>

          {/* Error message */}
          {(validationErrors.submit || error) && (
            <div style={SIGNUP_STYLES.errorBoxStyles()}>
              <span>⚠</span>
              {validationErrors.submit || error}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            style={{ width: '100%', marginTop: RESPONSIVE.spacing.md }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Sign In Link */}
        <div style={SIGNUP_STYLES.footerStyles()}>
          <p style={{
            color: THEME.colors.gray500,
            fontSize: RESPONSIVE.fontSize.sm,
            margin: 0,
          }}>
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              style={SIGNUP_STYLES.footerLinkStyles(false)}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = THEME.colors.secondary;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = THEME.colors.primary;
              }}
            >
              Sign in here
            </button>
          </p>
        </div>
      </Card>

      {/* Footer Note */}
      <p style={SIGNUP_STYLES.footerNoteStyles()}>
        🔒 Your data is encrypted and secure. We never share your information.
      </p>
    </AuthLayout>
  );
};
