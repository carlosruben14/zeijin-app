import { useState, useMemo, useEffect } from "react";
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
  },
  {
    id: 11,
    title: "Crossfire Ecoin",
    category: "fps",
    description: "Crossfire Discounted Ecoin - Tactical Shooter",
    image: "https://club.jollymax.com/wp-content/uploads/2025/03/134-tmb-1024x506.webp",
    pricing: [
      { amount: "100 Ecoin", price: 90 },
      { amount: "200 Ecoin", price: 180 },
      { amount: "300 Ecoin", price: 270 },
      { amount: "400 Ecoin", price: 360 },
      { amount: "500 Ecoin", price: 450 },
      { amount: "1,000 Ecoin", price: 900 },
      { amount: "2,000 Ecoin", price: 1800 },
      { amount: "3,000 Ecoin", price: 2700 },
      { amount: "4,000 Ecoin", price: 3600 },
      { amount: "5,000 Ecoin", price: 4500 },
      { amount: "6,000 Ecoin", price: 5400 },
      { amount: "10,000 Ecoin", price: 9000 }
    ]
  },
  {
    id: 12,
    title: "PUBG Mobile UC",
    category: "fps",
    description: "PUBG Mobile Discounted UC - Battle Royale",
    image: "https://static0.xdaimages.com/wordpress/wp-content/uploads/2018/06/pubg.jpg?q=50&fit=crop&w=1200&h=675&dpr=1.5",
    pricing: [
      { amount: "60 UC", price: 53 },
      { amount: "325 UC", price: 260 },
      { amount: "660 UC", price: 520 },
      { amount: "1,800 UC", price: 1300 },
      { amount: "3,850 UC", price: 2600 },
      { amount: "8,100 UC", price: 5186 }
    ]
  },
  {
    id: 13,
    title: "Honkai Star Rail",
    category: "rpg",
    description: "Honkai Star Rail Discounted Oneric Shards - Space RPG",
    image: "https://i.ytimg.com/vi/NU6J88t4luM/maxresdefault.jpg",
    pricing: [
      { amount: "60 Shards", price: 50 },
      { amount: "330 Shards", price: 213 },
      { amount: "1,090 Shards", price: 655 },
      { amount: "1,420 Shards", price: 869 },
      { amount: "2,240 Shards", price: 1336 },
      { amount: "3,880 Shards", price: 2200 },
      { amount: "6,120 Shards", price: 3536 },
      { amount: "8,080 Shards", price: 4299 },
      { amount: "9,170 Shards", price: 4955 },
      { amount: "11,960 Shards", price: 6440 },
      { amount: "Express Supply Pass", price: 215 }
    ]
  },
  {
    id: 14,
    title: "Steam Wallet Codes",
    category: "rpg",
    description: "Steam Wallet Gift Cards - Play Thousands of Games",
    image: "https://cdn.moogold.com/2025/11/Steam-Gift-Card-PHP.jpg",
    pricing: [
      { amount: "$0.50 USD", price: 25 },
      { amount: "$1 USD", price: 50 },
      { amount: "$2 USD", price: 98 },
      { amount: "$5 USD", price: 245 },
      { amount: "$10 USD", price: 490 },
      { amount: "$20 USD", price: 980 },
      { amount: "$50 USD", price: 2450 },
      { amount: "$100 USD", price: 4900 }
    ]
  }
];

