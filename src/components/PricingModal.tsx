import React, { FC, useState } from 'react';
import Logger from '../utils/errorHandler';
import { Z_INDEX } from '../constants/zIndex';
import type { Game } from '../types';
import styles from './PricingModal.module.css';

interface PricingModalProps {
  game: Game | null;
  onClose?: () => void;
  isMobile?: boolean;
  onContactForm?: (game: Game) => void;
}

// Map game titles to their currency/package names
const getPackageTitle = (gameTitle?: string): string => {
  if (!gameTitle) return '💎 Pricing Packages';

  const titleLower = gameTitle.toLowerCase();

  if (titleLower.includes('valorant')) return '🎯 VP Packages';
  if (titleLower.includes('genshin')) return '💎 Crystal Packages';
  if (titleLower.includes('wild rift') || titleLower.includes('league'))
    return '⚔️ Wildcore Packages';
  if (titleLower.includes('call of duty')) return '🎯 CP Packages';
  if (titleLower.includes('honor of kings')) return '🏆 Credit Packages';
  if (titleLower.includes('blood strike')) return '🔫 Gold Packages';
  if (titleLower.includes('pubg')) return '🎖️ UC Packages';
  if (titleLower.includes('crossfire')) return '⚔️ Ecoin Packages';
  if (titleLower.includes('teamfight')) return '🎲 RP Packages';
  if (titleLower.includes('steam')) return '💳 Wallet Packages';
  if (titleLower.includes('magic chess')) return '♟️ Dias Packages';

  return '💎 Diamond Packages';
};

const PricingModal: FC<PricingModalProps> = ({
  game,
  onClose,
  isMobile,
  onContactForm,
}) => {
  if (!game) return null;

  const [copiedAmount, setCopiedAmount] = useState<number | null>(null);

  const handleCopyPrice = (priceId: number, price: number): void => {
    try {
      setCopiedAmount(priceId);
      navigator.clipboard
        .writeText(price.toString())
        .then(() => {
          Logger.info('Price copied successfully', { price });
          setTimeout(() => setCopiedAmount(null), 2000);
        })
        .catch((err) => {
          Logger.error(
            'Failed to copy price',
            err instanceof Error ? err : new Error(String(err))
          );
          alert('Failed to copy price to clipboard');
        });
    } catch (error) {
      Logger.error(
        'Copy price error',
        error instanceof Error ? error : new Error(String(error))
      );
    }
  };

  const handleContinueToForm = (): void => {
    if (onContactForm) {
      onContactForm(game);
    }
    onClose?.();
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
        zIndex: Z_INDEX.MODAL,
        padding: isMobile ? '1rem' : '0',
      }}
      onClick={(e) => e.currentTarget === e.target && onClose?.()}
    >
      <div className={styles.modalBackdrop}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>{game.title} Pricing</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Game Image */}
          {game.image && (
            <img
              src={game.image}
              alt={game.title}
              className={styles.gameImage}
            />
          )}

          {/* Pricing Packages - Multiple Sections */}
          {(game as any).pricingSections && (game as any).pricingSections.length > 0 ? (
            // Render multiple sections if available
            (game as any).pricingSections.map((section: any, sectionIdx: number) => (
              <div key={sectionIdx} className={styles.section}>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                {section.type === 'instructions' && section.content ? (
                  // Render instructions as list
                  <div className={styles.instructionsList}>
                    {section.content.map((instruction: string, idx: number) => (
                      <div key={idx} className={styles.instructionItem}>
                        {instruction}
                      </div>
                    ))}
                  </div>
                ) : (
                  // Render pricing items
                  <div className={styles.packagesGrid}>
                    {section.items &&
                      section.items.map((pkg: any, idx: number) => (
                        <div key={idx} className={styles.packageCard}>
                          <div className={styles.packageInfo}>
                            <div className={styles.packageAmount}>
                              {pkg.amount}
                            </div>
                            <div className={styles.packagePrice}>
                              ₱{pkg.price}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleCopyPrice(pkg.amount, pkg.price)
                            }
                            className={`${styles.copyButton} ${
                              copiedAmount === pkg.amount ? styles.copied : ''
                            }`}
                          >
                            {copiedAmount === pkg.amount
                              ? '✓ Copied!'
                              : 'Copy'}
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))
          ) : game.pricing && game.pricing.length > 0 ? (
            // Fallback to old pricing format
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{getPackageTitle(game.title)}</h3>
              <div className={styles.packagesGrid}>
                {game.pricing.map((pkg, idx) => (
                  <div key={idx} className={styles.packageCard}>
                    <div className={styles.packageInfo}>
                      <div className={styles.packageAmount}>
                        {pkg.amount}
                      </div>
                      <div className={styles.packagePrice}>
                        ₱{pkg.price}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyPrice(pkg.amount, pkg.price)}
                      className={`${styles.copyButton} ${
                        copiedAmount === pkg.amount ? styles.copied : ''
                      }`}
                    >
                      {copiedAmount === pkg.amount ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              onClick={handleContinueToForm}
              className={styles.primaryButton}
            >
              Continue to Form
            </button>
            <button onClick={onClose} className={styles.secondaryButton}>
              Continue Shopping
            </button>
          </div>

          {/* Game Note/Disclaimer */}
          {(game as any).note && (
            <div className={styles.gameNote}>
              {(game as any).note}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
