import React from "react";

const HowItWorksModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: "Browse Games 🎮",
      description: "Explore our collection of 16+ popular games with beautiful cover art and complete pricing details"
    },
    {
      num: 2,
      title: "View Pricing 💰",
      description: "Click 'View Prices' to see all available currency packages and their prices in Philippine Pesos"
    },
    {
      num: 3,
      title: "Copy or Contact 📋",
      description: "Copy the price to clipboard or click 'Ask Details' to fill out your order form directly"
    },
    {
      num: 4,
      title: "Fill Order Details ✍️",
      description: "Enter your name, email, game category, priority level, subject, and message with your account info"
    },
    {
      num: 5,
      title: "Submit Order 📤",
      description: "Hit submit! Your order goes to our admin team and confirmation email arrives at your inbox"
    },
    {
      num: 6,
      title: "We Process Your Order ⚡",
      description: "Our team verifies your order, adds currency to your account, and sends you completion confirmation"
    }
  ];

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
        backdropFilter: "blur(3px)",
        padding: "1rem"
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderRadius: "20px",
          padding: "2rem",
          maxWidth: "700px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 60px rgba(255, 51, 51, 0.3)",
          border: "2px solid rgba(255, 51, 51, 0.5)",
          animation: "slideIn 0.3s ease-out"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>
          {`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(-30px) scale(0.95);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            
            ::-webkit-scrollbar {
              width: 8px;
            }
            
            ::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb {
              background: rgba(255, 51, 51, 0.6);
              border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 51, 51, 0.8);
            }
          `}
        </style>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2
            style={{
              color: "#FF6B9D",
              marginBottom: 0,
              fontSize: "1.8rem",
              fontWeight: "bold",
              textShadow: "0 2px 10px rgba(255, 51, 51, 0.3)"
            }}
          >
            🚀 How It Works
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 51, 51, 0.2)",
              border: "2px solid rgba(255, 51, 51, 0.5)",
              color: "#FF6B9D",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255, 51, 51, 0.4)";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 51, 51, 0.2)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {steps.map((step) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                gap: "1rem",
                padding: "1.2rem",
                background: "rgba(255, 51, 51, 0.05)",
                border: "1px solid rgba(255, 51, 51, 0.3)",
                borderRadius: "12px",
                transition: "all 0.3s",
                cursor: "default"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 51, 51, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 51, 51, 0.6)";
                e.currentTarget.style.transform = "translateX(5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 51, 51, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 51, 51, 0.3)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              {/* Step Number */}
              <div
                style={{
                  minWidth: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #FF6B9D, #ff3333)",
                  color: "white",
                  borderRadius: "50%",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  flexShrink: 0
                }}
              >
                {step.num}
              </div>

              {/* Step Content */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3
                  style={{
                    color: "#FF6B9D",
                    marginBottom: "0.5rem",
                    marginTop: 0,
                    fontSize: "1.1rem",
                    fontWeight: "bold"
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "#b0b0b0",
                    marginBottom: 0,
                    fontSize: "0.95rem",
                    lineHeight: "1.5"
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "rgba(100, 150, 255, 0.1)",
            border: "1px solid rgba(100, 150, 255, 0.3)",
            borderRadius: "12px",
            color: "#a0d4ff"
          }}
        >
          <p style={{ marginBottom: 0, fontSize: "0.9rem" }}>
            <strong>💡 Pro Tip:</strong> For fastest service, have your game account details ready before submitting your order!
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            marginTop: "1.5rem",
            padding: "1rem",
            background: "linear-gradient(135deg, #FF6B9D, #ff3333)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 51, 51, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Got It! Let's Start 🎮
        </button>
      </div>
    </div>
  );
};

export default HowItWorksModal;
