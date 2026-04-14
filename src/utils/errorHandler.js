// Error handling and logging utilities
class Logger {
  static ERROR_TYPES = {
    API_ERROR: 'API_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    RUNTIME_ERROR: 'RUNTIME_ERROR',
    AUTH_ERROR: 'AUTH_ERROR',
  };

  static log(level, message, error = null, context = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      error: error?.message || error,
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

  static info(message, context = {}) {
    return this.log('INFO', message, null, context);
  }

  static warn(message, error = null, context = {}) {
    return this.log('WARN', message, error, context);
  }

  static error(message, error = null, context = {}) {
    return this.log('ERROR', message, error, context);
  }

  static debug(message, context = {}) {
    if (import.meta.env.MODE !== 'production') {
      return this.log('DEBUG', message, null, context);
    }
  }
}

// Async handler with error catching
export const asyncHandler = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      Logger.error('Async operation failed', error, { function: fn.name });
      throw error;
    }
  };
};

// API call wrapper with error handling
export const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    Logger.info(`Fetching: ${url}`);
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = new Error(`API Error: ${response.status} ${response.statusText}`);
      error.statusCode = response.status;
      Logger.error('API call failed', error, { url });
      throw error;
    }

    const data = await response.json();
    Logger.info(`Fetch successful: ${url}`, { dataSize: JSON.stringify(data).length });
    return data;
  } catch (error) {
    Logger.error('Fetch failed', error, { url });
    throw error;
  }
};

// Validate input with error handling
export const validateForm = (data, rules) => {
  const errors = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const value = data[field];

    if (rule.required && (!value || value.trim?.() === '')) {
      errors[field] = `${rule.label || field} is required`;
    }

    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} must not exceed ${rule.maxLength} characters`;
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      errors[field] = rule.patternError || `${rule.label || field} is invalid`;
    }
  });

  return errors;
};

export default Logger;
