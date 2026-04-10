import React, { useState } from 'react';

const PricingModal = ({ game, onClose, onCopyPrice, onFillForm, isMobile }) => {
  if (!game) return null;

  const [copiedAmount, setCopiedAmount] = useState(null);

  const handleCopyPrice = (amount, price) => {
    setCopiedAmount(amount);
    navigator.clipboard.writeText(`${amount} Diamonds: ₱${price}`);
    onCopyPrice?.(amount, price);
    
    setTimeout(() => setCopiedAmount(null), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: isMobile ? "1rem" : "0"
      }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          border: "2px solid #ff3333",
          borderRadius: "12px",
          maxWidth: isMobile ? "90vw" : "500px",
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 0 40px rgba(255, 51, 51, 0.4)"
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.5rem",
            borderBottom: "2px solid rgba(255, 51, 51, 0.3)",
            position: "sticky",
            top: 0,
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            zIndex: 1
          }}
        >
          <h2 style={{ color: "#ff3333", margin: 0, fontSize: "1.3rem" }}>
            {game.title} Pricing
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#ff3333",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: 0,
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem" }}>
          {/* Game Image */}
          {game.image && (
            <img
              src={game.image}
              alt={game.title}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "1rem",
                border: "1px solid rgba(255, 51, 51, 0.3)"
              }}
            />
          )}

          {/* Pricing Packages */}
          {game.pricing && game.pricing.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#ff3333", marginTop: 0, marginBottom: "1rem", fontSize: "1rem" }}>
                💎 Diamond Packages
              </h3>
              <div style={{ display: "grid", gap: "0.8rem" }}>
                {game.pricing.map((pkg, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255, 51, 51, 0.1)",
                      border: "1px solid rgba(255, 51, 51, 0.3)",
                      padding: "1rem",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background = "rgba(255, 51, 51, 0.2)";
                        e.currentTarget.style.borderColor = "rgba(255, 51, 51, 0.6)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 51, 51, 0.1)";
                      e.currentTarget.style.borderColor = "rgba(255, 51, 51, 0.3)";
                    }}
                  >
                    <div>
                      <div style={{ color: "#00ff88", fontWeight: "bold", marginBottom: "0.3rem" }}>
                        {pkg.amount}
                      </div>
                      <div style={{ color: "#a0a0a0", fontSize: "0.85rem" }}>
                        ₱{pkg.price}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyPrice(pkg.amount, pkg.price)}
                      style={{
                        background: copiedAmount === pkg.amount ? "#00ff88" : "rgba(0, 255, 136, 0.3)",
                        color: copiedAmount === pkg.amount ? "#000" : "#00ff88",
                        border: "1px solid rgba(0, 255, 136, 0.5)",
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                        fontWeight: "bold",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {copiedAmount === pkg.amount ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: "grid", gap: "0.8rem", marginTop: "1.5rem" }}>
            <button
              onClick={() => {
                onClose?.();
                onFillForm?.();
              }}
              style={{
                background: "linear-gradient(135deg, #ff3333, #ff5555)",
                color: "white",
                border: "none",
                padding: "0.8rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "bold",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 51, 51, 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              📝 Fill Order Form
            </button>
            <button
              onClick={onClose}
              style={{
                background: "rgba(100, 100, 150, 0.3)",
                color: "#a0a0a0",
                border: "1px solid rgba(100, 100, 150, 0.5)",
                padding: "0.8rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "bold",
                transition: "all 0.3s ease"
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
