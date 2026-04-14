// Centralized Z-index management to prevent layering conflicts
const Z_INDEX = {
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
