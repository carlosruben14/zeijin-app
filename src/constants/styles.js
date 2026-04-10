// Centralized styles constants to replace inline styles
export const MODAL_STYLES = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    overflowY: "auto",
    padding: "2rem"
  },
  card: {
    background: "rgba(20, 20, 30, 0.98)",
    padding: "2rem",
    borderRadius: "8px",
    border: "2px solid #ff3333",
    maxWidth: "600px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto"
  },
  closeButton: {
    background: "transparent",
    border: "none",
    color: "#ff3333",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "0.5rem",
    minWidth: "40px"
  },
  title: {
    color: "#ff3333",
    marginBottom: "0.5rem",
    fontSize: "1.8rem"
  }
};

export const BUTTON_STYLES = {
  primary: {
    background: "#ff3333",
    color: "white",
    padding: "0.75rem 2rem",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s ease"
  },
  secondary: {
    background: "rgba(100, 150, 200, 0.3)",
    border: "2px solid #6496c8",
    color: "#6496c8",
    padding: "0.9rem 2rem",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.3s ease"
  },
  priceAction: {
    background: "linear-gradient(135deg, rgba(255, 51, 51, 0.4), rgba(255, 100, 100, 0.3))",
    border: "2px solid #ff3333",
    color: "#ff6666",
    padding: "0.9rem 2rem",
    borderRadius: "15px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.3s ease"
  },
  copyButton: {
    background: "rgba(0, 255, 136, 0.2)",
    border: "1px solid #00ff88",
    color: "#00ff88",
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "bold",
    transition: "all 0.2s",
    width: "100%"
  }
};

export const INPUT_STYLES = {
  text: {
    width: "100%",
    padding: "0.6rem 0.8rem",
    border: "1px solid rgba(0, 255, 136, 0.3)",
    borderRadius: "6px",
    background: "rgba(0, 255, 136, 0.08)",
    color: "#e0e0e0",
    boxSizing: "border-box",
    fontSize: "0.9rem"
  },
  textarea: {
    width: "100%",
    padding: "0.6rem 0.8rem",
    border: "1px solid rgba(255, 165, 0, 0.3)",
    borderRadius: "6px",
    background: "rgba(255, 165, 0, 0.08)",
    color: "#e0e0e0",
    boxSizing: "border-box",
    fontSize: "0.9rem",
    minHeight: "70px",
    fontFamily: "inherit",
    resize: "vertical"
  },
  error: {
    borderColor: "#ff3333"
  }
};

export const CARD_STYLES = {
  pricing: {
    background: "rgba(255, 51, 51, 0.1)",
    padding: "1rem",
    borderRadius: "6px",
    border: "1px solid rgba(255, 51, 51, 0.3)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem"
  },
  special: {
    background: "rgba(255, 165, 0, 0.1)",
    padding: "1rem",
    borderRadius: "6px",
    border: "2px solid rgba(255, 165, 0, 0.4)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem"
  },
  statBox: {
    background: "rgba(0, 255, 136, 0.05)",
    padding: "0.8rem",
    borderRadius: "6px",
    marginTop: "0.5rem"
  },
  errorBox: {
    background: "rgba(255, 51, 51, 0.15)",
    border: "1px solid rgba(255, 51, 51, 0.4)",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    color: "#FFB3B3",
    fontSize: "0.9rem"
  }
};

export const TEXT_STYLES = {
  label: {
    display: "block",
    color: "#00ff88",
    fontSize: "0.9rem",
    fontWeight: "bold",
    marginBottom: "0.4rem"
  },
  error: {
    color: "#ff6666",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    fontSize: "0.9rem"
  },
  description: {
    color: "#a0a0a0",
    marginBottom: "0",
    fontSize: "0.9rem"
  },
  muted: {
    color: "#a0a0a0",
    fontSize: "0.85rem",
    marginTop: "1.5rem",
    fontStyle: "italic"
  }
};

export default {
  MODAL_STYLES,
  BUTTON_STYLES,
  INPUT_STYLES,
  CARD_STYLES,
  TEXT_STYLES
};
