import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.95)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          padding: "2rem"
        }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(50, 30, 30, 0.98), rgba(80, 20, 20, 0.98))",
            border: "2px solid #ff3333",
            borderRadius: "12px",
            padding: "2rem",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            boxShadow: "0 0 40px rgba(255, 51, 51, 0.5)"
          }}>
            <div style={{
              fontSize: "3rem",
              marginBottom: "1rem"
            }}>
              ⚠️
            </div>

            <h2 style={{
              color: "#ff6666",
              marginBottom: "1rem",
              fontSize: "1.5rem"
            }}>
              Oops! Something went wrong
            </h2>

            <p style={{
              color: "#d0d0d0",
              marginBottom: "1.5rem",
              lineHeight: "1.6",
              fontSize: "0.95rem"
            }}>
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>

            <div style={{
              background: "rgba(255, 51, 51, 0.1)",
              border: "1px solid rgba(255, 51, 51, 0.3)",
              padding: "1rem",
              borderRadius: "6px",
              marginBottom: "1.5rem",
              color: "#FFB3B3",
              fontSize: "0.8rem",
              maxHeight: "100px",
              overflowY: "auto",
              textAlign: "left"
            }}>
              <strong>Error Details:</strong>
              <div style={{
                marginTop: "0.5rem",
                fontFamily: "monospace",
                wordBreak: "break-word"
              }}>
                {this.state.error?.toString()}
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              style={{
                background: "#ff3333",
                color: "white",
                padding: "0.75rem 2rem",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff5555";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(255, 51, 51, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ff3333";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
