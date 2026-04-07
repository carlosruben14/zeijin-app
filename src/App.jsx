import { useState, useMemo } from "react";
import "./App.css";
import "./index.css";

const gamesData = [
  {
    id: 1,
    title: "Mobile Legends: Bang Bang",
    category: "moba",
    description: "MLBB Discounted Dias - Fight with your team!",
    image: "https://assets-prd.ignimgs.com/2023/09/30/mobilelegends-1696089976653.jpg?crop=1%3A1%2Csmart&format=jpg&auto=webp&quality=80",
    pricing: [
      { amount: "56", price: 50, currency: "₱" },
      { amount: "112", price: 98 },
      { amount: "168", price: 147 },
      { amount: "223", price: 192 },
      { amount: "279", price: 242 },
      { amount: "336", price: 287 },
      { amount: "570", price: 480 },
      { amount: "793", price: 670 },
      { amount: "906", price: 768 },
      { amount: "1163", price: 945 },
      { amount: "2398", price: 1890 },
      { amount: "3561", price: 2835 },
      { amount: "5132", price: 4067 },
      { amount: "6042", price: 4765 }
    ]
  },
  {
    id: 2,
    title: "Valorant",
    category: "fps",
    description: "Valorant Discounted VP - Tactical Shooter",
    image: "https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg",
    pricing: [
      { amount: "475 VP", price: 182 },
      { amount: "1,000 VP", price: 364 },
      { amount: "1,475 VP", price: 546 },
      { amount: "2,050 VP", price: 728 },
      { amount: "2,525 VP", price: 910 },
      { amount: "3,050 VP", price: 1092 },
      { amount: "3,650 VP", price: 1302 },
      { amount: "5,350 VP", price: 1860 },
      { amount: "10,700 VP", price: 3720 },
      { amount: "16,050 VP", price: 5580 },
      { amount: "21,400 VP", price: 7449 }
    ]
  },
  {
    id: 3,
    title: "League of Legends - Wild Rift",
    category: "moba",
    description: "LOL Discounted Wildcore - MOBA Fantasy",
    image: "https://www.riotgames.com/darkroom/1440/08bcc251757a1f64e30e0d7e8c513d35:be16374e056f8268996ef96555c7a113/wr-cb1-announcementarticle-banner-1920x1080.png",
    pricing: [
      { amount: "425 WC", price: 182 },
      { amount: "1,000 WC", price: 410 },
      { amount: "1,425 WC", price: 592 },
      { amount: "1,850 WC", price: 746 },
      { amount: "2,275 WC", price: 928 },
      { amount: "2,850 WC", price: 1156 },
      { amount: "3,275 WC", price: 1301 },
      { amount: "4,800 WC", price: 1865 },
      { amount: "6,550 WC", price: 2610 },
      { amount: "9,600 WC", price: 3730 }
    ]
  },
  {
    id: 4,
    title: "Call of Duty Mobile",
    category: "fps",
    description: "COD Mobile Discounted CP Points - Action Shooter",
    image: "https://cdn.moogold.com/2022/03/call-of-duty-mobile-logo-416x416.jpg",
    pricing: [
      { amount: "20 CP", price: 15 },
      { amount: "100 CP", price: 55 },
      { amount: "208 CP", price: 98 },
      { amount: "328 CP", price: 170 },
      { amount: "416 CP", price: 195 },
      { amount: "648 CP", price: 295 },
      { amount: "1,080 CP", price: 485 },
      { amount: "2,320 CP", price: 965 },
      { amount: "4,640 CP", price: 1930 },
      { amount: "6,960 CP", price: 2895 },
      { amount: "9,280 CP", price: 3860 },
      { amount: "11,600 CP", price: 4825 }
    ]
  },
  {
    id: 5,
    title: "Honor of Kings",
    category: "moba",
    description: "HOK Discounted Game Credits - Strategy MOBA",
    image: "https://cdn.moogold.com/2024/03/Honor-of-king.jpg",
    pricing: [
      { amount: "80 Credits", price: 52 },
      { amount: "240 Credits", price: 158 },
      { amount: "400 Credits", price: 264 },
      { amount: "560 Credits", price: 367 },
      { amount: "830 Credits", price: 525 },
      { amount: "1,245 Credits", price: 785 },
      { amount: "2,508 Credits", price: 1570 },
      { amount: "4,180 Credits", price: 2620 },
      { amount: "6,688 Credits", price: 4098 },
      { amount: "8,360 Credits", price: 5195 }
    ]
  },
  {
    id: 6,
    title: "Genshin Impact",
    category: "rpg",
    description: "Genshin Crystals - Open World RPG Adventure",
    image: "https://fastcdn.hoyoverse.com/content-v2/plat/124031/5d2ba4371115d26de4c574b28311aed8_576844151847376526.jpeg",
    pricing: [
      { amount: "60 Crystals", price: 41 },
      { amount: "330 Crystals", price: 206 },
      { amount: "1,090 Crystals", price: 628 },
      { amount: "2,240 Crystals", price: 1340 },
      { amount: "3,680 Crystals", price: 2152 },
      { amount: "4,970 Crystals", price: 2778 },
      { amount: "8,080 Crystals", price: 4125 },
      { amount: "11,960 Crystals", price: 6300 },
      { amount: "Blessing of Welkin Moon", price: 220 }
    ]
  },
  {
    id: 7,
    title: "Teamfight Tactics",
    category: "moba",
    description: "TFT Discounted Riot Points - Strategic Card Game",
    image: "https://www.riotgames.com/darkroom/1440/fab68f870f6da8998086165e608ea621:ca159930b811b32033d8714a948586c8/tft.jpg",
    pricing: [
      { amount: "575 RP", price: 184 },
      { amount: "1,380 RP", price: 415 },
      { amount: "2,800 RP", price: 828 },
      { amount: "4,500 RP", price: 1288 },
      { amount: "6,500 RP", price: 1840 },
      { amount: "7,800 RP", price: 2255 },
      { amount: "9,300 RP", price: 2668 },
      { amount: "13,000 RP", price: 3680 }
    ]
  },
  {
    id: 8,
    title: "League of Legends - Riot Points",
    category: "moba",
    description: "LOL Discounted RP - Classic MOBA",
    image: "https://static1-es.millenium.gg/articles/6/23/38/6/@/108739-lol-article_image_d-1.jpg",
    pricing: [
      { amount: "575 RP", price: 182 },
      { amount: "1,380 RP", price: 410 },
      { amount: "2,800 RP", price: 819 },
      { amount: "4,500 RP", price: 1274 },
      { amount: "6,500 RP", price: 1820 },
      { amount: "7,880 RP", price: 2230 },
      { amount: "9,300 RP", price: 2639 },
      { amount: "13,000 RP", price: 3640 }
    ]
  },
  {
    id: 9,
    title: "Blood Strike",
    category: "fps",
    description: "Blood Strike Discounted Gold - Action Shooter",
    image: "https://gfn.ru/media/images/art_im_l8wXqPJ.2e16d0ba.fill-308x308.format-webp.webpquality-50.webp",
    pricing: [
      { amount: "105 Gold", price: 42 },
      { amount: "210 Gold", price: 80 },
      { amount: "320 Gold", price: 125 },
      { amount: "540 Gold", price: 199 },
      { amount: "640 Gold", price: 250 },
      { amount: "855 Gold", price: 318 },
      { amount: "960 Gold", price: 359 },
      { amount: "1,100 Gold", price: 410 },
      { amount: "2,260 Gold", price: 799 },
      { amount: "3,360 Gold", price: 1190 },
      { amount: "4,520 Gold", price: 1600 },
      { amount: "5,800 Gold", price: 1940 },
      { amount: "6,900 Gold", price: 2350 },
      { amount: "8,060 Gold", price: 2750 },
      { amount: "9,160 Gold", price: 3100 },
      { amount: "10,320 Gold", price: 3580 },
      { amount: "11,600 Gold", price: 3880 },
      { amount: "17,400 Gold", price: 5999 },
      { amount: "Level Up Pass", price: 95 },
      { amount: "Strike Prem Pass", price: 425 },
      { amount: "Strike Elite Pass", price: 191 }
    ]
  },
  {
    id: 10,
    title: "Magic Chess Go Go",
    category: "moba",
    description: "Magic Chess Discounted Dias - Strategic Card Game",
    image: "https://cdn.bynogame.com/banner/1745584232648.webp",
    pricing: [
      { amount: "56 Dias", price: 46 },
      { amount: "112 Dias", price: 89 },
      { amount: "168 Dias", price: 135 },
      { amount: "223 Dias", price: 179 },
      { amount: "296 Dias", price: 235 },
      { amount: "336 Dias", price: 269 },
      { amount: "570 Dias", price: 445 },
      { amount: "793 Dias", price: 625 },
      { amount: "906 Dias", price: 715 },
      { amount: "1,163 Dias", price: 890 },
      { amount: "2,398 Dias", price: 1780 },
      { amount: "3,561 Dias", price: 2670 },
      { amount: "4,830 Dias", price: 3528 },
      { amount: "6,042 Dias", price: 4400 },
      { amount: "Weekly Diamond Pass", price: 90 },
      { amount: "Twilight Pass", price: 445 }
    ]
  }
];

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [activeSection, setActiveSection] = useState("games");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentStep, setPaymentStep] = useState("select"); // select, confirm, payment, receipt
  const [uploadedReceipt, setUploadedReceipt] = useState(null);

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "all" || game.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, filterCategory]);

  return (
    <div>
      <header>
        <div className="header-container">
          <div className="logo">
            <img src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/576637259_845842861300555_6891998938768508313_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFkP5xer6qX0q7X-jf3NdiRG_hY1zCxBWUb-FjXMLEFZfdc9qTeS5RtIYZcZXkb5eYwD_yQYr8aCe4AMHgqElhP&_nc_ohc=5zK81HKCUR4Q7kNvwEcmIx7&_nc_oc=AdoqH0RO6oL50Kwm6NmPRRbcOer1gD5sGpgHpb3LCpOIrh_G5jrqtEl8ou1SNp2BGwg&_nc_zt=23&_nc_ht=scontent.fcrk4-1.fna&_nc_gid=seqTYoRbm9ea3xejls2kDA&_nc_ss=7a3a8&oh=00_Af3tL3QnLN2ymUM3Pyd6E3XMed5F0Ggw85vXjR88KEF6-A&oe=69DA482B" alt="Zeijin Discounted" style={{ height: "50px", width: "auto" }} />
            <span>Zeijin Discounted</span>
          </div>
          <nav>
            <a href="#" className={`nav-link ${activeSection === "games" ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setActiveSection("games"); }}>Games</a>
            <a href="#" className={`nav-link ${activeSection === "events" ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setActiveSection("events"); }}>Events</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <h1>Game Currency Showcase</h1>
        <p>Discover the latest discounted game currency packages. Best prices for Philippine servers!</p>
      </section>

      <div className="container">
        <div className="event-banner" id="activeBanner">
          <div className="event-banner-content">
            <h2>🎮 Summer Sale 2026</h2>
            <p>Up to 50% off on selected game currencies. Limited time offer!</p>
          </div>
          <span className="event-badge">Ends in 5 days</span>
        </div>

        {activeSection === "games" && (
          <section className="games-container">
            <h2 className="section-title">📊 Available Games</h2>
            
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
                {filteredGames.map(game => (
                  <div key={game.id} className="game-card" onClick={() => setSelectedGame(game)}>
                    <div className="game-image" style={{ backgroundImage: `url(${game.image})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
                    <div className="game-info">
                      <div className="game-title">{game.title}</div>
                      <div className="game-description">{game.description}</div>
                      <div style={{ marginTop: "auto", color: "#00ff88", fontSize: "0.9rem" }}>
                        {game.pricing.length} packages available
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeSection === "events" && (
          <section className="events-container active">
            <h2 className="section-title">📅 Events & Updates</h2>
            <div id="eventsList">
              <p style={{ color: "#a0a0a0" }}><strong>Summer Sale 2026</strong> - Up to 50% off on selected titles. Ends in 5 days!</p>
            </div>
          </section>
        )}
      </div>

      <footer>
        <p>💳 Payment Methods: UnionBank, Maya, BPI, BDO, GCash, PayMaya</p>
        <p style={{ marginTop: "1rem", padding: "1rem", background: "rgba(255, 51, 51, 0.1)", borderRadius: "8px", borderLeft: "4px solid #00ff88" }}>
          <strong>📱 GCash Payment:</strong><br/>
          Account Name: <strong>Carlos Ruben G.</strong><br/>
          GCash Number: <strong>09603838674</strong>
        </p>
        <p>&copy; 2026 Zeijin Discounted. Game prices are for reference only.</p>
        <p style={{ fontSize: "0.85rem", color: "#707070", marginTop: "0.5rem" }}>
          NOTE: Pricelist may change on different times, depending on events. Thank you and happy gaming 💖
        </p>
      </footer>

      {selectedGame && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, overflowY: "auto", paddingTop: "2rem", paddingBottom: "2rem" }}>
          <div style={{ background: "rgba(20, 20, 30, 0.98)", padding: "2rem", borderRadius: "8px", border: "2px solid #ff3333", maxWidth: "600px", width: "90%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ color: "#ff3333", marginBottom: "0.5rem", fontSize: "1.8rem" }}>{selectedGame.title}</h2>
                <p style={{ color: "#a0a0a0", marginBottom: "0" }}>{selectedGame.description}</p>
              </div>
              <button 
                onClick={() => {
                  setSelectedGame(null);
                  setPaymentStep("select");
                  setSelectedPackage(null);
                  setUploadedReceipt(null);
                }} 
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  color: "#ff3333", 
                  fontSize: "1.5rem", 
                  cursor: "pointer",
                  padding: "0.5rem"
                }}
              >
                ✕
              </button>
            </div>

            {paymentStep === "select" ? (
              <>
                <div style={{ background: "rgba(255, 51, 51, 0.05)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(255, 51, 51, 0.2)" }}>
                  <h3 style={{ color: "#ff3333", marginBottom: "1rem" }}>💰 Available Packages</h3>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {selectedGame.pricing.map((pkg, idx) => (
                      <div 
                        key={idx} 
                        style={{
                          background: "rgba(255, 51, 51, 0.1)",
                          padding: "1rem",
                          borderRadius: "6px",
                          border: "1px solid rgba(255, 51, 51, 0.3)",
                          transition: "all 0.3s ease",
                          cursor: "pointer"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255, 51, 51, 0.2)";
                          e.currentTarget.style.borderColor = "#ff3333";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255, 51, 51, 0.1)";
                          e.currentTarget.style.borderColor = "rgba(255, 51, 51, 0.3)";
                        }}
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setPaymentStep("confirm");
                        }}
                      >
                        <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "white", marginBottom: "0.5rem" }}>
                          {pkg.amount}
                        </div>
                        <div style={{ fontSize: "1.5rem", color: "#00ff88", fontWeight: "bold" }}>
                          {pkg.currency || "₱"}{pkg.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p style={{ color: "#a0a0a0", fontSize: "0.85rem", marginTop: "1.5rem", fontStyle: "italic" }}>
                    💡 NOTE: Pricelist may change on different times, depending on events. Thank you and happy gaming! 💖
                  </p>
                </div>
              </>
            ) : paymentStep === "confirm" ? (
              <>
                <h3 style={{ color: "#ff3333", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>✓ Order Confirmation</h3>
                <div style={{ background: "rgba(255, 51, 51, 0.1)", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem", border: "1px solid rgba(255, 51, 51, 0.3)" }}>
                  <div style={{ marginBottom: "1.2rem" }}>
                    <div style={{ color: "#999", marginBottom: "0.3rem", fontSize: "0.85rem" }}>Game</div>
                    <div style={{ color: "white", fontSize: "1.2rem", fontWeight: "bold" }}>{selectedGame.title}</div>
                  </div>
                  
                  <div style={{ marginBottom: "1.2rem" }}>
                    <div style={{ color: "#999", marginBottom: "0.3rem", fontSize: "0.85rem" }}>Package</div>
                    <div style={{ color: "#00ff88", fontSize: "1.1rem", fontWeight: "bold" }}>{selectedPackage.amount}</div>
                  </div>
                  
                  <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255, 51, 51, 0.3)" }}>
                    <div style={{ color: "#999", marginBottom: "0.3rem", fontSize: "0.85rem" }}>Total Price</div>
                    <div style={{ color: "#ff3333", fontSize: "1.6rem", fontWeight: "bold" }}>₱{selectedPackage.price}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.5rem" }}>
                  <button
                    onClick={() => {
                      setPaymentStep("select");
                      setSelectedPackage(null);
                    }}
                    style={{
                      padding: "0.8rem 1.5rem",
                      background: "rgba(255, 51, 51, 0.2)",
                      color: "#ff3333",
                      border: "1px solid #ff3333",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 51, 51, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 51, 51, 0.2)";
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setPaymentStep("payment")}
                    style={{
                      padding: "0.8rem 1.5rem",
                      background: "#ff3333",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ff5555";
                      e.currentTarget.style.transform = "translateX(2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#ff3333";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    Continue →
                  </button>
                </div>
              </>
            ) : paymentStep === "payment" ? (
              <>
                <h3 style={{ color: "#ff3333", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>💳 Payment Details</h3>
                <div style={{ background: "rgba(0, 255, 136, 0.1)", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem", border: "2px solid #00ff88" }}>
                  <div style={{ color: "#00ff88", fontSize: "1rem", fontWeight: "bold", marginBottom: "1.2rem" }}>🏦 GCash Payment</div>
                  
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ color: "#999", marginBottom: "0.3rem", fontSize: "0.85rem" }}>Send to:</div>
                    <div style={{ color: "white", fontSize: "1.3rem", fontWeight: "bold", background: "rgba(0, 0, 0, 0.3)", padding: "0.8rem", borderRadius: "6px", fontFamily: "monospace" }}>
                      09603838674
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ color: "#999", marginBottom: "0.3rem", fontSize: "0.85rem" }}>Name:</div>
                    <div style={{ color: "white", fontSize: "1.1rem", fontWeight: "bold" }}>Carlos Ruben G.</div>
                  </div>

                  <div style={{ background: "rgba(255, 51, 51, 0.2)", padding: "1rem", borderRadius: "6px", borderLeft: "4px solid #ff3333", marginBottom: "1rem" }}>
                    <div style={{ color: "#ff3333", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.5rem" }}>⚠️ Important:</div>
                    <div style={{ color: "#ccc", fontSize: "0.85rem", lineHeight: "1.6" }}>
                      Send exactly <span style={{ color: "#ff3333", fontWeight: "bold" }}>₱{selectedPackage.price}</span>
                      <br />
                      Include your game username in GCash notes
                    </div>
                  </div>

                  <div style={{ padding: "0.8rem", background: "rgba(0, 0, 0, 0.3)", borderRadius: "6px" }}>
                    <div style={{ color: "#999", fontSize: "0.85rem", marginBottom: "0.3rem" }}>Amount to Pay:</div>
                    <div style={{ color: "#00ff88", fontSize: "1.4rem", fontWeight: "bold" }}>₱{selectedPackage.price}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "1.5rem" }}>
                  <button
                    onClick={() => setPaymentStep("confirm")}
                    style={{
                      padding: "0.8rem 1.5rem",
                      background: "rgba(255, 51, 51, 0.2)",
                      color: "#ff3333",
                      border: "1px solid #ff3333",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 51, 51, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 51, 51, 0.2)";
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setPaymentStep("receipt")}
                    style={{
                      padding: "0.8rem 1.5rem",
                      background: "#00ff88",
                      color: "#000",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#00ff99";
                      e.currentTarget.style.transform = "translateX(2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#00ff88";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    I've Sent Payment →
                  </button>
                </div>
              </>
            ) : paymentStep === "receipt" ? (
              <>
                <h3 style={{ color: "#ff3333", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>📸 Upload Receipt</h3>
                <div style={{ background: "rgba(255, 51, 51, 0.1)", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem", border: "1px solid rgba(255, 51, 51, 0.3)" }}>
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ color: "#999", fontSize: "0.85rem", marginBottom: "0.3rem" }}>{selectedGame.title}</div>
                    <div style={{ color: "white", fontSize: "1rem", fontWeight: "bold" }}>₱{selectedPackage.price} • {selectedPackage.amount}</div>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", color: "#00ff88", fontWeight: "bold", marginBottom: "0.8rem", fontSize: "0.95rem" }}>
                    📤 Choose Receipt Image/PDF
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setUploadedReceipt({
                            file: file,
                            preview: event.target.result,
                            name: file.name
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "1rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "2px dashed #00ff88",
                      borderRadius: "6px",
                      color: "#999",
                      cursor: "pointer",
                      fontSize: "0.9rem"
                    }}
                  />
                  {uploadedReceipt && (
                    <div style={{ background: "rgba(0, 255, 136, 0.15)", padding: "1rem", borderRadius: "6px", marginTop: "1rem", border: "1px solid rgba(0, 255, 136, 0.3)" }}>
                      <div style={{ color: "#00ff88", fontWeight: "bold", marginBottom: "0.8rem", fontSize: "0.95rem" }}>✅ {uploadedReceipt.name}</div>
                      {uploadedReceipt.preview && uploadedReceipt.file.type.startsWith("image") && (
                        <img 
                          src={uploadedReceipt.preview} 
                          alt="receipt" 
                          style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "4px" }}
                        />
                      )}
                      {uploadedReceipt.file.type === "application/pdf" && (
                        <div style={{ color: "#999", fontSize: "0.85rem" }}>📄 PDF file ready to submit</div>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                  <button
                    onClick={() => setPaymentStep("payment")}
                    style={{
                      padding: "0.8rem 1.5rem",
                      background: "rgba(255, 51, 51, 0.2)",
                      color: "#ff3333",
                      border: "1px solid #ff3333",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      transition: "all 0.3s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 51, 51, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 51, 51, 0.2)";
                    }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => {
                      if (uploadedReceipt) {
                        alert(`✅ Payment received!\n\nGame: ${selectedGame.title}\nAmount: ₱${selectedPackage.price}\nPackage: ${selectedPackage.amount}\n\nYou will receive your credit shortly. Thank you for your purchase! 💖`);
                        setSelectedGame(null);
                        setPaymentStep("select");
                        setSelectedPackage(null);
                        setUploadedReceipt(null);
                      } else {
                        alert("Please upload your payment receipt first.");
                      }
                    }}
                    style={{
                      padding: "0.8rem 1.5rem",
                      background: uploadedReceipt ? "#00ff88" : "rgba(0, 255, 136, 0.3)",
                      color: uploadedReceipt ? "#000" : "#666",
                      border: "none",
                      borderRadius: "6px",
                      cursor: uploadedReceipt ? "pointer" : "not-allowed",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      transition: "all 0.3s"
                    }}
                    disabled={!uploadedReceipt}
                    onMouseEnter={(e) => {
                      if (uploadedReceipt) {
                        e.currentTarget.style.background = "#00ff99";
                        e.currentTarget.style.transform = "translateX(2px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (uploadedReceipt) {
                        e.currentTarget.style.background = "#00ff88";
                        e.currentTarget.style.transform = "translateX(0)";
                      }
                    }}
                  >
                    {uploadedReceipt ? "✓ Submit & Complete" : "Upload to Continue"}
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}