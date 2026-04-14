/**
 * Error handling and logging utilities for the Zeijin app
 */

import type { LogEntry } from '@/types';

class Logger {
  static readonly ERROR_TYPES = {
    API_ERROR: 'API_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    RUNTIME_ERROR: 'RUNTIME_ERROR',
    AUTH_ERROR: 'AUTH_ERROR',
  };

  static log(
    level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG',
    message: string,
    error: Error | null = null,
    context: Record<string, any> = {}
  ): LogEntry {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      timestamp,
      level,
      message,
      error: error?.message || (error as string),
      context,
      stack: error?.stack,
    };

    console.log(`[${level}] ${message}`, logEntry);

    // In production, you can send logs to a logging service
    if (import.meta.env.MODE === 'production') {
      // sendToLoggingService(logEntry);
    }

    return logEntry;
  }

  static info(message: string, context: Record<string, any> = {}): LogEntry {
    return this.log('INFO', message, null, context);
  }

  static warn(message: string, error: Error | null = null, context: Record<string, any> = {}): LogEntry {
    return this.log('WARN', message, error, context);
  }

  static error(message: string, error: Error | null = null, context: Record<string, any> = {}): LogEntry {
    return this.log('ERROR', message, error, context);
  }

  static debug(message: string, context: Record<string, any> = {}): LogEntry | void {
    if (import.meta.env.MODE !== 'production') {
      return this.log('DEBUG', message, null, context);
    }
  }
}

/**
 * Async handler with error catching
 */
export const asyncHandler = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
): ((...args: T) => Promise<R>) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      Logger.error('Async operation failed', err, { function: fn.name });
      throw error;
    }
  };
};

/**
 * API call wrapper with error handling
 */
export const fetchWithErrorHandling = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  try {
    Logger.info(`Fetching: ${url}`);
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = new Error(`API Error: ${response.status} ${response.statusText}`);
      (error as any).statusCode = response.status;
      Logger.error('API call failed', error, { url });
      throw error;
    }

    const data = await response.json();
    Logger.info(`Fetch successful: ${url}`, { dataSize: JSON.stringify(data).length });
    return data;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    Logger.error('Fetch failed', err, { url });
    throw error;
  }
};

/**
 * Form validation rules
 */
interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternError?: string;
  label?: string;
}

/**
 * Validate form data against rules
 */
export const validateForm = (
  data: Record<string, any>,
  rules: Record<string, ValidationRule>
): Record<string, string> => {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field];

    if (rule.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      errors[field] = `${rule.label || field} is required`;
    }

    if (rule.minLength && value && String(value).length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value && String(value).length > rule.maxLength) {
      errors[field] = `${rule.label || field} must not exceed ${rule.maxLength} characters`;
    }

    if (rule.pattern && value && !rule.pattern.test(String(value))) {
      errors[field] = rule.patternError || `${rule.label || field} is invalid`;
    }
  });

  return errors;
};

export default Logger;