const eventsData = [
  {
    id: 1,
    game: "Mobile Legends: Bang Bang",
    title: "MLBB x NARUTO Collaboration Event",
    description: "Get up to 50% off on selected Dias packages. Limited time offer!",
    startDate: "2026-04-07",
    endDate: "2026-04-30",
    badge: "Hot Event",
    image: "https://scontent.fcrk2-3.fna.fbcdn.net/v/t39.30808-6/492477191_1119214773576815_6014578049500213380_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEaBfvYk4kVB-I4qlCvq2xIhe84nehSclOF7zid6FJyUy3JFZm-fKKBH1x9LJdE9viRluv0r3xQLhbAo4BpXWIe&_nc_ohc=1PPaSltSAusQ7kNvwGHJg9P&_nc_oc=AdoGkj3c0FCI6CXpcRvkSPNpqoLHg22C59z873BVvoEGNqf9rfBYAf8MJWDZhWXCjE0&_nc_zt=23&_nc_ht=scontent.fcrk2-3.fna&_nc_gid=PiGEVZEBcFjaGkimSVbYlA&_nc_ss=7a3a8&oh=00_Af3AlNRttxWfckW8xefW7jzSI389EL2sierX5GgBDyQwDA&oe=69DA58C2"
  },
  {
    id: 2,
    game: "Valorant",
    title: "Battle Pass Season 8 Launch",
    description: "New battle pass with exclusive rewards and cosmetics.",
    startDate: "2026-04-10",
    endDate: "2026-06-10",
    badge: "New",
    image: "https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg"
  },
  {
    id: 3,
    game: "Valorant",
    title: "Episode 8 Act 2 Launch",
    description: "New episode with new agent and map changes.",
    startDate: "2026-04-15",
    endDate: "2026-07-15",
    badge: "New",
    image: "https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg"
  },
  {
    id: 5,
    game: "Genshin Impact",
    title: "Lantern Rite Festival 2026",
    description: "Celebrate with special quests, rewards, and limited-time banner!",
    startDate: "2026-04-20",
    endDate: "2026-05-20",
    badge: "Hot Event",
    image: "https://fastcdn.hoyoverse.com/content-v2/plat/124031/5d2ba4371115d26de4c574b28311aed8_576844151847376526.jpeg"
  },
  {
    id: 6,
    game: "Valorant",
    title: "Jellybeam Collection Bundle",
    description: "Featured jellybeam weapon skins collection. Includes stunning blue and pink gradient designs across multiple weapons.",
    startDate: "2026-04-07",
    endDate: "2026-04-15",
    badge: "Featured Shop",
    image: "https://valorantstrike.com/wp-content/uploads/Valorant-Jellybeam-Collection-HD-1280x640.jpg"
  },
  {
    id: 7,
    game: "Valorant",
    title: "Blackthorn Collection Bundle",
    description: "Featured blackthorn weapon skins with dark red and black thematic designs. Limited time exclusive bundle!",
    startDate: "2026-04-07",
    endDate: "2026-04-08",
    badge: "Ending Soon",
    image: "https://valorantstrike.com/wp-content/uploads/Valorant-Blackthorn-Collection-HD-1280x640.jpg"
  }
];

const EventCarousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay || events.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, events.length]);

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
        {/* Event Image */}
        {currentEvent.image && (
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundImage: `url(${currentEvent.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              alignItems: "flex-end"
            }}
          >
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.8))"
              }}
            />
            
            {/* Badge */}
            <div style={{ position: "relative", zIndex: 2, padding: "1.5rem", width: "100%" }}>
              <span
                style={{
                  display: "inline-block",
                  background: currentEvent.badge === "Hot Event" ? "rgba(255, 51, 51, 0.2)" : "rgba(0, 255, 136, 0.2)",
                  color: currentEvent.badge === "Hot Event" ? "#ff3333" : "#00ff88",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  whiteSpace: "nowrap"
                }}
              >
                {currentEvent.badge}
              </span>
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
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 51, 51, 0.3)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
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
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 51, 51, 0.3)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
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
  const [activeSection, setActiveSection] = useState("games");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

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
          </nav>
        </div>
      </header>

      <section className="hero">
        <h1>Game Currency Showcase</h1>
        <p>Discover the latest discounted game currency packages. Best prices for Philippine servers!</p>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", fontSize: "0.9rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#00ff88" }}>
            <span>✓</span> Trusted by PH Players
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#00ff88" }}>
            <span>✓</span> Instant Delivery
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#00ff88" }}>
            <span>✓</span> Lowest Prices
          </div>
        </div>
      </section>

      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <EventCarousel events={eventsData} />
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
                {filteredGames.map(game => {
                  // Define discount percentages by game ID
                  const discountMap = {
                    1: "5-6%",    // Mobile Legends
                    2: "9%",       // Valorant
                    3: "9%",       // LOL Wild Rift
                    4: "5-6%",     // Call of Duty Mobile
                    5: "5-8%",     // Honor of Kings
                    6: "9%",       // Genshin Impact
                    7: "9%",       // Teamfight Tactics
                    8: "9%",       // LOL Riot Points
                    9: "7-8%",     // Blood Strike
                    10: "5-6%",    // Magic Chess Go Go
                    11: "5-6%",    // Crossfire Ecoin
                    12: "8-10%",   // PUBG Mobile UC
                    13: "9%",      // Honkai Star Rail
                    14: "1-2%"     // Steam Wallet Codes
                  };
                  
                  const discount = discountMap[game.id] || "5%";
                  
                  return (
                    <div key={game.id} className={`game-card ${game.category}`} onClick={() => setSelectedGame(game)} style={{ position: "relative" }}>
                      <div className="game-image" style={{ backgroundImage: `url(${game.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        {discount && (
                          <div style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            background: "linear-gradient(135deg, #ff3333, #ff6b6b)",
                            color: "white",
                            padding: "0.4rem 0.8rem",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            fontSize: "0.85rem",
                            boxShadow: "0 4px 12px rgba(255, 51, 51, 0.4)",
                            zIndex: 10
                          }}>
                            Save {discount}!
                          </div>
                        )}
                      </div>
                      <div className="game-info">
                        <div className="game-title">{game.title}</div>
                        <div className="game-description">{game.description}</div>
                        <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
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
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* Payment Methods & Info Section */}
        <section className="container" style={{ marginTop: "3rem" }}>
          <h2 className="section-title">💳 Payment Methods</h2>
          <div style={{
            background: "rgba(255, 51, 51, 0.05)",
            border: "2px solid rgba(255, 51, 51, 0.2)",
            borderRadius: "12px",
            padding: "2rem",
            marginBottom: "2rem"
          }}>
            <p style={{ color: "#d0d0d0", marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: "bold" }}>We accept the following payment methods:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "rgba(0, 132, 255, 0.1)", padding: "1rem", borderRadius: "8px", border: "1px solid #0084ff", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>💙</div>
                <div style={{ color: "#0084ff", fontWeight: "bold" }}>GCash</div>
              </div>
              <div style={{ background: "rgba(255, 165, 0, 0.1)", padding: "1rem", borderRadius: "8px", border: "1px solid #ffa500", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>💛</div>
                <div style={{ color: "#ffa500", fontWeight: "bold" }}>PayMaya</div>
              </div>
              <div style={{ background: "rgba(0, 51, 102, 0.1)", padding: "1rem", borderRadius: "8px", border: "1px solid #003366", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🏦</div>
                <div style={{ color: "#4a90e2", fontWeight: "bold" }}>BDO Bank Transfer</div>
              </div>
              <div style={{ background: "rgba(204, 0, 0, 0.1)", padding: "1rem", borderRadius: "8px", border: "1px solid #cc0000", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🏧</div>
                <div style={{ color: "#cc0000", fontWeight: "bold" }}>BPI Bank Transfer</div>
              </div>
            </div>
            <p style={{ color: "#a0a0a0", fontSize: "0.9rem", fontStyle: "italic" }}>
              💡 Other bank transfers available via GCash. Contact us for details!
            </p>
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

            <details style={{
              background: "rgba(255, 51, 51, 0.05)",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid rgba(255, 51, 51, 0.2)",
              cursor: "pointer"
            }}>
              <summary style={{ color: "#ff3333", fontWeight: "bold", fontSize: "1.1rem", userSelect: "none" }}>
                What games are available in Coda Shop?
              </summary>
              <p style={{ color: "#c0c0c0", marginTop: "1rem" }}>
                All the games listed on our site (Mobile Legends, Valorant, LOL, Genshin Impact, PUBG, Honkai Star Rail, Blood Strike, and more) are available through Coda Shop! You can also request other games - just message us for availability and pricing.
              </p>
            </details>
          </div>
        </section>

      </div>

      <footer>
        <p>&copy; 2026 Zeijin Discounted. Game prices are for reference only.</p>
        <p style={{ fontSize: "0.85rem", color: "#707070", marginTop: "0.5rem" }}>
          NOTE: Pricelist may change on different times, depending on events. Thank you and happy gaming 💖
        </p>
        
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
          <a 
            href="https://m.me/ZeijinDiscountedTopUpSalePH" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.5rem",
              padding: "0.6rem 1.2rem",
              background: "rgba(0, 132, 255, 0.1)",
              border: "1px solid #0084ff",
              borderRadius: "6px",
              color: "#0084ff",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 132, 255, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 132, 255, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            💬 Messenger
          </a>
          
          <a 
            href="https://www.facebook.com/ZeijinDiscountedTopUpSalePH" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.5rem",
              padding: "0.6rem 1.2rem",
              background: "rgba(24, 119, 242, 0.1)",
              border: "1px solid #1877f2",
              borderRadius: "6px",
              color: "#1877f2",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(24, 119, 242, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(24, 119, 242, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            f Facebook
          </a>
        </div>
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
                onClick={() => setSelectedGame(null)} 
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
                    onClick={() => {}}
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

            <button 
              onClick={() => setSelectedGame(null)} 
              style={{ 
                background: "#ff3333", 
                color: "white", 
                padding: "0.75rem 2rem", 
                border: "none", 
                borderRadius: "20px", 
                cursor: "pointer", 
                fontSize: "1rem",
                marginTop: "1.5rem",
                width: "100%"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}