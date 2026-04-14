/**
 * Shared styling utilities and constants to reduce inline styles
 * These styles replace many inline style objects for consistency and maintainability
 */

import React from 'react';

// Type definitions for style objects
type CSSProperties = React.CSSProperties;

interface ModalStyles {
  backdrop: CSSProperties;
  container: (isMobile: boolean) => CSSProperties;
  closeButton: CSSProperties;
}

interface ButtonStyles {
  primary: CSSProperties;
  secondary: CSSProperties;
  danger: CSSProperties;
}

interface InputStyles {
  base: CSSProperties;
}

interface CardStyles {
  packageCard: CSSProperties;
  errorBox: CSSProperties;
  successBox: CSSProperties;
}

interface TextStyles {
  heading1: CSSProperties;
  heading2: CSSProperties;
  label: CSSProperties;
  secondary: CSSProperties;
}

export const MODAL_STYLES: ModalStyles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    overflowY: 'auto',
  },
  container: (isMobile: boolean): CSSProperties => ({
    position: 'relative',
    background: 'rgba(20, 20, 30, 0.98)',
    padding: isMobile ? '1.5rem' : '2rem',
    borderRadius: '8px',
    border: '2px solid #ff3333',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
  }),
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: '#ff3333',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    minWidth: '40px',
  },
};

export const BUTTON_STYLES: ButtonStyles = {
  primary: {
    background: '#ff3333',
    color: 'white',
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  secondary: {
    background: 'rgba(100, 150, 200, 0.3)',
    border: '2px solid #6496c8',
    color: '#6496c8',
    padding: '0.9rem 2rem',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  danger: {
    background: 'linear-gradient(135deg, rgba(255, 51, 51, 0.4), rgba(255, 100, 100, 0.3))',
    border: '2px solid #ff3333',
    color: '#ff6666',
    padding: '0.9rem 2rem',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
};

export const INPUT_STYLES: InputStyles = {
  base: {
    padding: '0.8rem',
    borderRadius: '6px',
    border: '1px solid rgba(0, 255, 136, 0.3)',
    background: 'rgba(0, 255, 136, 0.05)',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: 'inherit',
  },
};

export const CARD_STYLES: CardStyles = {
  packageCard: {
    background: 'rgba(255, 51, 51, 0.1)',
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid rgba(255, 51, 51, 0.3)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  errorBox: {
    background: 'rgba(255, 51, 51, 0.15)',
    border: '1px solid rgba(255, 51, 51, 0.4)',
    padding: '1rem',
    borderRadius: '8px',
    color: '#FFB3B3',
    fontSize: '0.9rem',
  },
  successBox: {
    background: 'rgba(0, 255, 136, 0.15)',
    border: '1px solid rgba(0, 255, 136, 0.4)',
    padding: '1rem',
    borderRadius: '8px',
    color: '#00ff88',
  },
};

export const TEXT_STYLES: TextStyles = {
  heading1: {
    color: '#ff3333',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  heading2: {
    color: '#ff3333',
    fontSize: '1.6rem',
    fontWeight: 'bold',
  },
  label: {
    color: '#a0a0a0',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  secondary: {
    color: '#a0a0a0',
    fontSize: '0.9rem',
  },
};

export default {
  MODAL_STYLES,
  BUTTON_STYLES,
  INPUT_STYLES,
  CARD_STYLES,
  TEXT_STYLES,
};
