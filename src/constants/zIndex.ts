/**
 * Centralized Z-index management to prevent layering conflicts
 * All z-index values should be defined here to ensure no conflicts
 */

interface ZIndexValues {
  // Modals and Overlays
  readonly BACKDROP: number;
  readonly MODAL: number;
  readonly DROPDOWN: number;

  // Notifications
  readonly NOTIFICATION: number;
  readonly TOAST: number;

  // Sticky/Fixed Elements
  readonly NAVBAR: number;
  readonly STICKY: number;

  // Tooltips & Popovers
  readonly TOOLTIP: number;
  readonly POPOVER: number;
}

const Z_INDEX: ZIndexValues = {
  // Modals and Overlays
  BACKDROP: 9998,
  MODAL: 9999,
  DROPDOWN: 10000,

  // Notifications
  NOTIFICATION: 49,
  TOAST: 50,

  // Sticky/Fixed Elements
  NAVBAR: 1000,
  STICKY: 999,

  // Tooltips & Popovers
  TOOLTIP: 100,
  POPOVER: 101,
};

export { Z_INDEX };
export default Z_INDEX;
export type { ZIndexValues };
