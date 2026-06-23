import { useState, useMemo, useEffect, useRef, useLayoutEffect } from "react";
import "./App.css";
import "./index.css";
import PricingModal from "./components/PricingModal";
import AskUs from "./components/AskUs";
import HowItWorksModal from "./components/HowItWorksModal";
import Logger from "./utils/errorHandler";
import { Z_INDEX } from "./constants/zIndex";
import { gamesData } from "./data/gamesData";
import { eventsData } from "./data/eventsData";

// Skeleton Loader Component for image placeholders
const SkeletonLoader = ({ width = "100%", height = "200px", borderRadius = "8px" }) => (
  <div
    style={{
      width,
      height,
      borderRadius,
      background: "linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%)",
      backgroundSize: "200% 100%",
      animation: "loading 1.5s infinite",
      cursor: "progress"
    }}
  >
    <style>{`
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

// Calculate event status
const getEventStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (today < start) return "upcoming";
  if (today > end) return "ended";
  return "ongoing";
};

// Calculate string similarity using Levenshtein distance
const calculateSimilarity = (str1, str2) => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  // Exact match or substring match
  if (s1 === s2 || s1.includes(s2) || s2.includes(s1)) return 1;
  
  // Levenshtein distance
  const matrix = Array(s2.length + 1).fill(null).map(() => 
    Array(s1.length + 1).fill(0)
  );
  
  for (let i = 0; i <= s1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= s2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= s2.length; j++) {
    for (let i = 1; i <= s1.length; i++) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,      // insertion
        matrix[j - 1][i] + 1,      // deletion
        matrix[j - 1][i - 1] + indicator  // substitution
      );
    }
  }
  
  const distance = matrix[s2.length][s1.length];
  const maxLen = Math.max(s1.length, s2.length);
  
  // Convert distance to similarity (0-1)
  return 1 - (distance / maxLen);
};

// Find closest match from array
const findClosestMatch = (query, array, getNameFn) => {
  let bestMatch = null;
  let bestScore = 0;
  
  for (const item of array) {
    const name = getNameFn(item);
    const score = calculateSimilarity(query, name);
    if (score > bestScore && score > 0.75) { // Increased threshold to 0.75 for very close matches only
      bestScore = score;
      bestMatch = item;
    }
  }
  
  return bestMatch;
};

const EventCarousel = ({ events, getEventStatus }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [eventImageLoaded, setEventImageLoaded] = useState(false);

  useEffect(() => {
    if (!autoPlay || events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, events.length]);

  // Reset image loaded state when carousel slides
  useEffect(() => {
    setEventImageLoaded(false);
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  if (events.length === 0) {
    return <p style={{ color: "#a0a0a0", textAlign: "center", padding: "2rem" }}>No active events at the moment. Check back soon!</p>;
  }

  const currentEvent = events[currentIndex];
  const endDate = new Date(currentEvent.endDate);
  const today = new Date();
  const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
  const eventStatus = getEventStatus(currentEvent.startDate, currentEvent.endDate);

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      {/* Main Carousel */}
      <div
        style={{
          position: "relative",
          background: "rgba(255, 51, 51, 0.08)",
          border: "2px solid rgba(255, 51, 51, 0.3)",
          borderRadius: "12px",
          overflow: "hidden",
          transition: "all 0.3s"
        }}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
      >
        {/* Event Image with Loading Indicator */}
        {currentEvent.image && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(280px, 62vw, 520px)",
              backgroundImage: `url(${currentEvent.image})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundColor: "#000",
              display: "flex",
              alignItems: "flex-end",
              overflow: "hidden"
            }}
          >
            {!eventImageLoaded && (
              <SkeletonLoader width="100%" height="clamp(280px, 62vw, 520px)" borderRadius="0" />
            )}
            
            {/* Hidden img tag to detect when image loads */}
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              onLoad={() => setEventImageLoaded(true)}
              onError={() => setEventImageLoaded(true)}
              style={{
                display: "none"
              }}
            />
            
            {/* Badge and Wiki Button */}
            <div style={{ position: "relative", zIndex: 2, padding: "1.5rem", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  background: eventStatus === "ongoing" ? "rgba(0, 255, 136, 0.2)" : eventStatus === "upcoming" ? "rgba(100, 150, 255, 0.2)" : "rgba(200, 200, 200, 0.2)",
                  color: eventStatus === "ongoing" ? "#00ff88" : eventStatus === "upcoming" ? "#6496ff" : "#c8c8c8",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  whiteSpace: "nowrap"
                }}
              >
                {eventStatus.charAt(0).toUpperCase() + eventStatus.slice(1)}
              </span>
              
              {/* Wiki Link Button */}
              {currentEvent.wikiUrl && (
                <a
                  href={currentEvent.wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "rgba(255, 51, 51, 0.2)",
                    border: "1px solid rgba(255, 51, 51, 0.5)",
                    color: "#ff3333",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    whiteSpace: "nowrap"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 51, 51, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 51, 51, 0.2)";
                  }}
                >
                  📖 Event Details
                </a>
              )}
            </div>
          </div>
        )}

        {/* Event Info */}
        <div style={{ padding: "2rem", position: "relative", zIndex: 2 }}>
          <h2 style={{ color: "#ff3333", marginBottom: "0.5rem", fontSize: "1.5rem" }}>
            {currentEvent.title}
          </h2>
          <p style={{ color: "#999", marginBottom: "1rem", fontSize: "0.95rem" }}>
            🎮 {currentEvent.game}
          </p>
          <p style={{ color: "#d0d0d0", marginBottom: "1.5rem", lineHeight: "1.6" }}>
            {currentEvent.description}
          </p>

          <div style={{ display: "flex", gap: "2rem", fontSize: "0.9rem" }}>
            <div>
              <span style={{ color: "#999" }}>Starts:</span>
              <div style={{ color: "#00ff88", fontWeight: "bold" }}>
                {new Date(currentEvent.startDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <span style={{ color: "#999" }}>Ends:</span>
              <div style={{ color: daysLeft <= 3 ? "#ff3333" : "#00ff88", fontWeight: "bold" }}>
                {new Date(currentEvent.endDate).toLocaleDateString()} ({daysLeft > 0 ? daysLeft + " days left" : "Ended"})
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255, 51, 51, 0.3)",
            border: "2px solid rgba(255, 51, 51, 0.6)",
            color: "#ff3333",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            zIndex: 3
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 51, 51, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 51, 51, 0.3)";
          }}
        >
          ◀
        </button>

        <button
          onClick={goToNext}
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(255, 51, 51, 0.3)",
            border: "2px solid rgba(255, 51, 51, 0.6)",
            color: "#ff3333",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s",
            zIndex: 3
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 51, 51, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 51, 51, 0.3)";
          }}
        >
          ▶
        </button>
      </div>

      {/* Indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          marginTop: "1.5rem",
          paddingBottom: "1rem"
        }}
      >
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? "32px" : "10px",
              height: "10px",
              borderRadius: "5px",
              border: "none",
              background: index === currentIndex ? "#ff3333" : "rgba(255, 51, 51, 0.3)",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.background = "rgba(255, 51, 51, 0.6)";
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentIndex) {
                e.currentTarget.style.background = "rgba(255, 51, 51, 0.3)";
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [contactGame, setContactGame] = useState(null);
  const [_packageDetailsModal, _setPackageDetailsModal] = useState(null); // Legacy: unused
  const [activeSection, setActiveSection] = useState("games");
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showWelcomeNotif, setShowWelcomeNotif] = useState(true);
  const [ignValidatorData, setIgnValidatorData] = useState({
    ign: "",
    orderedAmount: "",
    paymentMethod: "GCash",
    otherConcern: ""
  });
  const [formValidationErrors, setFormValidationErrors] = useState({});
  const [showMLIDChecker, setShowMLIDChecker] = useState(false);
  const [wikiSelectedGame, setWikiSelectedGame] = useState("mlbb"); // mlbb, valorant, genshin, lol
  const [mlSearchQuery, setMlSearchQuery] = useState("");
  const [mlSearchType, setMlSearchType] = useState("hero");
  const [mlCheckResult, setMlCheckResult] = useState(null);
  const [mlCheckError, setMlCheckError] = useState("");
  const [mlCheckLoading, setMlCheckLoading] = useState(false);
  const [mlSuggestion, setMlSuggestion] = useState(null); // { name, type }
  const [imageLoadingStates, setImageLoadingStates] = useState({}); // Track image loading by game ID
  const [wikiDetailTab, setWikiDetailTab] = useState("overview"); // overview, stats, abilities, skins
  const [_eventCarouselImageLoaded, _setEventCarouselImageLoaded] = useState(false); // Legacy: unused
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const abortControllerRef = useRef(null);

  // Track window size changes
  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-set search type when game changes
  useEffect(() => {
    const defaultTypes = {
      mlbb: "hero",
      valorant: "agent",
      genshin: "character",
      lol: "champion"
    };
    setMlSearchType(defaultTypes[wikiSelectedGame] || "hero");
    setMlSearchQuery("");
    setMlCheckResult(null);
    setMlCheckError("");
    setMlSuggestion(null);
  }, [wikiSelectedGame]);

  // Clear form validation errors when contact game modal is opened/closed
  useEffect(() => {
    if (contactGame) {
      setFormValidationErrors({});
    }
  }, [contactGame]);

  // Scroll to top on component mount and disable browser scroll restoration
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also scroll to top after a small delay to ensure it works
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-refresh open tabs when a new deployment is live
  useEffect(() => {
    if (import.meta.env.DEV) return;

    const currentScript = document.querySelector('script[type="module"][src*="/assets/index-"]');
    const currentBundleSrc = currentScript?.getAttribute('src');
    if (!currentBundleSrc) return;

    let isChecking = false;

    const getLatestBundleSrc = async () => {
      const response = await fetch(`/index.html?ts=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) return null;

      const html = await response.text();
      const bundleMatch = html.match(/<script[^>]+type="module"[^>]+src="([^"]*\/assets\/index-[^"]+\.js)"/i);
      return bundleMatch?.[1] || null;
    };

    const checkForNewDeployment = async () => {
      if (isChecking || document.visibilityState === 'hidden') return;
      isChecking = true;

      try {
        const latestBundleSrc = await getLatestBundleSrc();
        if (latestBundleSrc && latestBundleSrc !== currentBundleSrc) {
          window.location.reload();
        }
      } catch (error) {
        Logger.warn('Auto-update check failed', { error: String(error) });
      } finally {
        isChecking = false;
      }
    };

    const intervalId = setInterval(checkForNewDeployment, 60 * 1000);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkForNewDeployment();
      }
    };

    window.addEventListener('focus', checkForNewDeployment);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', checkForNewDeployment);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const getSearchTypeOptions = () => {
    switch(wikiSelectedGame) {
      case "mlbb":
        return ["hero", "item"];
      case "valorant":
        return ["agent"];
      case "genshin":
        return ["character"];
      case "lol":
        return ["champion", "item"];
      default:
        return ["hero"];
    }
  };

  const validateContactForm = () => {
    const errors = {};
    
    // Check IGN - required and non-empty
    if (!ignValidatorData.ign || ignValidatorData.ign.trim() === "") {
      errors.ign = "In-Game Name (UID) is required";
    }
    
    // Check orderedAmount - required, numeric, and greater than 0
    if (!ignValidatorData.orderedAmount || ignValidatorData.orderedAmount.trim() === "") {
      errors.orderedAmount = "Order Amount is required";
    } else if (isNaN(ignValidatorData.orderedAmount) || parseFloat(ignValidatorData.orderedAmount) <= 0) {
      errors.orderedAmount = "Order Amount must be a valid number greater than 0";
    }
    
    setFormValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const searchGameData = async () => {
    setMlCheckError("");
    setMlCheckResult(null);
    
    if (!mlSearchQuery.trim()) {
      setMlCheckError(`Please enter a ${mlSearchType} name`);
      return;
    }

    // Abort any previous requests
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setMlCheckLoading(true);
    
    try {
      let endpoint;
      
      // Build endpoint based on game and search type
      if (wikiSelectedGame === "mlbb") {
        if (mlSearchType === "hero") {
          endpoint = `/api/heroes`;
        } else if (mlSearchType === "item") {
          endpoint = `/api/equipment`;
        }
      } else if (wikiSelectedGame === "valorant") {
        if (mlSearchType === "agent") {
          endpoint = `https://valorant-api.com/v1/agents`;
        }
      } else if (wikiSelectedGame === "genshin") {
        if (mlSearchType === "character") {
          endpoint = `https://genshin.jmp.blue/characters`;
        }
      } else if (wikiSelectedGame === "lol") {
        if (mlSearchType === "champion") {
          endpoint = `https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json`;
        } else if (mlSearchType === "item") {
          endpoint = `https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/item.json`;
        }
      }

      console.log("Fetching from:", endpoint);
      
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        },
        signal: abortControllerRef.current.signal
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`API returned status ${response.status}: ${response.statusText}`);
      }

      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Invalid JSON response from API");
      }
      
      console.log("API response data:", result);
      
      const searchTerm = mlSearchQuery.toLowerCase();
      let found = null;
      
      // Search logic based on game
      if (wikiSelectedGame === "mlbb") {
        if (!result.data || !Array.isArray(result.data)) {
          throw new Error("API response format is invalid");
        }
        
        if (mlSearchType === "hero") {
          found = result.data.find(h => 
            h.hero_name.toLowerCase().includes(searchTerm) || 
            h.hero_title.toLowerCase().includes(searchTerm)
          );
          if (found) {
            setMlCheckResult({
              valid: true,
              type: "hero",
              game: "mlbb",
              name: found.hero_name,
              data: found,
              message: `Hero Data Found! ✓`
            });
          } else {
            const suggestion = findClosestMatch(mlSearchQuery, result.data, h => h.hero_name);
            setMlCheckError(`Hero "${mlSearchQuery}" not found.`);
            if (suggestion) {
              setMlSuggestion({ name: suggestion.hero_name, type: "hero" });
            } else {
              setMlSuggestion(null);
            }
          }
        } else if (mlSearchType === "item") {
          found = result.data.find(i => 
            i.item_name.toLowerCase().includes(searchTerm) ||
            (i.description && i.description.toLowerCase().includes(searchTerm))
          );
          if (found) {
            setMlCheckResult({
              valid: true,
              type: "item",
              game: "mlbb",
              name: found.item_name,
              data: found,
              message: `Item Found! ✓`
            });
          } else {
            const suggestion = findClosestMatch(mlSearchQuery, result.data, i => i.item_name);
            setMlCheckError(`Item "${mlSearchQuery}" not found.`);
            if (suggestion) {
              setMlSuggestion({ name: suggestion.item_name, type: "item" });
            } else {
              setMlSuggestion(null);
            }
          }
        }
      } else if (wikiSelectedGame === "valorant") {
        if (!result.data || !Array.isArray(result.data)) {
          throw new Error("API response format is invalid");
        }
        
        found = result.data.find(a => a.displayName && a.displayName.toLowerCase().includes(searchTerm));
        if (found) {
          setMlCheckResult({
            valid: true,
            type: "agent",
            game: "valorant",
            name: found.displayName,
            data: found,
            message: `Agent Found! ✓`
          });
        } else {
          const suggestion = findClosestMatch(mlSearchQuery, result.data, a => a.displayName);
          setMlCheckError(`Agent "${mlSearchQuery}" not found.`);
          if (suggestion) {
            setMlSuggestion({ name: suggestion.displayName, type: "agent" });
          } else {
            setMlSuggestion(null);
          }
        }
      } else if (wikiSelectedGame === "genshin") {
        // Genshin API returns simple array of character names (strings)
        const dataArray = Array.isArray(result) ? result : [];
        found = dataArray.find(characterName => String(characterName).toLowerCase().includes(searchTerm));
        
        if (found) {
          // Fetch detailed character data
          try {
            const detailResponse = await fetch(`https://genshin.jmp.blue/characters/${found}`);
            if (detailResponse.ok) {
              const characterDetail = await detailResponse.json();
              const wikiUrl = `https://genshin-impact.fandom.com/wiki/${found}`;
              setMlCheckResult({
                valid: true,
                type: "character",
                game: "genshin",
                name: characterDetail.name || found,
                data: { ...characterDetail, wikiUrl },
                message: `Character Found! ✓`
              });
            } else {
              throw new Error("Failed to fetch character details");
            }
          } catch (detailError) {
            console.warn("Could not fetch character details:", detailError);
            // Fallback to basic info
            const wikiUrl = `https://genshin-impact.fandom.com/wiki/${found}`;
            setMlCheckResult({
              valid: true,
              type: "character",
              game: "genshin",
              name: found,
              data: { name: found, wikiUrl },
              message: `Character Found! ✓`
            });
          }
        } else {
          const suggestion = findClosestMatch(mlSearchQuery, dataArray, name => name);
          setMlCheckError(`Character "${mlSearchQuery}" not found.`);
          if (suggestion) {
            setMlSuggestion({ name: suggestion, type: "character" });
          } else {
            setMlSuggestion(null);
          }
        }
      } else if (wikiSelectedGame === "lol") {
        let searchData = [];
        if (mlSearchType === "champion") {
          searchData = result.data && typeof result.data === 'object' ? Object.values(result.data) : [];
          found = searchData.find(c => c.name && c.name.toLowerCase().includes(searchTerm));
          if (found) {
            setMlCheckResult({
              valid: true,
              type: "champion",
              game: "lol",
              name: found.name,
              data: found,
              message: `Champion Found! ✓`
            });
          } else {
            const suggestion = findClosestMatch(mlSearchQuery, searchData, c => c.name);
            setMlCheckError(`Champion "${mlSearchQuery}" not found.`);
            if (suggestion) {
              setMlSuggestion({ name: suggestion.name, type: "champion" });
            } else {
              setMlSuggestion(null);
            }
          }
        } else if (mlSearchType === "item") {
          searchData = result.data && typeof result.data === 'object' ? Object.values(result.data) : [];
          found = searchData.find(i => i.name && i.name.toLowerCase().includes(searchTerm));
          if (found) {
            setMlCheckResult({
              valid: true,
              type: "item",
              game: "lol",
              name: found.name,
              data: found,
              message: `Item Found! ✓`
            });
          } else {
            const suggestion = findClosestMatch(mlSearchQuery, searchData, i => i.name);
            setMlCheckError(`Item "${mlSearchQuery}" not found.`);
            if (suggestion) {
              setMlSuggestion({ name: suggestion.name, type: "item" });
            } else {
              setMlSuggestion(null);
            }
          }
        }
      }
      
      if (!found && !mlCheckError) {
        setMlCheckError(`${mlSearchType.charAt(0).toUpperCase() + mlSearchType.slice(1)} not found.`);
      }
    } catch (error) {
      console.error("Search error details:", error);
      let errorMsg = "Failed to fetch data";
      
      if (error.message.includes("Failed to fetch")) {
        errorMsg = "Network/CORS error - API may be unreachable. Try refreshing the page.";
      } else if (error.message.includes("Invalid JSON")) {
        errorMsg = "API returned invalid data format";
      } else {
        errorMsg = error.message;
      }
      
      setMlCheckError(`❌ ${errorMsg}`)
    } finally {
      setMlCheckLoading(false);
    }
  };

  // Reset detail tab when search result changes
  useEffect(() => {
    if (mlCheckResult && mlCheckResult.valid === true) {
      setWikiDetailTab("overview");
    }
  }, [mlCheckResult]);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "all" || game.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, filterCategory]);

  const scrollToGameCard = (gameId) => {
    setTimeout(() => {
      const gameCard = document.getElementById(`game-card-${gameId}`);
      if (gameCard) {
        gameCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 150);
  };

  return (
    <div>
      {/* Welcome Notification Modal */}
      {showWelcomeNotif && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999, padding: isMobile ? "0.75rem" : "1rem" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(30, 30, 45, 1), rgba(50, 20, 20, 1))", padding: isMobile ? "1.25rem" : "2rem", borderRadius: isMobile ? "10px" : "12px", border: "2px solid #ff3333", maxWidth: isMobile ? "360px" : "500px", width: "100%", textAlign: "center", boxShadow: isMobile ? "0 0 30px rgba(255, 51, 51, 0.35)" : "0 0 60px rgba(255, 51, 51, 0.5)", maxHeight: isMobile ? "84vh" : "90vh", overflowY: "auto" }}>
            <h2 style={{ color: "#ff3333", marginBottom: isMobile ? "0.75rem" : "1rem", fontSize: isMobile ? "1.35rem" : "1.8rem", fontWeight: "bold" }}>Welcome to Zeijin!</h2>
            <p style={{ color: "#d0d0d0", marginBottom: isMobile ? "1rem" : "1.5rem", lineHeight: "1.6", fontSize: isMobile ? "0.82rem" : "0.95rem" }}>
              👋 This website is for <strong>checking prices and game details</strong>. 
            </p>
            
            {/* 6 Steps */}
            <div style={{ background: "rgba(255, 51, 51, 0.08)", padding: isMobile ? "1rem" : "1.5rem", borderRadius: "8px", marginBottom: isMobile ? "1rem" : "1.5rem", textAlign: "left" }}>
              <p style={{ color: "#FF6B9D", fontWeight: "bold", marginBottom: isMobile ? "0.7rem" : "1rem", fontSize: isMobile ? "0.82rem" : "0.95rem" }}>📋 How It Works (6 Steps):</p>
              <div style={{ display: "grid", gap: isMobile ? "0.55rem" : "0.8rem", fontSize: isMobile ? "0.73rem" : "0.85rem" }}>
                <div style={{ color: "#e0e0e0", lineHeight: "1.4" }}><strong style={{ color: "#00ff88" }}>1. Browse Games</strong> 🎮 - Explore our 16+ popular games</div>
                <div style={{ color: "#e0e0e0", lineHeight: "1.4" }}><strong style={{ color: "#00ff88" }}>2. View Pricing</strong> 💰 - See currency packages in PHP</div>
                <div style={{ color: "#e0e0e0", lineHeight: "1.4" }}><strong style={{ color: "#00ff88" }}>3. Copy or Contact</strong> 📋 - Copy price or Order Form</div>
                <div style={{ color: "#e0e0e0", lineHeight: "1.4" }}><strong style={{ color: "#00ff88" }}>4. Fill Details</strong> ✍️ - Enter your account info</div>
                <div style={{ color: "#e0e0e0", lineHeight: "1.4" }}><strong style={{ color: "#00ff88" }}>5. Submit</strong> 📤 - Send your order</div>
                <div style={{ color: "#e0e0e0", lineHeight: "1.4" }}><strong style={{ color: "#00ff88" }}>6. We Process</strong> ⚡ - Get your currency!</div>
              </div>
            </div>
            
            <div style={{ background: "rgba(255, 51, 51, 0.1)", border: "1px solid rgba(255, 51, 51, 0.3)", padding: isMobile ? "1rem" : "1.5rem", borderRadius: "8px", marginBottom: isMobile ? "1rem" : "1.5rem", color: "#FFB3B3" }}>
              <p style={{ marginBottom: "0.7rem", fontSize: isMobile ? "0.78rem" : "0.9rem" }}>
                <strong>💰 Actual Transaction:</strong> All payments and transactions happen through <strong>Messenger, Telegram, or Instagram DM</strong> - NOT on this website.
              </p>
            </div>
            <button 
              onClick={() => setShowWelcomeNotif(false)}
              style={{
                background: "linear-gradient(135deg, #ff3333, #ff6b6b)",
                color: "white",
                border: "none",
                padding: isMobile ? "0.7rem 1.4rem" : "0.9rem 2.5rem",
                borderRadius: "25px",
                fontSize: isMobile ? "0.86rem" : "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s",
                width: "100%"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 51, 51, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Got it! Let's Browse →
            </button>
          </div>
        </div>
      )}

      <header>
        <div className="header-container">
          <div className="logo" onClick={() => { window.scrollTo(0, 0); window.location.reload(); }} style={{ cursor: "pointer", transition: "opacity 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }} onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}>
            <img src="/images/zeijin-logo.jpg" alt="Zeijin Discounted" style={{ height: "50px", width: "auto" }} />
            <span>Zeijin Discounted Top Up Sale PH</span>
          </div>
          <nav>
            <a href="#" style={{ marginLeft: "0", cursor: "pointer", color: "#FF6B9D", fontWeight: "bold", textDecoration: "none", fontSize: "0.95rem" }} onClick={(e) => { e.preventDefault(); setShowHowItWorks(true); }}>❓ How It Works</a>
            <a href="#" style={{ marginLeft: "1.5rem", cursor: "pointer", color: "#FF6B9D", fontWeight: "bold", textDecoration: "none", fontSize: "0.95rem" }} onClick={(e) => { e.preventDefault(); setShowMLIDChecker(true); }}>🔍 Game Fandom Wiki</a>
          </nav>
        </div>
      </header>

      {/* How It Works Modal */}
      <HowItWorksModal isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />

      {/* Game Fandom Wiki Modal */}
      {showMLIDChecker && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99998, padding: "1rem" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(30, 30, 45, 1), rgba(40, 20, 35, 1))", padding: isMobile ? "1.5rem" : "2rem", borderRadius: "12px", border: "2px solid #FF6B9D", maxWidth: "500px", width: "100%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 0 60px rgba(255, 107, 157, 0.4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ color: "#FF6B9D", margin: 0, fontSize: "1.5rem" }}>
                🎮 {wikiSelectedGame === "mlbb" ? "MLBB" : wikiSelectedGame === "valorant" ? "Valorant" : wikiSelectedGame === "genshin" ? "Genshin Impact" : "League of Legends"} Wiki
              </h2>
              <button 
                onClick={() => {
                  setShowMLIDChecker(false);
                  setMlSearchQuery("");
                  setMlCheckResult(null);
                  setMlCheckError("");
                }}
                style={{ background: "none", border: "none", color: "#a0a0a0", fontSize: "1.5rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: "#d0d0d0", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
              Search for game details from {wikiSelectedGame === "mlbb" ? "MLBB" : wikiSelectedGame === "valorant" ? "Valorant" : wikiSelectedGame === "genshin" ? "Genshin Impact" : "League of Legends"} Wiki.
            </p>

            {/* Game Selector */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", color: "#a0a0a0", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold" }}>
                Select Game
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                {["mlbb", "valorant", "genshin", "lol"].map(game => (
                  <button
                    key={game}
                    onClick={() => {
                      setWikiSelectedGame(game);
                      setMlSearchType(getSearchTypeOptions()[0]);
                      setMlSearchQuery("");
                      setMlCheckResult(null);
                      setMlCheckError("");
                    }}
                    style={{
                      padding: "0.7rem",
                      background: wikiSelectedGame === game ? "linear-gradient(135deg, #FF6B9D, #FF4757)" : "rgba(255, 255, 255, 0.05)",
                      border: wikiSelectedGame === game ? "none" : "1px solid rgba(255, 107, 157, 0.3)",
                      borderRadius: "6px",
                      color: wikiSelectedGame === game ? "white" : "#a0a0a0",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      fontSize: "0.85rem"
                    }}
                    onMouseEnter={(e) => {
                      if (wikiSelectedGame !== game) {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(255, 107, 157, 0.5)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (wikiSelectedGame !== game) {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor = "rgba(255, 107, 157, 0.3)";
                      }
                    }}
                  >
                    {game === "mlbb" ? "🎮 MLBB" : game === "valorant" ? "🔫 Valorant" : game === "genshin" ? "⭐ Genshin" : "⚔️ LoL"}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {mlCheckError && (
              <div>
                <div style={{ background: "rgba(255, 51, 51, 0.15)", border: "1px solid rgba(255, 51, 51, 0.4)", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem", color: "#FFB3B3", fontSize: "0.9rem" }}>
                  ❌ {mlCheckError}
                </div>
                
                {/* Suggestion Box */}
                {mlSuggestion && (
                  <div style={{ background: "rgba(100, 200, 255, 0.15)", border: "1px solid rgba(100, 200, 255, 0.4)", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem", color: "#64c8ff" }}>
                    <div style={{ fontSize: "0.85rem", marginBottom: "0.5rem" }}>💡 Did you mean:</div>
                    <button
                      onClick={() => {
                        setMlSearchQuery(mlSuggestion.name);
                        setMlCheckError("");
                        setMlSuggestion(null);
                        // The form will automatically search with the new query
                        // User would need to click search, or we can make it auto-trigger
                      }}
                      style={{
                        background: "rgba(100, 200, 255, 0.2)",
                        border: "1px solid rgba(100, 200, 255, 0.6)",
                        color: "#64c8ff",
                        padding: "0.5rem 1rem",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                        transition: "all 0.3s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(100, 200, 255, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(100, 200, 255, 0.2)";
                      }}
                    >
                      🔍 {mlSuggestion.name}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Waiting for VC Message */}
            {mlCheckResult && mlCheckResult.valid === null && (
              <div style={{ background: "rgba(100, 200, 255, 0.15)", border: "1px solid rgba(100, 200, 255, 0.4)", padding: "1.2rem", borderRadius: "8px", marginBottom: "1.5rem", color: "#64c8ff", fontSize: "0.9rem" }}>
                <div style={{ fontSize: "1.1rem", marginBottom: "0.8rem", fontWeight: "bold" }}>Searching...</div>
              </div>
            )}

            {/* Success Result with Tabs */}
            {mlCheckResult && mlCheckResult.valid === true && (
              <div style={{ background: "rgba(0, 255, 136, 0.15)", border: "1px solid rgba(0, 255, 136, 0.4)", padding: "1.2rem", borderRadius: "8px", marginBottom: "1.5rem", color: "#00ff88" }}>
                <div style={{ fontSize: "1.2rem", marginBottom: "1rem", fontWeight: "bold", color: "#00ff88" }}>✓ {mlCheckResult.message}</div>
                
                {/* Tab Navigation */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap", borderBottom: "1px solid rgba(0, 255, 136, 0.2)", paddingBottom: "0.8rem" }}>
                  <button
                    onClick={() => setWikiDetailTab("overview")}
                    style={{
                      padding: "0.5rem 1rem",
                      background: wikiDetailTab === "overview" ? "rgba(0, 255, 136, 0.3)" : "transparent",
                      color: wikiDetailTab === "overview" ? "#00ff88" : "#a0a0a0",
                      border: wikiDetailTab === "overview" ? "1px solid #00ff88" : "1px solid rgba(0, 255, 136, 0.2)",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => { if (wikiDetailTab !== "overview") e.currentTarget.style.background = "rgba(0, 255, 136, 0.1)"; }}
                    onMouseLeave={(e) => { if (wikiDetailTab !== "overview") e.currentTarget.style.background = "transparent"; }}
                  >
                    📋 Overview
                  </button>
                  
                  {(mlCheckResult.type === "hero" || mlCheckResult.type === "character" || mlCheckResult.type === "champion" || mlCheckResult.type === "agent") && (
                    <button
                      onClick={() => setWikiDetailTab("stats")}
                      style={{
                        padding: "0.5rem 1rem",
                        background: wikiDetailTab === "stats" ? "rgba(0, 255, 136, 0.3)" : "transparent",
                        color: wikiDetailTab === "stats" ? "#00ff88" : "#a0a0a0",
                        border: wikiDetailTab === "stats" ? "1px solid #00ff88" : "1px solid rgba(0, 255, 136, 0.2)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        transition: "all 0.3s"
                      }}
                      onMouseEnter={(e) => { if (wikiDetailTab !== "stats") e.currentTarget.style.background = "rgba(0, 255, 136, 0.1)"; }}
                      onMouseLeave={(e) => { if (wikiDetailTab !== "stats") e.currentTarget.style.background = "transparent"; }}
                    >
                      📊 Stats
                    </button>
                  )}
                  
                  {(mlCheckResult.type === "hero" || mlCheckResult.type === "character" || mlCheckResult.type === "champion" || mlCheckResult.type === "agent") && (
                    <button
                      onClick={() => setWikiDetailTab("abilities")}
                      style={{
                        padding: "0.5rem 1rem",
                        background: wikiDetailTab === "abilities" ? "rgba(0, 255, 136, 0.3)" : "transparent",
                        color: wikiDetailTab === "abilities" ? "#00ff88" : "#a0a0a0",
                        border: wikiDetailTab === "abilities" ? "1px solid #00ff88" : "1px solid rgba(0, 255, 136, 0.2)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        transition: "all 0.3s"
                      }}
                      onMouseEnter={(e) => { if (wikiDetailTab !== "abilities") e.currentTarget.style.background = "rgba(0, 255, 136, 0.1)"; }}
                      onMouseLeave={(e) => { if (wikiDetailTab !== "abilities") e.currentTarget.style.background = "transparent"; }}
                    >
                      ⚡ Abilities
                    </button>
                  )}
                </div>
                
                {/* Tab Content */}
                <div style={{ color: "#a0a0a0", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.85rem" }}>
                  {/* OVERVIEW TAB */}
                  {wikiDetailTab === "overview" && (
                    <>
                      {mlCheckResult.type === "hero" && mlCheckResult.data && (
                        <>
                          <div><strong>Hero:</strong> {mlCheckResult.data.hero_name}</div>
                          <div><strong>Title:</strong> {mlCheckResult.data.hero_title}</div>
                          <div><strong>Role:</strong> <span style={{ color: "#00ff88", fontWeight: "bold" }}>{mlCheckResult.data.role}</span></div>
                          <div><strong>Specialty:</strong> {mlCheckResult.data.specialty}</div>
                          <div><strong>Lane:</strong> {mlCheckResult.data.lane_recommendation}</div>
                          <div><strong>Region:</strong> {mlCheckResult.data.region_of_origin}</div>
                          <div><strong>Released:</strong> {mlCheckResult.data.release_date}</div>
                          <div><strong>Price:</strong> {mlCheckResult.data.bp_price} BP / {mlCheckResult.data.diamond_price} Diamonds</div>
                        </>
                      )}
                      {mlCheckResult.type === "item" && mlCheckResult.data && (
                        <>
                          <div><strong>Item:</strong> {mlCheckResult.data.item_name}</div>
                          <div><strong>Description:</strong> {mlCheckResult.data.description}</div>
                          {mlCheckResult.data.crit_chance && <div><strong>Crit Chance:</strong> {mlCheckResult.data.crit_chance}</div>}
                          {mlCheckResult.data.attack_power && <div><strong>Attack Power:</strong> {mlCheckResult.data.attack_power}</div>}
                          {mlCheckResult.data.magic_power && <div><strong>Magic Power:</strong> {mlCheckResult.data.magic_power}</div>}
                          {mlCheckResult.data.hp && <div><strong>HP:</strong> {mlCheckResult.data.hp}</div>}
                        </>
                      )}
                      {mlCheckResult.type === "agent" && mlCheckResult.data && (
                        <>
                          <div><strong>Agent:</strong> {mlCheckResult.data.displayName}</div>
                          <div><strong>Description:</strong> {mlCheckResult.data.description || "N/A"}</div>
                          {mlCheckResult.data.role && <div><strong>Role:</strong> <span style={{ color: "#00ff88", fontWeight: "bold" }}>{mlCheckResult.data.role.displayName}</span></div>}
                        </>
                      )}
                      {mlCheckResult.type === "character" && mlCheckResult.data && (
                        <>
                          <div><strong>Character:</strong> {mlCheckResult.data.name}</div>
                          {mlCheckResult.data.title && <div><strong>Title:</strong> {mlCheckResult.data.title}</div>}
                          {mlCheckResult.data.vision && <div><strong>Element:</strong> <span style={{ color: "#00ff88", fontWeight: "bold" }}>{mlCheckResult.data.vision}</span></div>}
                          {mlCheckResult.data.nation && <div><strong>Region:</strong> {mlCheckResult.data.nation}</div>}
                          {mlCheckResult.data.birthday && mlCheckResult.data.birthday !== "0000-05-27" && <div><strong>Birthday:</strong> {mlCheckResult.data.birthday}</div>}
                          {mlCheckResult.data.release && <div><strong>Release Date:</strong> {mlCheckResult.data.release}</div>}
                          {mlCheckResult.data.rarity && <div><strong>Rarity:</strong> ⭐ {mlCheckResult.data.rarity}</div>}
                          {mlCheckResult.data.weapon && <div><strong>Weapon Type:</strong> {mlCheckResult.data.weapon}</div>}
                          {mlCheckResult.data.wikiUrl && (
                            <div style={{ marginTop: "0.8rem" }}>
                              <a 
                                href={mlCheckResult.data.wikiUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                  display: "inline-block",
                                  padding: "0.5rem 1rem",
                                  background: "linear-gradient(135deg, #FF6B9D, #FF4757)",
                                  color: "#fff",
                                  textDecoration: "none",
                                  borderRadius: "6px",
                                  fontSize: "0.85rem",
                                  fontWeight: "bold",
                                  transition: "all 0.3s"
                                }}
                                onMouseEnter={(e) => {}}
                                onMouseLeave={(e) => {}}
                              >
                                📖 View on Fandom Wiki
                              </a>
                            </div>
                          )}
                        </>
                      )}
                      {mlCheckResult.type === "champion" && mlCheckResult.data && (
                        <>
                          <div><strong>Champion:</strong> {mlCheckResult.data.name}</div>
                          <div><strong>Title:</strong> {mlCheckResult.data.title || "N/A"}</div>
                          <div><strong>Region:</strong> {mlCheckResult.data.regions?.join(", ") || "N/A"}</div>
                        </>
                      )}
                    </>
                  )}
                  
                  {/* STATS TAB */}
                  {wikiDetailTab === "stats" && (
                    <>
                      {mlCheckResult.type === "hero" && mlCheckResult.data && (
                        <div style={{ background: "rgba(0, 255, 136, 0.05)", padding: "0.8rem", borderRadius: "6px", marginTop: "0.5rem" }}>
                          <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold", color: "#00ff88" }}>📊 Hero Stats Available</p>
                          <p style={{ fontSize: "0.8rem", color: "#a0a0a0" }}>Detailed stats information can be found in the official MLBB wiki. Role: <strong>{mlCheckResult.data.role}</strong> | Lane: <strong>{mlCheckResult.data.lane_recommendation}</strong></p>
                        </div>
                      )}
                      {mlCheckResult.type === "item" && mlCheckResult.data && (
                        <div style={{ background: "rgba(0, 255, 136, 0.05)", padding: "0.8rem", borderRadius: "6px", marginTop: "0.5rem" }}>
                          <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold", color: "#00ff88" }}>📊 Item Stats</p>
                          {mlCheckResult.data.attack_power && <div>⚔️ ATK: {mlCheckResult.data.attack_power}</div>}
                          {mlCheckResult.data.magic_power && <div>✨ Magic: {mlCheckResult.data.magic_power}</div>}
                          {mlCheckResult.data.crit_chance && <div>💥 Crit: {mlCheckResult.data.crit_chance}</div>}
                          {mlCheckResult.data.hp && <div>❤️ HP: {mlCheckResult.data.hp}</div>}
                        </div>
                      )}
                      {mlCheckResult.type === "character" && mlCheckResult.data && (
                        <div style={{ background: "rgba(0, 255, 136, 0.05)", padding: "0.8rem", borderRadius: "6px", marginTop: "0.5rem" }}>
                          <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold", color: "#00ff88" }}>📊 Character Stats</p>
                          {mlCheckResult.data.weapon && <div>🗡️ Weapon: {mlCheckResult.data.weapon}</div>}
                          {mlCheckResult.data.vision && <div>💎 Element: {mlCheckResult.data.vision}</div>}
                          {mlCheckResult.data.rarity && <div>⭐ Rarity: {mlCheckResult.data.rarity}</div>}
                          <p style={{ fontSize: "0.8rem", color: "#a0a0a0", marginTop: "0.5rem" }}>Visit the wiki for detailed combat stats and scaling information.</p>
                        </div>
                      )}
                      {mlCheckResult.type === "champion" && mlCheckResult.data && (
                        <div style={{ background: "rgba(0, 255, 136, 0.05)", padding: "0.8rem", borderRadius: "6px", marginTop: "0.5rem" }}>
                          <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold", color: "#00ff88" }}>📊 Champion Stats</p>
                          {mlCheckResult.data.regions && <div>🌍 Regions: {mlCheckResult.data.regions.join(", ")}</div>}
                          <p style={{ fontSize: "0.8rem", color: "#a0a0a0", marginTop: "0.5rem" }}>Visit League of Legends wiki for detailed base stats, scaling, and matchup information.</p>
                        </div>
                      )}
                      {mlCheckResult.type === "agent" && mlCheckResult.data && (
                        <div style={{ background: "rgba(0, 255, 136, 0.05)", padding: "0.8rem", borderRadius: "6px", marginTop: "0.5rem" }}>
                          <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold", color: "#00ff88" }}>📊 Agent Info</p>
                          {mlCheckResult.data.role && <div>🎯 Role: {mlCheckResult.data.role.displayName}</div>}
                          <p style={{ fontSize: "0.8rem", color: "#a0a0a0", marginTop: "0.5rem" }}>Visit Valorant official site for detailed ability cooldowns and exact stats.</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* ABILITIES TAB */}
                  {wikiDetailTab === "abilities" && (
                    <>
                      <div style={{ background: "rgba(0, 255, 136, 0.05)", padding: "0.8rem", borderRadius: "6px", marginTop: "0.5rem" }}>
                        <p style={{ marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold", color: "#00ff88" }}>⚡ Abilities & Skills</p>
                        {mlCheckResult.type === "hero" && (
                          <div style={{ fontSize: "0.8rem", color: "#a0a0a0", lineHeight: "1.6" }}>
                            <p>🎮 <strong>{mlCheckResult.data?.hero_name}</strong> has unique skills and mechanics!</p>
                            <p style={{ marginTop: "0.5rem" }}>Role: <strong>{mlCheckResult.data?.role}</strong> - Specialty: <strong>{mlCheckResult.data?.specialty}</strong></p>
                            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", fontStyle: "italic" }}>Visit the MLBB wiki or in-game for complete skill descriptions, cooldowns, and damage scaling.</p>
                          </div>
                        )}
                        {mlCheckResult.type === "character" && (
                          <div style={{ fontSize: "0.8rem", color: "#a0a0a0", lineHeight: "1.6" }}>
                            <p>🎮 <strong>{mlCheckResult.data?.name}</strong> ({mlCheckResult.data?.vision}) has special combat abilities!</p>
                            <p style={{ marginTop: "0.5rem" }}>Element: <strong>{mlCheckResult.data?.vision}</strong> - Weapon: <strong>{mlCheckResult.data?.weapon}</strong></p>
                            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", fontStyle: "italic" }}>View detailed talent trees, constellations, and ability upgrades on the official Genshin wiki.</p>
                          </div>
                        )}
                        {mlCheckResult.type === "champion" && (
                          <div style={{ fontSize: "0.8rem", color: "#a0a0a0", lineHeight: "1.6" }}>
                            <p>🎮 <strong>{mlCheckResult.data?.name}</strong> has unique abilities!</p>
                            <p style={{ marginTop: "0.5rem" }}>Each champion has a Passive, Q, W, E, and Ultimate (R) ability with unique mechanics.</p>
                            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", fontStyle: "italic" }}>Visit League of Legends wiki for detailed ability descriptions, cooldowns, and AP/AD scaling values.</p>
                          </div>
                        )}
                        {mlCheckResult.type === "agent" && (
                          <div style={{ fontSize: "0.8rem", color: "#a0a0a0", lineHeight: "1.6" }}>
                            <p>🎮 <strong>{mlCheckResult.data?.displayName}</strong> has utility and combat abilities!</p>
                            <p style={{ marginTop: "0.5rem" }}>Role: <strong>{mlCheckResult.data?.role?.displayName}</strong></p>
                            <p style={{ marginTop: "0.5rem", fontSize: "0.75rem", fontStyle: "italic" }}>Check Valorant official guide for complete ability descriptions, ranges, and cooldown information.</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Search Type Selector - Only show if multiple options */}
            {getSearchTypeOptions().length > 1 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", color: "#a0a0a0", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold" }}>
                What are you looking for?
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {getSearchTypeOptions().map(type => (
                  <button
                    key={type}
                    onClick={() => {
                      setMlSearchType(type);
                      setMlSearchQuery("");
                      setMlCheckResult(null);
                      setMlCheckError("");
                    }}
                    style={{
                      flex: 1,
                      padding: "0.7rem",
                      background: mlSearchType === type ? "linear-gradient(135deg, #FF6B9D, #FF4757)" : "rgba(255, 255, 255, 0.05)",
                      border: mlSearchType === type ? "none" : "1px solid rgba(255, 107, 157, 0.3)",
                      borderRadius: "6px",
                      color: mlSearchType === type ? "white" : "#a0a0a0",
                      fontWeight: "bold",
                      cursor: "pointer",
                      textTransform: "capitalize",
                      transition: "all 0.3s",
                      fontSize: "0.85rem"
                    }}
                    onMouseEnter={(e) => {
                      if (mlSearchType !== type) {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(255, 107, 157, 0.5)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (mlSearchType !== type) {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor = "rgba(255, 107, 157, 0.3)";
                      }
                    }}
                  >
                    {type === "hero" ? "🎮" : type === "agent" ? "🕵️" : type === "weapon" ? "⚔️" : type === "character" ? "⭐" : type === "champion" ? "👑" : type === "item" ? "⚙️" : "📦"} {type}
                  </button>
                ))}
              </div>
            </div>
            )}

            {/* Search Input */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", color: "#a0a0a0", marginBottom: "0.5rem", fontSize: "0.9rem", fontWeight: "bold" }}>
                {wikiSelectedGame === "mlbb" ? mlSearchType === "hero" ? "Hero Name" : "Item Name" : wikiSelectedGame === "valorant" ? mlSearchType === "agent" ? "Agent Name" : "Weapon Name" : wikiSelectedGame === "genshin" ? mlSearchType === "character" ? "Character Name" : "Weapon Name" : mlSearchType === "champion" ? "Champion Name" : "Item Name"}
              </label>
              <input 
                type="text"
                placeholder={wikiSelectedGame === "mlbb" ? mlSearchType === "hero" ? "e.g., Miya, Hanzo, Alice" : "e.g., Bloodlust Axe, Demon Hunter Sword" : wikiSelectedGame === "valorant" ? mlSearchType === "agent" ? "e.g., Jett, Phoenix, Sova" : "e.g., Vandal, Phantom, Operator" : wikiSelectedGame === "genshin" ? mlSearchType === "character" ? "e.g., Fischl, Zhongli, Venti" : "e.g., Calamity Queller, Frostbearer" : mlSearchType === "champion" ? "e.g., Ahri, Draven, Lux" : "e.g., Philosopher's Stone, Trinity Force"}
                value={mlSearchQuery}
                onChange={(e) => setMlSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && searchGameData()}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 107, 157, 0.3)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "0.95rem",
                  boxSizing: "border-box",
                  transition: "border-color 0.3s"
                }}
                onFocus={(e) => e.target.style.borderColor = "rgba(255, 107, 157, 0.6)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255, 107, 157, 0.3)"}
              />
              <small style={{ color: "#888", fontSize: "0.8rem", marginTop: "0.3rem", display: "block" }}>
                {mlSearchType === "hero" ? "Search for any MLBB hero" : "Search for game equipment/items"}
              </small>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "space-between" }}>
              <button 
                onClick={() => {
                  setShowMLIDChecker(false);
                  setMlSearchQuery("");
                  setMlCheckResult(null);
                  setMlCheckError("");
                }}
                style={{
                  flex: 1,
                  padding: "0.9rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 107, 157, 0.3)",
                  borderRadius: "8px",
                  color: "#a0a0a0",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 107, 157, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 107, 157, 0.3)";
                }}
              >
                {mlCheckResult && mlCheckResult.valid === true ? "Close" : "Cancel"}
              </button>
              <button 
                onClick={searchGameData}
                disabled={mlCheckLoading}
                style={{
                  flex: 1,
                  padding: "0.9rem",
                  background: "linear-gradient(135deg, #FF6B9D, #FF4757)",
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  fontWeight: "bold",
                  cursor: mlCheckLoading ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  opacity: mlCheckLoading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {}}
                onMouseLeave={(e) => {}}
              >
                {mlCheckLoading ? "Searching..." : "🔍 Search"}
              </button>
            </div>

            <p style={{ color: "#888", fontSize: "0.8rem", marginTop: "1rem", textAlign: "center" }}>
              Powered by MLBB Wiki API
            </p>
          </div>
        </div>
      )}

      <section className="hero">
        <h1>Browse • Chat • Get Your Currency</h1>
        <p>Discover the latest discounted game currency packages. Best prices for Philippine servers!</p>
      
        <a 
          href="https://m.me/ZeijinDiscountedTopUpSalePH" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            marginTop: "1.5rem",
            display: "inline-block",
            background: "linear-gradient(135deg, #ff3333, #ff6b6b)",
            color: "white",
            padding: isMobile ? "0.7rem 1.5rem" : "0.8rem 2rem",
            borderRadius: "25px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: isMobile ? "0.95rem" : "1.1rem",
            boxShadow: "0 4px 15px rgba(255, 51, 51, 0.4)",
            transition: "all 0.3s",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 51, 51, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 51, 51, 0.4)";
          }}
        >
          💬 Message Us on Messenger
        </a>
      </section>

      {/* Floating Contact Button */}
      <div style={{
        position: "fixed",
        bottom: isMobile ? "1rem" : "2rem",
        right: isMobile ? "1rem" : "2rem",
        zIndex: 8888,
        display: "flex",
        gap: isMobile ? "0.5rem" : "1rem",
        flexDirection: "column",
        alignItems: "flex-end"
      }}>
        <a
          href="https://m.me/ZeijinDiscountedTopUpSalePH"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on Messenger"
          style={{
            width: isMobile ? "45px" : "60px",
            height: isMobile ? "45px" : "60px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 132, 255, 0.5)",
            transition: "all 0.3s",
            textDecoration: "none",
            cursor: "pointer",
            padding: "8px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 132, 255, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 132, 255, 0.5)";
          }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/960px-Facebook_Messenger_logo_2020.svg.png" alt="Messenger" style={{ width: isMobile ? "32px" : "44px", height: isMobile ? "32px" : "44px" }} />
        </a>
        <a
          href="https://www.facebook.com/ZeijinDiscountedTopUpSalePH"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Facebook"
          style={{
            width: isMobile ? "45px" : "60px",
            height: isMobile ? "45px" : "60px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(24, 119, 242, 0.5)",
            transition: "all 0.3s",
            textDecoration: "none",
            cursor: "pointer",
            padding: "8px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(24, 119, 242, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(24, 119, 242, 0.5)";
          }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1280px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" style={{ width: isMobile ? "32px" : "44px", height: isMobile ? "32px" : "44px" }} />
        </a>
        <a
          href="https://t.me/Zeijin_Discounted_Top_Up_Sale_PH"
          target="_blank"
          rel="noopener noreferrer"
          title="Join Telegram"
          style={{
            width: isMobile ? "45px" : "60px",
            height: isMobile ? "45px" : "60px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0, 136, 204, 0.5)",
            transition: "all 0.3s",
            textDecoration: "none",
            cursor: "pointer",
            padding: "8px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 136, 204, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 136, 204, 0.5)";
          }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/960px-Telegram_logo.svg.png" alt="Telegram" style={{ width: isMobile ? "32px" : "44px", height: isMobile ? "32px" : "44px" }} />
        </a>
        <a
          href="https://www.instagram.com/zeijindiscountedgame?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          title="Follow on Instagram"
          style={{
            width: isMobile ? "45px" : "60px",
            height: isMobile ? "45px" : "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e02c70, #c13584)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: isMobile ? "1.5rem" : "1.8rem",
            boxShadow: "0 4px 15px rgba(224, 44, 112, 0.5)",
            transition: "all 0.3s",
            textDecoration: "none",
            cursor: "pointer",
            padding: "8px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(224, 44, 112, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(224, 44, 112, 0.5)";
          }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" style={{ width: isMobile ? "32px" : "44px", height: isMobile ? "32px" : "44px" }} />
        </a>
        <a
          href="https://m.me/j/AbYX1OEPa00PufWZ/"
          target="_blank"
          rel="noopener noreferrer"
          title="Join Broadcast Channel"
          style={{
            width: isMobile ? "45px" : "60px",
            height: isMobile ? "45px" : "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.5)",
            transition: "all 0.3s",
            textDecoration: "none",
            cursor: "pointer",
            fontSize: isMobile ? "2rem" : "2.6rem",
            padding: "8px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.5)";
          }}
        >
          <span style={{ lineHeight: 1, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>📢</span>
        </a>
      </div>

      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <EventCarousel 
            events={eventsData.filter(event => getEventStatus(event.startDate, event.endDate) !== "ended")} 
            getEventStatus={getEventStatus}
          />
        </div>

        {/* Wiki Search Prominent Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(255, 107, 157, 0.15), rgba(102, 126, 234, 0.15))",
          border: "2px solid rgba(255, 107, 157, 0.4)",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#FF6B9D", marginBottom: "0.5rem", fontSize: "1.5rem" }}>🔍 Game Fandom Wiki</h2>
          <p style={{ color: "#d0d0d0", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            Search for hero details, item stats, character info, and champion abilities across all games
          </p>
          <button
            onClick={() => setShowMLIDChecker(true)}
            style={{
              background: "linear-gradient(135deg, #FF6B9D, #FF8FB3)",
              color: "white",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "25px",
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 107, 157, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            🎮 Start Searching
          </button>
        </div>

        {activeSection === "games" && (
          <section className="games-container">
            
            <div style={{ marginBottom: "2rem" }}>
              <input 
                type="text" 
                placeholder="Search games..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  border: "1px solid rgba(255, 51, 51, 0.3)",
                  borderRadius: "20px",
                  background: "rgba(255, 51, 51, 0.05)",
                  color: "#e0e0e0",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div className="filter-bar">
              <button className={`filter-btn ${filterCategory === "all" ? "active" : ""}`} onClick={() => setFilterCategory("all")}>All Games</button>
              <button className={`filter-btn ${filterCategory === "moba" ? "active" : ""}`} onClick={() => setFilterCategory("moba")}>MOBA</button>
              <button className={`filter-btn ${filterCategory === "fps" ? "active" : ""}`} onClick={() => setFilterCategory("fps")}>FPS</button>
              <button className={`filter-btn ${filterCategory === "rpg" ? "active" : ""}`} onClick={() => setFilterCategory("rpg")}>RPG</button>
            </div>

            {filteredGames.length === 0 ? (
              <p style={{ color: "#a0a0a0", textAlign: "center", padding: "2rem" }}>No games found matching your search.</p>
            ) : (
              <div className="games-grid">
                {filteredGames.map(game => {
                  // Define discount percentages by game ID
                  const discountMap = {
                    1: "5-6%",    // Mobile Legends
                    2: "7%",       // Valorant
                    3: "7%",       // LOL Wild Rift
                    4: "5-6%",     // Call of Duty Mobile
                    5: "5-8%",     // Honor of Kings
                    6: "7%",       // Genshin Impact
                    7: "7%",       // Teamfight Tactics
                    8: "7%",       // LOL Riot Points
                    9: "7-8%",     // Blood Strike
                    10: "5-6%",    // Magic Chess Go Go
                    11: "5-6%",    // Crossfire Ecoin
                    12: "8-10%",   // PUBG Mobile UC
                    13: "7%",      // Honkai Star Rail
                    14: "-2%"     // Steam Wallet Codes
                  };
                  
                  const discount = discountMap[game.id] || "5%";
                  
                  const isPopular = game.pricing.length >= 10;
                  
                  return (
                    <div 
                      key={game.id}
                      id={`game-card-${game.id}`}
                      className={`game-card ${game.category}`}
                      style={{
                        height: "100%"
                      }}
                    >
                      {/* Game Image with Skeleton Loader */}
                      <div className="game-image" style={{ position: "relative", overflow: "hidden" }}>
                        {!imageLoadingStates[game.id] && (
                          <SkeletonLoader width="100%" height={isMobile ? "130px" : "200px"} borderRadius="0" />
                        )}
                        <img
                          src={game.image}
                          alt={game.title}
                          onLoad={() => setImageLoadingStates(prev => ({ ...prev, [game.id]: true }))}
                          onError={() => setImageLoadingStates(prev => ({ ...prev, [game.id]: true }))}
                          style={{
                            width: "100%",
                            height: isMobile ? "130px" : "200px",
                            objectFit: "contain",
                            objectPosition: "center",
                            background: "rgba(10, 10, 18, 0.9)",
                            opacity: imageLoadingStates[game.id] ? 1 : 0,
                            pointerEvents: imageLoadingStates[game.id] ? "auto" : "none",
                            transition: "opacity 0.3s ease-in"
                          }}
                        />
                        {imageLoadingStates[game.id] && (
                          <>
                            {isPopular && (
                              <div style={{
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                background: "linear-gradient(135deg, #ffa500, #ff6347)",
                                color: "white",
                                padding: "0.4rem 0.8rem",
                                borderRadius: "8px",
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                                boxShadow: "0 4px 12px rgba(255, 165, 0, 0.4)",
                                zIndex: 10,
                                textTransform: "uppercase"
                              }}>
                                🔥 Popular
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      <div className="game-info">
                        <div className="game-title">{game.title}</div>
                        <div className="game-description">{game.description}</div>
                        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: "1rem" }}>
                          <div style={{ color: "#00ff88", fontSize: "0.9rem" }}>
                            {game.pricing.length} packages available
                          </div>
                          <div style={{
                            background: game.category === "moba" ? "rgba(0, 212, 255, 0.2)" : game.category === "fps" ? "rgba(255, 165, 0, 0.2)" : "rgba(157, 78, 221, 0.2)",
                            color: game.category === "moba" ? "#00d4ff" : game.category === "fps" ? "#ffa500" : "#9d4edd",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "15px",
                            fontSize: "0.75rem",
                            fontWeight: "bold"
                          }}>
                            {game.category.toUpperCase()}
                          </div>
                        </div>
                        {/* Contact CTAs */}
                        <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
                          <button
                            onClick={() => setSelectedGame(game)}
                            style={{
                              flex: 1,
                              background: "rgba(255, 51, 51, 0.2)",
                              border: "1px solid rgba(255, 51, 51, 0.5)",
                              color: "#ff3333",
                              padding: "0.5rem",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "0.85rem",
                              fontWeight: "bold",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(255, 51, 51, 0.3)";
                              e.currentTarget.style.borderColor = "#ff3333";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255, 51, 51, 0.2)";
                              e.currentTarget.style.borderColor = "rgba(255, 51, 51, 0.5)";
                            }}
                          >
                            View Prices
                          </button>
                          <button
                            onClick={() => setContactGame(game)}
                            style={{
                              flex: 1,
                              background: "linear-gradient(135deg, #ff3333, #ff6b6b)",
                              color: "white",
                              padding: "0.5rem",
                              borderRadius: "6px",
                              textDecoration: "none",
                              fontSize: "0.85rem",
                              fontWeight: "bold",
                              textAlign: "center",
                              transition: "all 0.2s",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "none"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.05)";
                              e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 51, 51, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "16px", height: "16px", marginRight: "0.3rem" }}>
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                                <circle cx="6" cy="8" r="2.2" fill="currentColor" />
                                <circle cx="18" cy="8" r="2.2" fill="currentColor" />
                                <circle cx="12" cy="17" r="2.2" fill="currentColor" />
                                <path d="M8 8h8M7.8 9.2l2.7 5.2M16.2 9.2l-2.7 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                              </svg>
                            </span>
                            Order Form
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Game Not in List Message */}
            <div style={{ 
              background: "linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(255, 51, 51, 0.1))", 
              border: "2px solid rgba(255, 107, 157, 0.4)", 
              padding: "2rem", 
              borderRadius: "12px", 
              textAlign: "center", 
              marginTop: "3rem",
              maxWidth: "600px",
              margin: "3rem auto 0"
            }}>
              <h3 style={{ color: "#FF6B9D", marginBottom: "1rem", fontSize: "1.2rem" }}>🎮 Game Not Listed?</h3>
              <p style={{ color: "#d0d0d0", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                Don't see the game you want? No problem! We offer top-ups for many other games as well.
              </p>
              <p style={{ color: "#a0a0a0", marginBottom: "1.5rem", fontSize: "0.9rem", fontStyle: "italic" }}>
                Just message us directly and ask! We'll do our best to help you.
              </p>
              <a 
                href="https://m.me/ZeijinDiscountedTopUpSalePH" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #FF6B9D, #FF4757)",
                  color: "white",
                  padding: "0.8rem 2rem",
                  borderRadius: "25px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  transition: "all 0.3s",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 51, 51, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 51, 51, 0.4)";
                }}
              >
                💬 Message Us Now
              </a>
            </div>
          </section>
        )}

        {/* Customer Feedback & Credibility Section */}
        <section className="container" style={{ marginTop: "3rem" }}>
          <h2 className="section-title">⭐ Customer Feedback & Trust</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: "2rem",
            marginBottom: "2rem"
          }}>
            {/* See All Reviews Card */}
            <a
              href="https://www.facebook.com/share/p/1CSNu52eph/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(102, 126, 234, 0.1))",
                border: "2px solid rgba(0, 255, 136, 0.3)",
                borderRadius: "12px",
                padding: "2rem",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                transition: "all 0.3s",
                cursor: "pointer",
                minHeight: "200px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(102, 126, 234, 0.2))";
                e.currentTarget.style.borderColor = "#00ff88";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(102, 126, 234, 0.1))";
                e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "3rem" }}>⭐⭐⭐⭐⭐</div>
              <div>
                <h3 style={{ color: "#00ff88", marginBottom: "0.5rem", fontSize: "1.3rem", fontWeight: "bold" }}>See All Customer Reviews</h3>
                <p style={{ color: "#a0a0a0", fontSize: "0.95rem" }}>Real feedback from thousands of satisfied Filipino gamers on Facebook</p>
              </div>
              <button style={{
                background: "rgba(0, 255, 136, 0.2)",
                border: "1px solid #00ff88",
                color: "#00ff88",
                padding: "0.6rem 1.5rem",
                borderRadius: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.2s",
                marginTop: "0.5rem"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 255, 136, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 255, 136, 0.2)";
              }}>
                View on Facebook →
              </button>
            </a>

            {/* Trust & Verification Card */}
            <div style={{
              background: "linear-gradient(135deg, rgba(255, 51, 51, 0.08), rgba(255, 165, 0, 0.08))",
              border: "2px solid rgba(255, 51, 51, 0.2)",
              borderRadius: "12px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1.5rem"
            }}>
              <div>
                <h3 style={{ color: "#ff3333", marginBottom: "1rem", fontSize: "1.2rem", fontWeight: "bold" }}>✓ Verified & Registered</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ fontSize: "1.8rem", minWidth: "40px" }}>✓</div>
                    <div>
                      <div style={{ color: "#0084ff", fontWeight: "bold", marginBottom: "0.2rem" }}>Facebook Verified Business</div>
                      <div style={{ color: "#a0a0a0", fontSize: "0.9rem" }}>Officially verified on Meta platforms</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ fontSize: "1.8rem", minWidth: "40px" }}>📋</div>
                    <div>
                      <div style={{ color: "#ffa500", fontWeight: "bold", marginBottom: "0.2rem" }}>DTI Registered</div>
                      <div style={{ color: "#a0a0a0", fontSize: "0.9rem" }}>Legitimate business registered with PH Department of Trade & Industry</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ fontSize: "1.8rem", minWidth: "40px" }}>🔒</div>
                    <div>
                      <div style={{ color: "#00ff88", fontWeight: "bold", marginBottom: "0.2rem" }}>100% Safe & Secure</div>
                      <div style={{ color: "#a0a0a0", fontSize: "0.9rem" }}>Trusted by thousands of PH and global players</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ fontSize: "1.8rem", minWidth: "40px" }}>✓</div>
                    <div>
                      <div style={{ color: "#00ff88", fontWeight: "bold", marginBottom: "0.2rem" }}>Trusted by PH and Global Players</div>
                      <div style={{ color: "#a0a0a0", fontSize: "0.9rem" }}>Thousands of satisfied customers worldwide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods & Info Section */}
        <section className="container" style={{ marginTop: "3rem" }}>
          <h2 className="section-title">💳 Payment Methods</h2>
          <div style={{
            background: "rgba(255, 51, 51, 0.05)",
            border: "2px solid rgba(255, 51, 51, 0.2)",
            borderRadius: "12px",
            padding: isMobile ? "1.5rem 1rem" : "2rem",
            marginBottom: "2rem"
          }}>
            <p style={{ color: "#d0d0d0", marginBottom: "1.5rem", fontSize: isMobile ? "0.95rem" : "1.1rem", fontWeight: "bold" }}>We accept the following payment methods via Messenger:</p>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(200px, 1fr))", gap: isMobile ? "0.75rem" : "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "rgba(0, 132, 255, 0.1)", padding: isMobile ? "1rem 0.75rem" : "1.5rem", borderRadius: "8px", border: "1px solid #0084ff", textAlign: "center" }}>
                <img src="https://static.vecteezy.com/system/resources/previews/067/065/665/non_2x/gcash-logo-square-rounded-gcash-logo-free-download-gcash-logo-free-png.png" alt="GCash" style={{ width: isMobile ? "40px" : "48px", height: isMobile ? "40px" : "48px", marginBottom: isMobile ? "0.3rem" : "0.5rem" }} />
                <div style={{ color: "#0084ff", fontWeight: "bold", fontSize: isMobile ? "0.95rem" : "1.1rem", marginBottom: isMobile ? "0.5rem" : "0.75rem" }}>GCash</div>
                <div style={{ fontSize: isMobile ? "0.7rem" : "0.85rem", color: "#a0a0a0" }}>⚡ Fastest delivery (5-10 mins)</div>
              </div>
              <div style={{ background: "rgba(255, 165, 0, 0.1)", padding: isMobile ? "1rem 0.75rem" : "1.5rem", borderRadius: "8px", border: "1px solid #ffa500", textAlign: "center" }}>
                <img src="https://logodix.com/logo/2206759.jpg" alt="PayMaya" style={{ width: isMobile ? "40px" : "48px", height: isMobile ? "40px" : "48px", marginBottom: isMobile ? "0.3rem" : "0.5rem" }} />
                <div style={{ color: "#ffa500", fontWeight: "bold", fontSize: isMobile ? "0.95rem" : "1.1rem", marginBottom: isMobile ? "0.5rem" : "0.75rem" }}>PayMaya</div>
                <div style={{ fontSize: isMobile ? "0.7rem" : "0.85rem", color: "#a0a0a0" }}>⚡ Fast delivery (10-15 mins)</div>
              </div>
              <div style={{ background: "rgba(0, 51, 102, 0.1)", padding: isMobile ? "1rem 0.75rem" : "1.5rem", borderRadius: "8px", border: "1px solid #003366", textAlign: "center" }}>
                <img src="https://logodix.com/logo/925694.png" alt="BDO" style={{ width: isMobile ? "40px" : "48px", height: isMobile ? "40px" : "48px", marginBottom: isMobile ? "0.3rem" : "0.5rem" }} />
                <div style={{ color: "#4a90e2", fontWeight: "bold", fontSize: isMobile ? "0.95rem" : "1.1rem", marginBottom: isMobile ? "0.5rem" : "0.75rem" }}>BDO Bank Transfer</div>
                <div style={{ fontSize: isMobile ? "0.7rem" : "0.85rem", color: "#a0a0a0" }}>⏱ Standard delivery (15-30 mins)</div>
              </div>
              <div style={{ background: "rgba(204, 0, 0, 0.1)", padding: isMobile ? "1rem 0.75rem" : "1.5rem", borderRadius: "8px", border: "1px solid #cc0000", textAlign: "center" }}>
                <img src="https://images.seeklogo.com/logo-png/35/1/bpi-bank-of-the-philippine-islands-logo-png_seeklogo-352316.png" alt="BPI" style={{ width: isMobile ? "40px" : "48px", height: isMobile ? "40px" : "48px", marginBottom: isMobile ? "0.3rem" : "0.5rem" }} />
                <div style={{ color: "#cc0000", fontWeight: "bold", fontSize: isMobile ? "0.95rem" : "1.1rem", marginBottom: isMobile ? "0.5rem" : "0.75rem" }}>BPI Bank Transfer</div>
                <div style={{ fontSize: isMobile ? "0.7rem" : "0.85rem", color: "#a0a0a0" }}>⏱ Standard delivery (15-30 mins)</div>
              </div>
            </div>
            <p style={{ color: "#a0a0a0", fontSize: isMobile ? "0.8rem" : "0.9rem", marginBottom: "1rem" }}>
              💡 Other bank transfers available via GCash. Contact us for details!
            </p>
            <div style={{ background: "rgba(0, 255, 136, 0.1)", padding: isMobile ? "0.75rem" : "1rem", borderRadius: "8px", border: "1px solid #00ff88" }}>
              <p style={{ color: "#00ff88", fontSize: isMobile ? "0.8rem" : "0.95rem", margin: "0", fontWeight: "bold" }}>
                🔐 <strong>Important:</strong> Final payment is processed directly via Messenger. We never ask for sensitive payment info upfront!
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container" style={{ marginTop: "3rem", marginBottom: "3rem" }}>
          <h2 className="section-title">❓ Frequently Asked Questions</h2>
          <div style={{ display: "grid", gap: "1rem" }}>
            <details style={{
              background: "rgba(255, 51, 51, 0.05)",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(255, 51, 51, 0.2)",
              cursor: "pointer"
            }} open>
              <summary style={{ color: "#ff3333", fontWeight: "bold", fontSize: "1.1rem", userSelect: "none" }}>
                📋 How to Order - Step by Step
              </summary>
              <div style={{ color: "#c0c0c0", marginTop: "1rem" }}>
                <ol style={{ marginLeft: "1.5rem", lineHeight: "2" }}>
                  <li><strong>Browse Products:</strong> Scroll through our games and select the one you want. Each game has multiple currency packages.</li>
                  <li><strong>Message Us:</strong> Click "💬 Order Form" on the game card or use the floating messenger button in the bottom right corner.</li>
                  <li><strong>Confirm Details:</strong> Tell us which game currency you want and how much. We'll confirm the price and payment method.</li>
                  <li><strong>Send Payment:</strong> Transfer payment via GCash, PayMaya, BDO, or BPI (fastest with GCash).</li>
                  <li><strong>Receive Instantly:</strong> Once payment is confirmed, we'll deliver your game currency within 5-30 minutes.</li>
                </ol>
                <p style={{ marginTop: "1rem", fontStyle: "italic", color: "#a0a0a0" }}>
                  💡 Tip: Use the "Copy Price" button to quickly copy package details and send them via Messenger!
                </p>
              </div>
            </details>

            <details style={{
              background: "rgba(255, 51, 51, 0.05)",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(255, 51, 51, 0.2)",
              cursor: "pointer"
            }}>
              <summary style={{ color: "#ff3333", fontWeight: "bold", fontSize: "1.1rem", userSelect: "none" }}>
                How long does delivery take?
              </summary>
              <p style={{ color: "#c0c0c0", marginTop: "1rem" }}>
                Most orders are delivered instantly to your game account within 5 minutes after payment confirmation. For some games, it may take up to 30 minutes depending on server load.
              </p>
            </details>

            <details style={{
              background: "rgba(255, 51, 51, 0.05)",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(255, 51, 51, 0.2)",
              cursor: "pointer"
            }}>
              <summary style={{ color: "#ff3333", fontWeight: "bold", fontSize: "1.1rem", userSelect: "none" }}>
                What if I don't receive my currency?
              </summary>
              <p style={{ color: "#c0c0c0", marginTop: "1rem" }}>
                We guarantee 100% delivery. If you don't receive your currency within 1 hour, contact us immediately via Messenger or Facebook. We'll resolve it right away!
              </p>
            </details>

            <details style={{
              background: "rgba(255, 51, 51, 0.05)",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(255, 51, 51, 0.2)",
              cursor: "pointer"
            }}>
              <summary style={{ color: "#ff3333", fontWeight: "bold", fontSize: "1.1rem", userSelect: "none" }}>
                Are these prices official or discounted?
              </summary>
              <p style={{ color: "#c0c0c0", marginTop: "1rem" }}>
                These are discounted prices! We offer 5-10% savings compared to official game prices. We pass these savings directly to you!
              </p>
            </details>

            <details style={{
              background: "rgba(255, 51, 51, 0.05)",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(255, 51, 51, 0.2)",
              cursor: "pointer"
            }}>
              <summary style={{ color: "#ff3333", fontWeight: "bold", fontSize: "1.1rem", userSelect: "none" }}>
                Is it safe to buy from Zeijin?
              </summary>
              <p style={{ color: "#c0c0c0", marginTop: "1rem" }}>
                Yes! We've been trusted by thousands of Filipino gamers. We provide instant delivery and 100% money-back guarantee if something goes wrong.
              </p>
            </details>

            <details style={{
              background: "rgba(255, 51, 51, 0.05)",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(255, 51, 51, 0.2)",
              cursor: "pointer"
            }}>
              <summary style={{ color: "#ff3333", fontWeight: "bold", fontSize: "1.1rem", userSelect: "none" }}>
                Can I request a refund?
              </summary>
              <p style={{ color: "#c0c0c0", marginTop: "1rem" }}>
                Once delivered, refunds are not available as the currency is added to your account. However, if there's an issue with delivery, we'll redeliver immediately at no cost!
              </p>
            </details>

            <details style={{
              background: "rgba(255, 51, 51, 0.05)",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(255, 51, 51, 0.2)",
              cursor: "pointer"
            }}>
              <summary style={{ color: "#ff3333", fontWeight: "bold", fontSize: "1.1rem", userSelect: "none" }}>
                Do you have Steam Wallet codes?
              </summary>
              <p style={{ color: "#c0c0c0", marginTop: "1rem" }}>
                Yes! Steam Wallet codes are available on our site with 1-2% discount. Just scroll down to find "Steam Wallet Codes" in the list and choose your desired amount. All codes are delivered instantly!
              </p>
            </details>
          </div>
        </section>

      </div>

      <footer>
        <p>&copy; Since 2021 Zeijin Discounted Top Up Sale PH.</p>
        <p style={{ fontSize: "0.85rem", color: "#707070", marginTop: "0.5rem" }}>
          NOTE: Pricelist may change on different times, depending on events. Thank you and happy gaming 💖
        </p>
      </footer>

      {/* Contact Choice Modal with IGN Validator */}
      {contactGame && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(4, 8, 14, 0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: isMobile ? "1rem" : "2rem", paddingTop: isMobile ? "2rem" : "2rem", paddingBottom: isMobile ? "2rem" : "2rem", overflowY: "auto" }}>
          <div style={{ background: "linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(10, 14, 24, 0.98))", padding: isMobile ? "1.5rem" : "2rem", borderRadius: "10px", border: "1px solid rgba(148, 163, 184, 0.25)", borderTop: "3px solid #ff4d4d", maxWidth: "550px", width: "100%", maxHeight: isMobile ? "90vh" : "85vh", overflowY: "auto", boxShadow: "0 24px 48px rgba(0, 0, 0, 0.45)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ color: "#f8fafc", marginBottom: "0.3rem", fontSize: "1.6rem" }}>📝 Order Details</h2>
                <p style={{ color: "#94a3b8", marginBottom: "0", fontSize: "0.85rem" }}>{contactGame.title}</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button 
                  onClick={() => {
                    setSelectedGame(contactGame);
                    setContactGame(null);
                    setActiveSection("games");
                    setIgnValidatorData({ ign: "", orderedAmount: "", paymentMethod: "GCash", otherConcern: "" });
                    setFormValidationErrors({});
                    scrollToGameCard(contactGame.id);
                  }} 
                  style={{ 
                    background: "rgba(148, 163, 184, 0.12)", 
                    border: "1px solid rgba(148, 163, 184, 0.35)", 
                    color: "#cbd5e1", 
                    fontSize: "0.75rem", 
                    cursor: "pointer",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(148, 163, 184, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(148, 163, 184, 0.12)";
                  }}
                >
                  ← Back to Prices
                </button>
                <button 
                  onClick={() => {
                    setSelectedGame(contactGame);
                    setContactGame(null);
                    setActiveSection("games");
                    setIgnValidatorData({ ign: "", orderedAmount: "", paymentMethod: "GCash", otherConcern: "" });
                    setFormValidationErrors({});
                    scrollToGameCard(contactGame.id);
                  }} 
                  style={{ 
                    background: "transparent", 
                    border: "none", 
                    color: "#94a3b8", 
                    fontSize: "1.5rem", 
                    cursor: "pointer",
                    padding: "0.5rem",
                    lineHeight: "1"
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* IGN Validator Form - Step 1 */}
            <h3 style={{ color: "#e2e8f0", fontSize: "1rem", fontWeight: "bold", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ background: "#ff4d4d", color: "#ffffff", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.9rem" }}>1</span> Order Details</h3>
            
            {/* Validation Error Messages */}
            {Object.keys(formValidationErrors).length > 0 && (
              <div style={{
                background: "rgba(127, 29, 29, 0.28)",
                border: "1px solid rgba(239, 68, 68, 0.45)",
                borderRadius: "6px",
                padding: "1rem",
                marginBottom: "1rem"
              }}>
                <div style={{ color: "#fca5a5", fontWeight: "bold", marginBottom: "0.5rem", fontSize: "0.9rem" }}>⚠️ Please fix the following errors:</div>
                {Object.entries(formValidationErrors).map(([field, error]) => (
                  <div key={field} style={{ color: "#fecaca", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                    • {error}
                  </div>
                ))}
              </div>
            )}
            
            <div style={{ background: "rgba(15, 23, 42, 0.55)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(148, 163, 184, 0.25)", marginBottom: "1.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", color: "#e2e8f0", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.4rem" }}>
                  💰 Order Amount (Php)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 500, 1000"
                  max="9999999"
                  value={ignValidatorData.orderedAmount}
                  onChange={(e) => setIgnValidatorData({...ignValidatorData, orderedAmount: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    border: formValidationErrors.orderedAmount ? "2px solid #ef4444" : "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: "6px",
                    background: "rgba(15, 23, 42, 0.7)",
                    color: "#e2e8f0",
                    boxSizing: "border-box",
                    fontSize: "0.9rem"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", color: "#e2e8f0", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.4rem" }}>
                  👤 In-Game User ID / Username
                </label>
                <input
                  type="text"
                  placeholder="Your game username or UID"
                  maxLength="50"
                  value={ignValidatorData.ign}
                  onChange={(e) => setIgnValidatorData({...ignValidatorData, ign: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    border: formValidationErrors.ign ? "2px solid #ef4444" : "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: "6px",
                    background: "rgba(15, 23, 42, 0.7)",
                    color: "#e2e8f0",
                    boxSizing: "border-box",
                    fontSize: "0.9rem"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", color: "#e2e8f0", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.4rem" }}>
                  💳 Payment Method
                </label>
                <select
                  value={ignValidatorData.paymentMethod}
                  onChange={(e) => setIgnValidatorData({...ignValidatorData, paymentMethod: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: "6px",
                    background: "rgba(15, 23, 42, 0.7)",
                    color: "#e2e8f0",
                    boxSizing: "border-box",
                    fontSize: "0.9rem",
                    cursor: "pointer"
                  }}
                >
                  <option value="GCash" style={{ background: "#1a1a1a", color: "#e0e0e0" }}>GCash</option>
                  <option value="Maya" style={{ background: "#1a1a1a", color: "#e0e0e0" }}>Maya</option>
                  <option value="BDO" style={{ background: "#1a1a1a", color: "#e0e0e0" }}>BDO Bank Transfer</option>
                  <option value="BPI" style={{ background: "#1a1a1a", color: "#e0e0e0" }}>BPI Bank Transfer</option>
                </select>
              </div>

              <div style={{ marginBottom: "0" }}>
                <label style={{ display: "block", color: "#e2e8f0", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.4rem" }}>
                  ❓ Other Concerns (Optional)
                </label>
                <textarea
                  placeholder="Any questions or special requests?"
                  maxLength="500"
                  value={ignValidatorData.otherConcern}
                  onChange={(e) => setIgnValidatorData({...ignValidatorData, otherConcern: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: "6px",
                    background: "rgba(15, 23, 42, 0.7)",
                    color: "#e2e8f0",
                    boxSizing: "border-box",
                    fontSize: "0.9rem",
                    minHeight: "70px",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                />
              </div>
            </div>

            {/* Platform Selection - Step 2 */}
            <h3 style={{ color: "#e2e8f0", fontSize: "1rem", fontWeight: "bold", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ background: "#ff4d4d", color: "#ffffff", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.9rem" }}>2</span> Choose a Platform</h3>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {/* Messenger Option */}
                <div
                  onClick={() => {
                    if (validateContactForm()) {
                      const message = `Hi! I'm interested in ${contactGame.title} and would like to know more about the pricing and packages.\n\nOrder Amount: ${ignValidatorData.orderedAmount}\nUID: ${ignValidatorData.ign}\nMode of payment: ${ignValidatorData.paymentMethod}\n\nOther concern: ${ignValidatorData.otherConcern || 'None'}`;
                      const messengerUrl = `https://m.me/ZeijinDiscountedTopUpSalePH?text=${encodeURIComponent(message)}`;
                      window.open(messengerUrl, '_blank');
                    }
                  }}
                  style={{
                    background: "rgba(15, 23, 42, 0.72)",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: "8px",
                    padding: "1rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    transition: "all 0.3s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(30, 41, 59, 0.88)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(15, 23, 42, 0.72)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/960px-Facebook_Messenger_logo_2020.svg.png" alt="Messenger" style={{ width: "32px", height: "32px" }} />
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div style={{ color: "#0084ff", fontWeight: "bold", fontSize: "0.95rem" }}>Messenger</div>
                    <div style={{ color: "#a0a0a0", fontSize: "0.75rem" }}>Fastest response</div>
                  </div>
                  <span style={{ color: "#0084ff", fontWeight: "bold" }}>→</span>
                </div>

                {/* Telegram Option */}
                <div
                  onClick={() => {
                    if (validateContactForm()) {
                      const message = `Hi! I'm interested in ${contactGame.title} and would like to know more about the pricing and packages.\n\nOrder Amount: ${ignValidatorData.orderedAmount}\nUID: ${ignValidatorData.ign}\nMode of payment: ${ignValidatorData.paymentMethod}\n\nOther concern: ${ignValidatorData.otherConcern || 'None'}`;
                      const telegramUrl = `https://t.me/Zeijin_Discounted_Top_Up_Sale_PH?text=${encodeURIComponent(message)}`;
                      window.open(telegramUrl, '_blank');
                    }
                  }}
                  style={{
                    background: "rgba(15, 23, 42, 0.72)",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: "8px",
                    padding: "1rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    transition: "all 0.3s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(30, 41, 59, 0.88)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(15, 23, 42, 0.72)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/960px-Telegram_logo.svg.png" alt="Telegram" style={{ width: "32px", height: "32px" }} />
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div style={{ color: "#0088cc", fontWeight: "bold", fontSize: "0.95rem" }}>Telegram</div>
                    <div style={{ color: "#a0a0a0", fontSize: "0.75rem" }}>Secure & fast</div>
                  </div>
                  <span style={{ color: "#0088cc", fontWeight: "bold" }}>→</span>
                </div>

                {/* Instagram Option */}
                <div
                  onClick={() => {
                    if (validateContactForm()) {
                      const instagramUrl = "https://ig.me/m/zeijindiscountedgame";
                      window.open(instagramUrl, '_blank');
                    }
                  }}
                  style={{
                    background: "rgba(15, 23, 42, 0.72)",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    borderRadius: "8px",
                    padding: "1rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    transition: "all 0.3s",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(30, 41, 59, 0.88)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(15, 23, 42, 0.72)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" style={{ width: "32px", height: "32px" }} />
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div style={{ color: "#e02c70", fontWeight: "bold", fontSize: "0.95rem" }}>Instagram DM</div>
                    <div style={{ color: "#a0a0a0", fontSize: "0.75rem" }}>Direct message</div>
                  </div>
                  <span style={{ color: "#e02c70", fontWeight: "bold" }}>→</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                setSelectedGame(contactGame);
                setContactGame(null);
                setActiveSection("games");
                setIgnValidatorData({ ign: "", orderedAmount: "", paymentMethod: "GCash", otherConcern: "" });
                setFormValidationErrors({});
                scrollToGameCard(contactGame.id);
              }} 
              style={{ 
                background: "rgba(148, 163, 184, 0.12)", 
                color: "#e2e8f0", 
                padding: "0.65rem 1.5rem", 
                border: "1px solid rgba(148, 163, 184, 0.35)",
                borderRadius: "20px", 
                cursor: "pointer", 
                fontSize: "0.95rem",
                width: "100%",
                fontWeight: "bold",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(148, 163, 184, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(148, 163, 184, 0.12)";
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Pricing Modal Component */}
      <PricingModal 
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        isMobile={isMobile}
        onContactForm={(game) => {
          setContactGame(game);
          setActiveSection("contact");
        }}
      />

      {/* Ask Us Feature - Floating Button */}
      <AskUs />
    </div>
  );
}