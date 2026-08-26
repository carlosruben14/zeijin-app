import React, { useState, FC, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';
import { Game, ContactFormData } from '../types';

interface ContactFormProps {
  game: Game;
  onClose?: () => void;
  isMobile: boolean;
  isSubmittingForm: boolean;
  setIsSubmittingForm: (value: boolean) => void;
  setValidationError: (error: string) => void;
  validationError: string;
}

const ContactForm: FC<ContactFormProps> = ({
  game,
  onClose,
  isMobile,
  isSubmittingForm,
  setIsSubmittingForm,
  setValidationError,
  validationError
}) => {
  if (!game) return null;

  const [formData, setFormData] = useState<ContactFormData>({
    playerName: '',
    playerID: '',
    email: '',
    phone: '',
    message: ''
  });

  const validateContactForm = (): boolean => {
    const { playerName, playerID, email, phone } = formData;

    if (!playerName.trim() || !playerID.trim() || !email.trim() || !phone.trim()) {
      setValidationError('All fields are required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Invalid email address');
      return false;
    }

    const phoneRegex = /^[0-9\s\-+()]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
      setValidationError('Invalid phone number');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev: ContactFormData) => ({
      ...prev,
      [name]: value
    }));
    if (validationError) setValidationError('');
  };

  const handlePlatformClick = (platform: 'messenger' | 'telegram' | 'instagram'): void => {
    if (!validateContactForm() || isSubmittingForm) return;

    setIsSubmittingForm(true);

    const formContent = `
Game: ${game.title}
Player Name: ${formData.playerName}
Player ID: ${formData.playerID}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.message ? `Message: ${formData.message}` : ''}
    `.trim();

    let url = '';
    const encodedContent = encodeURIComponent(formContent);

    if (platform === 'messenger') {
      url = `https://m.me/61555463689?text=${encodedContent}`;
    } else if (platform === 'telegram') {
      url = `https://t.me/ZeijinShop?text=${encodedContent}`;
    } else if (platform === 'instagram') {
      url = 'https://www.instagram.com/zeijin_shop/';
    }

    window.open(url, '_blank');

    setTimeout(() => {
      setIsSubmittingForm(false);
      setFormData({
        playerName: '',
        playerID: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 1000);
  };

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLButtonElement>, platform: 'messenger' | 'telegram' | 'instagram'): void => {
    if ((e.key === 'Enter' || e.key === ' ') && !isSubmittingForm) {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: isMobile ? '1rem' : '0'
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          border: '2px solid #ff3333',
          borderRadius: '12px',
          maxWidth: isMobile ? '90vw' : '450px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          boxShadow: '0 0 40px rgba(255, 51, 51, 0.4)'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem',
            borderBottom: '2px solid rgba(255, 51, 51, 0.3)',
            position: 'sticky',
            top: 0,
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            zIndex: 1
          }}
        >
          <h2 style={{ color: '#ff3333', margin: 0, fontSize: '1.3rem' }}>
            Order Form
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ff3333',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: 0,
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Close form"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem' }}>
          {/* Game Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#00ff88', fontSize: '0.9rem', fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>
              Game:
            </label>
            <div
              style={{
                background: 'rgba(0, 255, 136, 0.1)',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                padding: '0.8rem',
                borderRadius: '6px',
                color: '#00ff88'
              }}
            >
              {game.title}
            </div>
          </div>

          {/* Form Fields */}
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
            {/* Player Name */}
            <div>
              <label style={{ color: '#00ff88', fontSize: '0.9rem', fontWeight: 'bold', display: 'block', marginBottom: '0.4rem' }}>
                Player Name:
              </label>
              <input
                type="text"
                name="playerName"
                value={formData.playerName}
                onChange={handleInputChange}
                placeholder="Enter your player name"
                maxLength={50}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  background: 'rgba(0, 255, 136, 0.05)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Player ID */}
            <div>
              <label style={{ color: '#00ff88', fontSize: '0.9rem', fontWeight: 'bold', display: 'block', marginBottom: '0.4rem' }}>
                Player ID:
              </label>
              <input
                type="text"
                name="playerID"
                value={formData.playerID}
                onChange={handleInputChange}
                placeholder="Enter your player ID"
                maxLength={50}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  background: 'rgba(0, 255, 136, 0.05)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ color: '#00ff88', fontSize: '0.9rem', fontWeight: 'bold', display: 'block', marginBottom: '0.4rem' }}>
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                maxLength={100}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  background: 'rgba(0, 255, 136, 0.05)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{ color: '#00ff88', fontSize: '0.9rem', fontWeight: 'bold', display: 'block', marginBottom: '0.4rem' }}>
                Phone:
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+63 9XX XXX XXXX"
                maxLength={20}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  background: 'rgba(0, 255, 136, 0.05)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label style={{ color: '#00ff88', fontSize: '0.9rem', fontWeight: 'bold', display: 'block', marginBottom: '0.4rem' }}>
                Additional Message (Optional):
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Add any additional details..."
                maxLength={200}
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  background: 'rgba(0, 255, 136, 0.05)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* Validation Error */}
          {validationError && (
            <div
              style={{
                background: 'rgba(255, 51, 51, 0.2)',
                border: '1px solid rgba(255, 51, 51, 0.5)',
                color: '#ff8888',
                padding: '0.8rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}
            >
              {validationError}
            </div>
          )}

          {/* Platform Buttons */}
          <div style={{ display: 'grid', gap: '0.8rem' }}>
            {/* Messenger */}
            <button
              onClick={() => handlePlatformClick('messenger')}
              disabled={isSubmittingForm}
              role="button"
              tabIndex={isSubmittingForm ? -1 : 0}
              aria-label="Send order via Messenger"
              aria-busy={isSubmittingForm}
              onKeyPress={(e: KeyboardEvent<HTMLButtonElement>) => handleKeyPress(e, 'messenger')}
              style={{
                background: 'linear-gradient(135deg, #0084ff 0%, #0052cc 100%)',
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '6px',
                cursor: isSubmittingForm ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                opacity: isSubmittingForm ? 0.6 : 1
              }}
              onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                if (!isMobile && !isSubmittingForm) {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 132, 255, 0.5)';
                }
              }}
              onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isSubmittingForm ? 'Opening...' : 'Send via Messenger'}
            </button>

            {/* Telegram */}
            <button
              onClick={() => handlePlatformClick('telegram')}
              disabled={isSubmittingForm}
              role="button"
              tabIndex={isSubmittingForm ? -1 : 0}
              aria-label="Send order via Telegram"
              aria-busy={isSubmittingForm}
              onKeyPress={(e: KeyboardEvent<HTMLButtonElement>) => handleKeyPress(e, 'telegram')}
              style={{
                background: 'linear-gradient(135deg, #0088cc 0%, #0055aa 100%)',
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '6px',
                cursor: isSubmittingForm ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                opacity: isSubmittingForm ? 0.6 : 1
              }}
              onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                if (!isMobile && !isSubmittingForm) {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 136, 204, 0.5)';
                }
              }}
              onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isSubmittingForm ? 'Opening...' : 'Send via Telegram'}
            </button>

            {/* Instagram */}
            <button
              onClick={() => handlePlatformClick('instagram')}
              disabled={isSubmittingForm}
              role="button"
              tabIndex={isSubmittingForm ? -1 : 0}
              aria-label="Send order via Instagram"
              aria-busy={isSubmittingForm}
              onKeyPress={(e: KeyboardEvent<HTMLButtonElement>) => handleKeyPress(e, 'instagram')}
              style={{
                background: 'linear-gradient(135deg, #E1306C 0%, #C13584 100%)',
                color: 'white',
                border: 'none',
                padding: '0.8rem',
                borderRadius: '6px',
                cursor: isSubmittingForm ? 'not-allowed' : 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                opacity: isSubmittingForm ? 0.6 : 1
              }}
              onMouseEnter={(e: MouseEvent<HTMLButtonElement>) => {
                if (!isMobile && !isSubmittingForm) {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(225, 48, 108, 0.5)';
                }
              }}
              onMouseLeave={(e: MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isSubmittingForm ? 'Opening...' : 'Send via Instagram'}
            </button>
          </div>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              background: 'rgba(100, 100, 150, 0.3)',
              color: '#a0a0a0',
              border: '1px solid rgba(100, 100, 150, 0.5)',
              padding: '0.8rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              marginTop: '1rem',
              transition: 'all 0.3s ease'
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
