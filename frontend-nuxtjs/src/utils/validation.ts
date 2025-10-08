// Form Validation Utilities

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class FormValidator {
  static validateField(value: any, rules: ValidationRule): ValidationResult {
    const errors: string[] = [];

    // Required validation
    if (rules.required && (!value || value.trim() === '')) {
      errors.push('This field is required');
      return { isValid: false, errors };
    }

    // Skip other validations if value is empty and not required
    if (!value || value.trim() === '') {
      return { isValid: true, errors: [] };
    }

    const stringValue = String(value).trim();

    // Min length validation
    if (rules.minLength && stringValue.length < rules.minLength) {
      errors.push(`Minimum length is ${rules.minLength} characters`);
    }

    // Max length validation
    if (rules.maxLength && stringValue.length > rules.maxLength) {
      errors.push(`Maximum length is ${rules.maxLength} characters`);
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(stringValue)) {
      errors.push('Invalid format');
    }

    // Custom validation
    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        errors.push(customError);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validateEmail(email: string): ValidationResult {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return this.validateField(email, {
      required: true,
      pattern: emailPattern,
      custom: (value) => {
        if (!emailPattern.test(value)) {
          return 'Please enter a valid email address';
        }
        return null;
      },
    });
  }

  static validatePassword(password: string): ValidationResult {
    return this.validateField(password, {
      required: true,
      minLength: 6,
      custom: (value) => {
        if (value.length < 6) {
          return 'Password must be at least 6 characters long';
        }
        return null;
      },
    });
  }

  static validateUsername(username: string): ValidationResult {
    return this.validateField(username, {
      required: true,
      minLength: 3,
      maxLength: 50,
      pattern: /^[a-zA-Z0-9_]+$/,
      custom: (value) => {
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers, and underscores';
        }
        return null;
      },
    });
  }

  static validateUsernameOrEmail(value: string): ValidationResult {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    
    return this.validateField(value, {
      required: true,
      minLength: 3,
      maxLength: 100, // Allow longer for email addresses
      custom: (inputValue) => {
        const stringValue = String(inputValue).trim();
        
        // Check if it's a valid email
        if (emailPattern.test(stringValue)) {
          return null; // Valid email
        }
        
        // Check if it's a valid username
        if (usernamePattern.test(stringValue) && stringValue.length >= 3 && stringValue.length <= 50) {
          return null; // Valid username
        }
        
        // If neither email nor valid username
        return 'Please enter a valid email address or username (letters, numbers, and underscores only)';
      },
    });
  }
}

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    required: true,
    minLength: 6,
  },
  username: {
    required: true,
    minLength: 3,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9_]+$/,
  },
}; 