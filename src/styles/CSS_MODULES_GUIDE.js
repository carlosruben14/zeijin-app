/**
 * CSS Modules Architecture
 * 
 * This project uses CSS Modules for styled components.
 * All components should import and use these modules instead of inline styles.
 */

/**
 * MODULE: App.module.css
 * Purpose: App-wide layout, typography, and common utilities
 * 
 * Key Classes:
 * - .container - Max-width container (1200px)
 * - .section - Main section padding
 * - .heading1, .heading2, .heading3 - Typography hierarchy
 * - .card, .errorCard, .successCard - Card components
 * - .gridSpaced, .gridTwoCol - Grid layouts
 * - .loadingAnimation, .pulseAnimation - Animations
 * 
 * Example Usage:
 * import styles from './App.module.css';
 * <div className={styles.container}>
 *   <h1 className={styles.heading1}>Title</h1>
 * </div>
 */

/**
 * MODULE: Components.module.css
 * Purpose: Reusable component styles for buttons, inputs, forms
 * 
 * Key Classes:
 * - .buttonPrimary, .buttonSecondary, .buttonDanger - Button variants
 * - .buttonSmall, .buttonWide - Button modifiers
 * - .input, .inputError - Form inputs
 * - .formGroup, .formLabel, .formError - Form layout
 * - .badge, .badgeSuccess, .badgeError - Badge variants
 * - .divider, .dividerGreen, .dividerRed - Dividers
 * 
 * Example Usage:
 * import styles from './Components.module.css';
 * <button className={styles.buttonPrimary}>Click Me</button>
 * <input className={styles.input} type="text" />
 */

/**
 * MODULE: PricingModal.module.css
 * Purpose: Pricing modal component styles
 * 
 * Key Classes:
 * - .modalBackdrop - Main modal container
 * - .header, .headerTitle, .closeButton - Header section
 * - .content - Modal content wrapper
 * - .packageCard, .packageAmount, .packagePrice - Package cards
 * - .copyButton, .copyButton.copied - Copy button states
 * - .actionButtons - Button container
 * 
 * Example Usage:
 * import styles from './PricingModal.module.css';
 * <div className={styles.modalBackdrop}>
 *   <div className={styles.content}>
 *     <div className={styles.packageCard}>
 */

/**
 * BEST PRACTICES:
 * 
 * 1. Prefer CSS modules over inline styles
 * 2. Group related styles in their own module
 * 3. Use consistent naming (camelCase for class names)
 * 4. Add hover/active states in CSS, not JavaScript
 * 5. Use CSS variables for theme colors (coming in Phase 3)
 * 6. Keep responsive breakpoints at 480px (mobile) and 768px (tablet)
 * 7. Document new modules with JSDoc comments
 * 
 * COLOR PALETTE:
 * - Primary: #ff3333 (Red)
 * - Success: #00ff88 (Green)
 * - Warning: #ffa500 (Orange)
 * - Secondary: #6496ff (Blue)
 * - Text: #d0d0d0 (Light gray)
 * - Muted: #a0a0a0 (Medium gray)
 * - Dark: #1a1a2e (Very dark blue)
 */

export const CSS_MODULES = {
  app: 'App.module.css',
  components: 'Components.module.css',
  pricingModal: 'PricingModal.module.css',
};
