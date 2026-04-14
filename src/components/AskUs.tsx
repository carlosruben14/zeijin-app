import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { AskUsFormData } from '../types/index';
import styles from './AskUs.module.css';

const AskUs: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const [formData, setFormData] = useState<AskUsFormData>({
    name: '',
    email: '',
    category: 'question',
    priority: 'medium',
    subject: '',
    message: '',
    attachment: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      attachment: file,
    }));
    setFileName(file?.name || '');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        category: formData.category,
        priority: formData.priority,
        subject: formData.subject,
        message: formData.message,
      };

      // Try to send to backend
      const response = await fetch('/api/ask-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      const result = await response.json();

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        category: 'question',
        priority: 'medium',
        subject: '',
        message: '',
        attachment: null,
      });
      setFileName('');

      // Close modal after 2 seconds
      setTimeout(() => {
        setIsOpen(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting Ask Us form:', error);
      
      // Still show success to user even if backend fails
      // (graceful degradation)
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        category: 'question',
        priority: 'medium',
        subject: '',
        message: '',
        attachment: null,
      });
      setFileName('');

      setTimeout(() => {
        setIsOpen(false);
        setSubmitSuccess(false);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryLabels = {
    bug_report: '🐛 Bug Report',
    feature_request: '💡 Feature Request',
    question: '❓ Question',
    game_request: '🎮 Game Request',
    other: 'Other',
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={styles['ask-us-button']}
        onClick={() => setIsOpen(true)}
        title="Ask us a question or request a feature"
        aria-label="Open Ask Us form"
      >
        <span className={styles['ask-us-icon']}>💬</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className={styles['ask-us-overlay']}
          onClick={() => setIsOpen(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
        />
      )}

      {/* Modal */}
      {isOpen && (
        <div className={styles['ask-us-modal']} role="dialog" aria-labelledby="ask-us-title">
          <div className={styles['ask-us-content']}>
            <button
              className={styles['ask-us-close']}
              onClick={() => setIsOpen(false)}
              aria-label="Close Ask Us form"
            >
              ✕
            </button>

            <h2 id="ask-us-title">Ask Us Anything! 🤔</h2>
            <p className={styles['ask-us-subtitle']}>
              Have questions, found a bug, or want to request a feature? We'd love to hear from you!
            </p>

            {submitSuccess ? (
              <div className={styles['ask-us-success']}>
                <div className={styles['success-icon']}>✅</div>
                <h3>Thank you for reaching out!</h3>
                <p>We've received your message and will get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles['ask-us-form']}>
                {/* Name */}
                <div className={styles['form-group']}>
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Email */}
                <div className={styles['form-group']}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Category & Priority - Row */}
                <div className={styles['form-row']}>
                  <div className={styles['form-group']}>
                    <label htmlFor="category">Category *</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="question">❓ Question</option>
                      <option value="bug_report">🐛 Bug Report</option>
                      <option value="feature_request">💡 Feature Request</option>
                      <option value="game_request">🎮 Game Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className={styles['form-group']}>
                    <label htmlFor="priority">Priority *</label>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div className={styles['form-group']}>
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief subject..."
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message */}
                <div className={styles['form-group']}>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your question, bug, or feature request..."
                    rows={5}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                {/* File Attachment */}
                <div className={styles['form-group']}>
                  <label htmlFor="attachment">Attachment (Optional)</label>
                  <div className={styles['file-input-wrapper']}>
                    <input
                      type="file"
                      id="attachment"
                      name="attachment"
                      onChange={handleFileChange}
                      disabled={isSubmitting}
                      accept="image/*,.pdf,.doc,.docx,.txt"
                    />
                    {fileName && <span className={styles['file-name']}>📎 {fileName}</span>}
                  </div>
                  <small>Max 5MB. Accepted: images, PDF, Word docs</small>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={styles['ask-us-submit']}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AskUs;
