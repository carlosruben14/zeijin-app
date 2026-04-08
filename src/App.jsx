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
    image: "https://scontent.fcrk2-3.fna.fbcdn.net/v/t39.30808-6/492477191_1119214773576815_6014578049500213380_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=107&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEaBfvYk4kVB-I4qlCvq2xIhe84nehSclOF7zid6FJyUy3JFZm-fKKBH1x9LJdE9viRluv0r3xQLhbAo4BpXWIe&_nc_ohc=1PPaSltSAusQ7kNvwGHJg9P&_nc_oc=AdoGkj3c0FCI6CXpcRvkSPNpqoLHg22C59z873BVvoEGNqf9rfBYAf8MJWDZhWXCjE0&_nc_zt=23&_nc_ht=scontent.fcrk2-3.fna&_nc_gid=PiGEVZEBcFjaGkimSVbYlA&_nc_ss=7a3a8&oh=00_Af3AlNRttxWfckW8xefW7jzSI389EL2sierX5GgBDyQwDA&oe=69DA58C2",
    wikiUrl: "https://mobile-legends.fandom.com/wiki/Event"
  },
  {
    id: 2,
    game: "Valorant",
    title: "Battle Pass Season 8 Launch",
    description: "New battle pass with exclusive rewards and cosmetics.",
    startDate: "2026-04-10",
    endDate: "2026-06-10",
    badge: "New",
    image: "https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg",
    wikiUrl: "https://valorant.fandom.com/wiki/Battle_Pass"
  },
  {
    id: 3,
    game: "Valorant",
    title: "Episode 8 Act 2 Launch",
    description: "New episode with new agent and map changes.",
    startDate: "2026-04-15",
    endDate: "2026-07-15",
    badge: "New",
    image: "https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg",
    wikiUrl: "https://valorant.fandom.com/wiki/Episode_8"
  },
  {
    id: 5,
    game: "Genshin Impact",
    title: "Lantern Rite Festival 2026",
    description: "Celebrate with special quests, rewards, and limited-time banner!",
    startDate: "2026-04-20",
    endDate: "2026-05-20",
    badge: "Hot Event",
    image: "https://fastcdn.hoyoverse.com/content-v2/plat/124031/5d2ba4371115d26de4c574b28311aed8_576844151847376526.jpeg",
    wikiUrl: "https://genshin-impact.fandom.com/wiki/Lantern_Rite_Festival"
  },
  {
    id: 6,
    game: "Valorant",
    title: "Jellybeam Collection Bundle",
    description: "Featured jellybeam weapon skins collection. Includes stunning blue and pink gradient designs across multiple weapons.",
    startDate: "2026-04-07",
    endDate: "2026-04-15",
    badge: "Featured Shop",
    image: "https://valorantstrike.com/wp-content/uploads/Valorant-Jellybeam-Collection-HD-1280x640.jpg",
    wikiUrl: "https://valorant.fandom.com/wiki/Featured_Bundle"
  },
  {
    id: 7,
    game: "Valorant",
    title: "Blackthorn Collection Bundle",
    description: "Featured blackthorn weapon skins with dark red and black thematic designs. Limited time exclusive bundle!",
    startDate: "2026-04-07",
    endDate: "2026-04-08",
    badge: "Ending Soon",
    image: "https://valorantstrike.com/wp-content/uploads/Valorant-Blackthorn-Collection-HD-1280x640.jpg",
    wikiUrl: "https://valorant.fandom.com/wiki/Featured_Bundle"
  }
];

// Calculate event status
const getEventStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (today < start) return "upcoming";
  if (today > end) return "ended";
  return "ongoing";
};

const EventCarousel = ({ events, getEventStatus }) => {
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
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 51, 51, 0.2)";
                    e.currentTarget.style.transform = "scale(1)";
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
  const [contactGame, setContactGame] = useState(null);
  const [packageDetailsModal, setPackageDetailsModal] = useState(null);
  const [activeSection, setActiveSection] = useState("games");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [breadcrumb, setBreadcrumb] = useState(["Games"]);
  const [showWelcomeNotif, setShowWelcomeNotif] = useState(true);
  const [flippedGames, setFlippedGames] = useState(new Set());
  const [ignValidatorData, setIgnValidatorData] = useState({
    ign: "",
    orderedAmount: "",
    paymentMethod: "GCash",
    otherConcern: ""
  });
  const [showMLIDChecker, setShowMLIDChecker] = useState(false);
  const [wikiSelectedGame, setWikiSelectedGame] = useState("mlbb"); // mlbb, valorant, genshin, lol
  const [mlSearchQuery, setMlSearchQuery] = useState("");
  const [mlSearchType, setMlSearchType] = useState("hero");
  const [mlCheckResult, setMlCheckResult] = useState(null);
  const [mlCheckError, setMlCheckError] = useState("");
  const [mlCheckLoading, setMlCheckLoading] = useState(false);

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
  }, [wikiSelectedGame]);

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

  const searchGameData = async () => {
    setMlCheckError("");
    setMlCheckResult(null);
    
    if (!mlSearchQuery.trim()) {
      setMlCheckError(`Please enter a ${mlSearchType} name`);
      return;
    }

    setMlCheckLoading(true);
    
    try {
      let endpoint;
      let dataKey = "data";
      
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
        dataKey = "data";
      } else if (wikiSelectedGame === "genshin") {
        if (mlSearchType === "character") {
          endpoint = `https://genshin.jmp.blue/characters`;
        }
        dataKey = "characters";
      } else if (wikiSelectedGame === "lol") {
        if (mlSearchType === "champion") {
          endpoint = `https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json`;
        } else if (mlSearchType === "item") {
          endpoint = `https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/item.json`;
        }
        dataKey = "data";
      }

      console.log("Fetching from:", endpoint);
      
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
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
            setMlCheckError(`Hero "${mlSearchQuery}" not found.`);
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
            setMlCheckError(`Item "${mlSearchQuery}" not found.`);
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
          setMlCheckError(`Agent "${mlSearchQuery}" not found.`);
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
          setMlCheckError(`Character "${mlSearchQuery}" not found.`);
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
            setMlCheckError(`Champion "${mlSearchQuery}" not found.`);
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
            setMlCheckError(`Item "${mlSearchQuery}" not found.`);
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

  const toggleFlip = (gameId) => {
    const newFlipped = new Set(flippedGames);
    if (newFlipped.has(gameId)) {
      newFlipped.delete(gameId);
    } else {
      newFlipped.add(gameId);
    }
    setFlippedGames(newFlipped);
  };

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "all" || game.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, filterCategory]);

  return (
    <div>
      {/* Welcome Notification Modal */}
      {showWelcomeNotif && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999, padding: "1rem" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(30, 30, 45, 1), rgba(50, 20, 20, 1))", padding: "2rem", borderRadius: "12px", border: "2px solid #ff3333", maxWidth: "500px", width: "100%", textAlign: "center", boxShadow: "0 0 60px rgba(255, 51, 51, 0.5)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📱</div>
            <h2 style={{ color: "#ff3333", marginBottom: "1rem", fontSize: "1.8rem", fontWeight: "bold" }}>Welcome to Zeijin!</h2>
            <p style={{ color: "#d0d0d0", marginBottom: "1.5rem", lineHeight: "1.6", fontSize: "0.95rem" }}>
              👋 This website is for <strong>checking prices and game details</strong>. 
            </p>
            <div style={{ background: "rgba(255, 51, 51, 0.1)", border: "1px solid rgba(255, 51, 51, 0.3)", padding: "1.5rem", borderRadius: "8px", marginBottom: "1.5rem", color: "#FFB3B3" }}>
              <p style={{ marginBottom: "0.7rem", fontSize: "0.9rem" }}>
                <strong>💰 Actual Transaction:</strong> All payments and transactions happen through <strong>Messenger, Telegram, or Instagram DM</strong> - NOT on this website.
              </p>
              <p style={{ marginBottom: "0", fontSize: "0.9rem" }}>
                <strong>✓ How it works:</strong> Browse prices → Ask Details on social media → Complete transaction there
              </p>
            </div>
            <button 
              onClick={() => setShowWelcomeNotif(false)}
              style={{
                background: "linear-gradient(135deg, #ff3333, #ff6b6b)",
                color: "white",
                border: "none",
                padding: "0.9rem 2.5rem",
                borderRadius: "25px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "all 0.3s",
                width: "100%"
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
              Got it! Let's Browse →
            </button>
          </div>
        </div>
      )}

      <header>
        <div className="header-container">
          <div className="logo">
            <img src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t39.30808-6/576637259_845842861300555_6891998938768508313_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFkP5xer6qX0q7X-jf3NdiRG_hY1zCxBWUb-FjXMLEFZfdc9qTeS5RtIYZcZXkb5eYwD_yQYr8aCe4AMHgqElhP&_nc_ohc=5zK81HKCUR4Q7kNvwEcmIx7&_nc_oc=AdoqH0RO6oL50Kwm6NmPRRbcOer1gD5sGpgHpb3LCpOIrh_G5jrqtEl8ou1SNp2BGwg&_nc_zt=23&_nc_ht=scontent.fcrk4-1.fna&_nc_gid=seqTYoRbm9ea3xejls2kDA&_nc_ss=7a3a8&oh=00_Af3tL3QnLN2ymUM3Pyd6E3XMed5F0Ggw85vXjR88KEF6-A&oe=69DA482B" alt="Zeijin Discounted" style={{ height: "50px", width: "auto" }} />
            <span>Zeijin Discounted</span>
          </div>
          <nav>
            <a href="#" className={`nav-link ${activeSection === "games" ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setActiveSection("games"); }}>Games</a>
            <a href="#" style={{ marginLeft: "1.5rem", cursor: "pointer", color: "#FF6B9D", fontWeight: "bold", textDecoration: "none", fontSize: "0.95rem" }} onClick={(e) => { e.preventDefault(); setShowMLIDChecker(true); }}>🔍 Game Fandom Wiki</a>
          </nav>
        </div>
      </header>

      {/* Game Fandom Wiki Modal */}
      {showMLIDChecker && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99998, padding: "1rem" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(30, 30, 45, 1), rgba(40, 20, 35, 1))", padding: "2rem", borderRadius: "12px", border: "2px solid #FF6B9D", maxWidth: "500px", width: "100%", boxShadow: "0 0 60px rgba(255, 107, 157, 0.4)" }}>
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
              <div style={{ background: "rgba(255, 51, 51, 0.15)", border: "1px solid rgba(255, 51, 51, 0.4)", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem", color: "#FFB3B3", fontSize: "0.9rem" }}>
                ❌ {mlCheckError}
              </div>
            )}

            {/* Waiting for VC Message */}
            {mlCheckResult && mlCheckResult.valid === null && (
              <div style={{ background: "rgba(100, 200, 255, 0.15)", border: "1px solid rgba(100, 200, 255, 0.4)", padding: "1.2rem", borderRadius: "8px", marginBottom: "1.5rem", color: "#64c8ff", fontSize: "0.9rem" }}>
                <div style={{ fontSize: "1.1rem", marginBottom: "0.8rem", fontWeight: "bold" }}>Searching...</div>
              </div>
            )}

            {/* Success Result */}
            {mlCheckResult && mlCheckResult.valid === true && (
              <div style={{ background: "rgba(0, 255, 136, 0.15)", border: "1px solid rgba(0, 255, 136, 0.4)", padding: "1.2rem", borderRadius: "8px", marginBottom: "1.5rem", color: "#00ff88", fontSize: "0.85rem" }}>
                <div style={{ fontSize: "1.2rem", marginBottom: "0.8rem", fontWeight: "bold", color: "#00ff88" }}>✓ {mlCheckResult.message}</div>
                <div style={{ color: "#a0a0a0", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {mlCheckResult.type === "hero" && mlCheckResult.data && (
                    <>
                      <div><strong>Hero:</strong> {mlCheckResult.data.hero_name}</div>
                      <div><strong>Title:</strong> {mlCheckResult.data.hero_title}</div>
                      <div><strong>Role:</strong> {mlCheckResult.data.role}</div>
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
                      {mlCheckResult.data.role && <div><strong>Role:</strong> {mlCheckResult.data.role.displayName}</div>}
                    </>
                  )}
                  {mlCheckResult.type === "character" && mlCheckResult.data && (
                    <>
                      <div><strong>Character:</strong> {mlCheckResult.data.name}</div>
                      {mlCheckResult.data.title && <div><strong>Title:</strong> {mlCheckResult.data.title}</div>}
                      {mlCheckResult.data.vision && <div><strong>Element:</strong> {mlCheckResult.data.vision}</div>}
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
                            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
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
                onMouseEnter={(e) => !mlCheckLoading && (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => !mlCheckLoading && (e.currentTarget.style.transform = "scale(1)")}
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

      {/* Breadcrumb Navigation */}
      <div style={{ padding: "1rem", maxWidth: "1200px", margin: "0 auto", paddingTop: "0.5rem" }}>
        <nav style={{ fontSize: "0.9rem", color: "#a0a0a0" }}>
          {breadcrumb.map((item, index) => (
            <span key={index}>
              <span style={{ color: "#ff3333", cursor: "pointer" }}>{item}</span>
              {index < breadcrumb.length - 1 && <span style={{ margin: "0 0.5rem" }}>/</span>}
            </span>
          ))}
        </nav>
      </div>

      <section className="hero">
        <h1>Browse • Chat • Get Your Currency</h1>
        <p>Discover the latest discounted game currency packages. Best prices for Philippine servers!</p>
        
        {/* Credibility Badges */}
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", fontSize: window.innerWidth < 480 ? "0.8rem" : "0.9rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(0, 132, 255, 0.1)", padding: "0.5rem 1rem", borderRadius: "20px", border: "1px solid rgba(0, 132, 255, 0.3)" }}>
            <span style={{ fontSize: "1.2rem" }}>✓</span>
            <span style={{ color: "#0084ff", fontWeight: "bold" }}>Facebook Verified</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255, 165, 0, 0.1)", padding: "0.5rem 1rem", borderRadius: "20px", border: "1px solid rgba(255, 165, 0, 0.3)" }}>
            <span style={{ fontSize: "1.2rem" }}>📋</span>
            <span style={{ color: "#ffa500", fontWeight: "bold" }}>DTI Registered</span>
          </div>
        </div>

        <div style={{ marginTop: "0.75rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", fontSize: "0.9rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#00ff88" }}>
            <span>✓</span> Trusted by PH and Global Players
          </div>
        </div>
        <a 
          href="https://m.me/ZeijinDiscountedTopUpSalePH" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            marginTop: "1.5rem",
            display: "inline-block",
            background: "linear-gradient(135deg, #ff3333, #ff6b6b)",
            color: "white",
            padding: window.innerWidth < 480 ? "0.7rem 1.5rem" : "0.8rem 2rem",
            borderRadius: "25px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: window.innerWidth < 480 ? "0.95rem" : "1.1rem",
            boxShadow: "0 4px 15px rgba(255, 51, 51, 0.4)",
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
          💬 Message Us on Messenger
        </a>
      </section>

      {/* Floating Contact Button */}
      <div style={{
        position: "fixed",
        bottom: window.innerWidth < 480 ? "1rem" : "2rem",
        right: window.innerWidth < 480 ? "1rem" : "2rem",
        zIndex: 8888,
        display: "flex",
        gap: window.innerWidth < 480 ? "0.5rem" : "1rem",
        flexDirection: "column",
        alignItems: "flex-end"
      }}>
        <a
          href="https://m.me/ZeijinDiscountedTopUpSalePH"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on Messenger"
          style={{
            width: window.innerWidth < 480 ? "45px" : "60px",
            height: window.innerWidth < 480 ? "45px" : "60px",
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/960px-Facebook_Messenger_logo_2020.svg.png" alt="Messenger" style={{ width: window.innerWidth < 480 ? "32px" : "44px", height: window.innerWidth < 480 ? "32px" : "44px" }} />
        </a>
        <a
          href="https://www.facebook.com/ZeijinDiscountedTopUpSalePH"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Facebook"
          style={{
            width: window.innerWidth < 480 ? "45px" : "60px",
            height: window.innerWidth < 480 ? "45px" : "60px",
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
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(24, 119, 242, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(24, 119, 242, 0.5)";
          }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1280px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" style={{ width: window.innerWidth < 480 ? "32px" : "44px", height: window.innerWidth < 480 ? "32px" : "44px" }} />
        </a>
        <a
          href="https://t.me/Zeijin_Discounted_Top_Up_Sale_PH"
          target="_blank"
          rel="noopener noreferrer"
          title="Join Telegram"
          style={{
            width: window.innerWidth < 480 ? "45px" : "60px",
            height: window.innerWidth < 480 ? "45px" : "60px",
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
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/960px-Telegram_logo.svg.png" alt="Telegram" style={{ width: window.innerWidth < 480 ? "32px" : "44px", height: window.innerWidth < 480 ? "32px" : "44px" }} />
        </a>
        <a
          href="https://www.instagram.com/zeijindiscountedgame?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          title="Follow on Instagram"
          style={{
            width: window.innerWidth < 480 ? "45px" : "60px",
            height: window.innerWidth < 480 ? "45px" : "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e02c70, #c13584)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: window.innerWidth < 480 ? "1.5rem" : "1.8rem",
            boxShadow: "0 4px 15px rgba(224, 44, 112, 0.5)",
            transition: "all 0.3s",
            textDecoration: "none",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(224, 44, 112, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(224, 44, 112, 0.5)";
          }}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" style={{ width: window.innerWidth < 480 ? "28px" : "32px", height: window.innerWidth < 480 ? "28px" : "32px" }} />
        </a>
        <a
          href="https://m.me/j/AbYX1OEPa00PufWZ/"
          target="_blank"
          rel="noopener noreferrer"
          title="Join Broadcast Channel"
          style={{
            width: window.innerWidth < 480 ? "45px" : "60px",
            height: window.innerWidth < 480 ? "45px" : "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.5)",
            transition: "all 0.3s",
            textDecoration: "none",
            cursor: "pointer",
            fontSize: window.innerWidth < 480 ? "1.3rem" : "1.5rem",
            padding: "8px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.15)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.5)";
          }}
        >
          📢
        </a>
      </div>

      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <EventCarousel 
            events={eventsData.filter(event => getEventStatus(event.startDate, event.endDate) !== "ended")} 
            getEventStatus={getEventStatus}
          />
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
                  
                  const isPopular = game.pricing.length >= 10;
                  const isFlipped = flippedGames.has(game.id);
                  
                  return (
                    <div 
                      key={game.id} 
                      style={{
                        perspective: "1000px",
                        height: "100%"
                      }}
                    >
                      <div
                        onClick={() => toggleFlip(game.id)}
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "100%",
                          transition: "transform 0.6s",
                          transformStyle: "preserve-3d",
                          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                          cursor: "pointer"
                        }}
                      >
                        {/* Front of card */}
                        <div 
                          className={`game-card ${game.category}`}
                          style={{ 
                            position: "relative",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden"
                          }}
                        >
                          <div className="game-image" style={{ backgroundImage: `url(${game.image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
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
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/960px-Facebook_Messenger_logo_2020.svg.png" alt="Messenger" style={{ width: "16px", height: "16px", marginRight: "0.3rem" }} />
                            Ask Details
                          </button>
                        </div>
                      </div>
                        </div>

                        {/* Back of card */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(135deg, ${game.category === "moba" ? "rgba(0, 212, 255, 0.15), rgba(0, 100, 200, 0.15)" : game.category === "fps" ? "rgba(255, 165, 0, 0.15), rgba(255, 100, 0, 0.15)" : "rgba(157, 78, 221, 0.15), rgba(100, 50, 150, 0.15)"})`,
                            border: `2px solid ${game.category === "moba" ? "rgba(0, 212, 255, 0.4)" : game.category === "fps" ? "rgba(255, 165, 0, 0.4)" : "rgba(157, 78, 221, 0.4)"}`,
                            borderRadius: "8px",
                            padding: "1rem",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            boxSizing: "border-box",
                            overflow: "hidden"
                          }}
                        >
                          <div style={{ overflow: "auto", flex: 1 }}>
                            <div style={{ 
                              color: game.category === "moba" ? "#00d4ff" : game.category === "fps" ? "#ffa500" : "#9d4edd", 
                              fontWeight: "bold", 
                              fontSize: "0.95rem", 
                              marginBottom: "0.75rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem"
                            }}>
                              <span style={{ fontSize: "1.1rem" }}>⚡</span>
                              Quick Details
                            </div>
                            
                            {/* Package info */}
                            <div style={{ 
                              background: "rgba(0, 255, 136, 0.08)",
                              border: "1px solid rgba(0, 255, 136, 0.2)",
                              borderRadius: "6px",
                              padding: "0.6rem",
                              marginBottom: "0.6rem"
                            }}>
                              <div style={{ color: "#a0a0a0", fontSize: "0.7rem", marginBottom: "0.2rem" }}>📦 Packages</div>
                              <div style={{ color: "#00ff88", fontWeight: "bold", fontSize: "1.1rem" }}>{game.pricing.length}</div>
                            </div>

                            {/* Category */}
                            <div style={{ 
                              background: game.category === "moba" ? "rgba(0, 212, 255, 0.08)" : game.category === "fps" ? "rgba(255, 165, 0, 0.08)" : "rgba(157, 78, 221, 0.08)",
                              border: `1px solid ${game.category === "moba" ? "rgba(0, 212, 255, 0.2)" : game.category === "fps" ? "rgba(255, 165, 0, 0.2)" : "rgba(157, 78, 221, 0.2)"}`,
                              borderRadius: "6px",
                              padding: "0.6rem",
                              marginBottom: "0.6rem"
                            }}>
                              <div style={{ color: "#a0a0a0", fontSize: "0.7rem", marginBottom: "0.2rem" }}>🎮 Type</div>
                              <div style={{ 
                                color: game.category === "moba" ? "#00d4ff" : game.category === "fps" ? "#ffa500" : "#9d4edd",
                                fontWeight: "bold", 
                                fontSize: "0.9rem" 
                              }}>
                                {game.category.toUpperCase()}
                              </div>
                            </div>

                            {/* Discount */}
                            <div style={{ 
                              background: "rgba(255, 51, 51, 0.1)",
                              border: "1px solid rgba(255, 51, 51, 0.3)",
                              borderRadius: "6px",
                              padding: "0.6rem",
                              marginBottom: "0.6rem"
                            }}>
                              <div style={{ color: "#a0a0a0", fontSize: "0.7rem", marginBottom: "0.2rem" }}>💰 Savings</div>
                              <div style={{ color: "#ffb3b3", fontWeight: "bold", fontSize: "0.95rem" }}>Save {discount}!</div>
                            </div>

                            {/* Delivery */}
                            <div style={{ 
                              background: "rgba(100, 200, 255, 0.08)",
                              border: "1px solid rgba(100, 200, 255, 0.2)",
                              borderRadius: "6px",
                              padding: "0.6rem"
                            }}>
                              <div style={{ color: "#a0a0a0", fontSize: "0.7rem", marginBottom: "0.2rem" }}>⚡ Delivery</div>
                              <div style={{ color: "#64c8ff", fontWeight: "bold", fontSize: "0.9rem" }}>5-30 min</div>
                            </div>
                          </div>

                          <div style={{ 
                            color: "#a0a0a0", 
                            fontSize: "0.7rem", 
                            textAlign: "center", 
                            marginTop: "0.75rem",
                            paddingTop: "0.75rem",
                            borderTop: "1px solid rgba(255, 51, 51, 0.2)"
                          }}>
                            ↺ Click to flip back
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

        {/* Customer Feedback & Credibility Section */}
        <section className="container" style={{ marginTop: "3rem" }}>
          <h2 className="section-title">⭐ Customer Feedback & Trust</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "repeat(2, 1fr)",
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
            padding: "2rem",
            marginBottom: "2rem"
          }}>
            <p style={{ color: "#d0d0d0", marginBottom: "1.5rem", fontSize: "1.1rem", fontWeight: "bold" }}>We accept the following payment methods via Messenger:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "rgba(0, 132, 255, 0.1)", padding: "1.5rem", borderRadius: "8px", border: "1px solid #0084ff", textAlign: "center" }}>
                <img src="https://static.vecteezy.com/system/resources/previews/067/065/665/non_2x/gcash-logo-square-rounded-gcash-logo-free-download-gcash-logo-free-png.png" alt="GCash" style={{ width: "48px", height: "48px", marginBottom: "0.5rem" }} />
                <div style={{ color: "#0084ff", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.75rem" }}>GCash</div>
                <div style={{ fontSize: "0.85rem", color: "#a0a0a0" }}>⚡ Fastest delivery (5-10 mins)</div>
              </div>
              <div style={{ background: "rgba(255, 165, 0, 0.1)", padding: "1.5rem", borderRadius: "8px", border: "1px solid #ffa500", textAlign: "center" }}>
                <img src="https://logodix.com/logo/2206759.jpg" alt="PayMaya" style={{ width: "48px", height: "48px", marginBottom: "0.5rem" }} />
                <div style={{ color: "#ffa500", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.75rem" }}>PayMaya</div>
                <div style={{ fontSize: "0.85rem", color: "#a0a0a0" }}>⚡ Fast delivery (10-15 mins)</div>
              </div>
              <div style={{ background: "rgba(0, 51, 102, 0.1)", padding: "1.5rem", borderRadius: "8px", border: "1px solid #003366", textAlign: "center" }}>
                <img src="https://logodix.com/logo/925694.png" alt="BDO" style={{ width: "48px", height: "48px", marginBottom: "0.5rem" }} />
                <div style={{ color: "#4a90e2", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.75rem" }}>BDO Bank Transfer</div>
                <div style={{ fontSize: "0.85rem", color: "#a0a0a0" }}>⏱ Standard delivery (15-30 mins)</div>
              </div>
              <div style={{ background: "rgba(204, 0, 0, 0.1)", padding: "1.5rem", borderRadius: "8px", border: "1px solid #cc0000", textAlign: "center" }}>
                <img src="https://images.seeklogo.com/logo-png/35/1/bpi-bank-of-the-philippine-islands-logo-png_seeklogo-352316.png" alt="BPI" style={{ width: "48px", height: "48px", marginBottom: "0.5rem" }} />
                <div style={{ color: "#cc0000", fontWeight: "bold", fontSize: "1.1rem", marginBottom: "0.75rem" }}>BPI Bank Transfer</div>
                <div style={{ fontSize: "0.85rem", color: "#a0a0a0" }}>⏱ Standard delivery (15-30 mins)</div>
              </div>
            </div>
            <p style={{ color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "1rem" }}>
              💡 Other bank transfers available via GCash. Contact us for details!
            </p>
            <div style={{ background: "rgba(0, 255, 136, 0.1)", padding: "1rem", borderRadius: "8px", border: "1px solid #00ff88" }}>
              <p style={{ color: "#00ff88", fontSize: "0.95rem", margin: "0", fontWeight: "bold" }}>
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
                  <li><strong>Message Us:</strong> Click "💬 Ask Details" on the game card or use the floating messenger button in the bottom right corner.</li>
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

        {/* Payment Method Trust Badges */}
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "rgba(0, 132, 255, 0.08)", borderRadius: "6px" }}>
            <img src="https://static.vecteezy.com/system/resources/previews/067/065/665/non_2x/gcash-logo-square-rounded-gcash-logo-free-download-gcash-logo-free-png.png" alt="GCash" style={{ width: "20px", height: "20px" }} />
            <span style={{ fontSize: "0.8rem", color: "#a0a0a0", fontWeight: "bold" }}>GCash</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "rgba(255, 165, 0, 0.08)", borderRadius: "6px" }}>
            <img src="https://logodix.com/logo/2206759.jpg" alt="Maya" style={{ width: "20px", height: "20px" }} />
            <span style={{ fontSize: "0.8rem", color: "#a0a0a0", fontWeight: "bold" }}>Maya</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "rgba(0, 51, 102, 0.08)", borderRadius: "6px" }}>
            <img src="https://logodix.com/logo/925694.png" alt="BDO" style={{ width: "20px", height: "20px" }} />
            <span style={{ fontSize: "0.8rem", color: "#a0a0a0", fontWeight: "bold" }}>BDO</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", background: "rgba(204, 0, 0, 0.08)", borderRadius: "6px" }}>
            <img src="https://images.seeklogo.com/logo-png/35/1/bpi-bank-of-the-philippine-islands-logo-png_seeklogo-352316.png" alt="BPI" style={{ width: "20px", height: "20px" }} />
            <span style={{ fontSize: "0.8rem", color: "#a0a0a0", fontWeight: "bold" }}>BPI</span>
          </div>
        </div>
        
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
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
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/960px-Facebook_Messenger_logo_2020.svg.png" alt="Messenger" style={{ width: "18px", height: "18px" }} />
            Messenger
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
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1280px-Facebook_f_logo_%282019%29.svg.png" alt="Facebook" style={{ width: "18px", height: "18px" }} />
            Facebook
          </a>

          <a 
            href="https://www.instagram.com/zeijindiscountedgame?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.5rem",
              padding: "0.6rem 1.2rem",
              background: "rgba(224, 44, 112, 0.1)",
              border: "1px solid #e02c70",
              borderRadius: "6px",
              color: "#e02c70",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(224, 44, 112, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(224, 44, 112, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" style={{ width: "20px", height: "20px" }} />
            Instagram
          </a>

          <a 
            href="https://t.me/Zeijin_Discounted_Top_Up_Sale_PH" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.5rem",
              padding: "0.6rem 1.2rem",
              background: "rgba(0, 136, 204, 0.1)",
              border: "1px solid #0088cc",
              borderRadius: "6px",
              color: "#0088cc",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0, 136, 204, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0, 136, 204, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/960px-Telegram_logo.svg.png" alt="Telegram" style={{ width: "20px", height: "20px" }} />
            Telegram
          </a>

          <a 
            href="https://m.me/j/AbYX1OEPa00PufWZ/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.5rem",
              padding: "0.6rem 1.2rem",
              background: "rgba(102, 126, 234, 0.1)",
              border: "1px solid #667eea",
              borderRadius: "6px",
              color: "#667eea",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(102, 126, 234, 0.2)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: "1rem" }}>📢</span>
            Broadcast Channel
          </a>
        </div>
      </footer>

      {/* Contact Choice Modal with IGN Validator */}
      {contactGame && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: window.innerWidth < 480 ? "1rem" : "2rem", paddingTop: window.innerWidth < 480 ? "2rem" : "2rem", paddingBottom: window.innerWidth < 480 ? "2rem" : "2rem", overflowY: "auto" }}>
          <div style={{ background: "rgba(20, 20, 30, 0.98)", padding: window.innerWidth < 480 ? "1.5rem" : "2rem", borderRadius: "8px", border: "2px solid #ff3333", maxWidth: "550px", width: "100%", maxHeight: window.innerWidth < 480 ? "90vh" : "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
              <div>
                <h2 style={{ color: "#ff3333", marginBottom: "0.3rem", fontSize: "1.6rem" }}>📝 Order Details</h2>
                <p style={{ color: "#a0a0a0", marginBottom: "0", fontSize: "0.85rem" }}>{contactGame.title}</p>
              </div>
              <button 
                onClick={() => setContactGame(null)} 
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

            {/* IGN Validator Form - Step 1 */}
            <h3 style={{ color: "#00ff88", fontSize: "1rem", fontWeight: "bold", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ background: "#00ff88", color: "#1a1a1a", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.9rem" }}>1</span> Order Details</h3>
            <div style={{ background: "rgba(255, 51, 51, 0.05)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(255, 51, 51, 0.2)", marginBottom: "1.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", color: "#ff3333", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.4rem" }}>
                  💰 Order Amount (Php)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 500, 1000"
                  value={ignValidatorData.orderedAmount}
                  onChange={(e) => setIgnValidatorData({...ignValidatorData, orderedAmount: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    border: "1px solid rgba(255, 51, 51, 0.3)",
                    borderRadius: "6px",
                    background: "rgba(255, 51, 51, 0.08)",
                    color: "#e0e0e0",
                    boxSizing: "border-box",
                    fontSize: "0.9rem"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", color: "#00ff88", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.4rem" }}>
                  👤 In-Game User ID / Username
                </label>
                <input
                  type="text"
                  placeholder="Your game username or UID"
                  value={ignValidatorData.ign}
                  onChange={(e) => setIgnValidatorData({...ignValidatorData, ign: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    border: "1px solid rgba(0, 255, 136, 0.3)",
                    borderRadius: "6px",
                    background: "rgba(0, 255, 136, 0.08)",
                    color: "#e0e0e0",
                    boxSizing: "border-box",
                    fontSize: "0.9rem"
                  }}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", color: "#0084ff", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.4rem" }}>
                  💳 Payment Method
                </label>
                <select
                  value={ignValidatorData.paymentMethod}
                  onChange={(e) => setIgnValidatorData({...ignValidatorData, paymentMethod: e.target.value})}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    border: "1px solid rgba(0, 132, 255, 0.3)",
                    borderRadius: "6px",
                    background: "rgba(0, 132, 255, 0.08)",
                    color: "#e0e0e0",
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
                <label style={{ display: "block", color: "#ffa500", fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.4rem" }}>
                  ❓ Other Concerns (Optional)
                </label>
                <textarea
                  placeholder="Any questions or special requests?"
                  value={ignValidatorData.otherConcern}
                  onChange={(e) => setIgnValidatorData({...ignValidatorData, otherConcern: e.target.value})}
                  style={{
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
                  }}
                />
              </div>
            </div>

            {/* Platform Selection - Step 2 */}
            <h3 style={{ color: "#00ff88", fontSize: "1rem", fontWeight: "bold", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ background: "#00ff88", color: "#1a1a1a", width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.9rem" }}>2</span> Choose a Platform</h3>
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                {/* Messenger Option */}
                <a
                  href={`https://m.me/ZeijinDiscountedTopUpSalePH?text=${encodeURIComponent(`Hi! I'm interested in ${contactGame.title} and would like to know more about the pricing and packages.\n\nOrder Amount: ${ignValidatorData.orderedAmount}\nUID: ${ignValidatorData.ign}\nMode of payment: ${ignValidatorData.paymentMethod}\n\nOther concern: ${ignValidatorData.otherConcern || 'None'}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(0, 132, 255, 0.1)",
                    border: "2px solid #0084ff",
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
                    e.currentTarget.style.background = "rgba(0, 132, 255, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0, 132, 255, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/960px-Facebook_Messenger_logo_2020.svg.png" alt="Messenger" style={{ width: "32px", height: "32px" }} />
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div style={{ color: "#0084ff", fontWeight: "bold", fontSize: "0.95rem" }}>Messenger</div>
                    <div style={{ color: "#a0a0a0", fontSize: "0.75rem" }}>Fastest response</div>
                  </div>
                  <span style={{ color: "#0084ff", fontWeight: "bold" }}>→</span>
                </a>

                {/* Telegram Option */}
                <a
                  href={`https://t.me/Zeijin_Discounted_Top_Up_Sale_PH?text=${encodeURIComponent(`Hi! I'm interested in ${contactGame.title} and would like to know more about the pricing and packages.\n\nOrder Amount: ${ignValidatorData.orderedAmount}\nUID: ${ignValidatorData.ign}\nMode of payment: ${ignValidatorData.paymentMethod}\n\nOther concern: ${ignValidatorData.otherConcern || 'None'}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(0, 136, 204, 0.1)",
                    border: "2px solid #0088cc",
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
                    e.currentTarget.style.background = "rgba(0, 136, 204, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0, 136, 204, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/960px-Telegram_logo.svg.png" alt="Telegram" style={{ width: "32px", height: "32px" }} />
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div style={{ color: "#0088cc", fontWeight: "bold", fontSize: "0.95rem" }}>Telegram</div>
                    <div style={{ color: "#a0a0a0", fontSize: "0.75rem" }}>Secure & fast</div>
                  </div>
                  <span style={{ color: "#0088cc", fontWeight: "bold" }}>→</span>
                </a>

                {/* Instagram Option */}
                <a
                  href={`https://www.instagram.com/direct/t/ZeijinDiscountedGames?text=${encodeURIComponent(`Hi! I'm interested in ${contactGame.title} and would like to know more about the pricing and packages.%0A%0AOrder Amount: ${ignValidatorData.orderedAmount}%0AUID: ${ignValidatorData.ign}%0AMode of payment: ${ignValidatorData.paymentMethod}%0A%0AOther concern: ${ignValidatorData.otherConcern || 'None'}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(224, 44, 112, 0.1)",
                    border: "2px solid #e02c70",
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
                    e.currentTarget.style.background = "rgba(224, 44, 112, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(224, 44, 112, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" style={{ width: "32px", height: "32px" }} />
                  <div style={{ textAlign: "left", flex: 1 }}>
                    <div style={{ color: "#e02c70", fontWeight: "bold", fontSize: "0.95rem" }}>Instagram DM</div>
                    <div style={{ color: "#a0a0a0", fontSize: "0.75rem" }}>Direct message</div>
                  </div>
                  <span style={{ color: "#e02c70", fontWeight: "bold" }}>→</span>
                </a>
              </div>
            </div>

            <button 
              onClick={() => setContactGame(null)} 
              style={{ 
                background: "rgba(255, 51, 51, 0.2)", 
                color: "#ff3333", 
                padding: "0.65rem 1.5rem", 
                border: "1px solid #ff3333",
                borderRadius: "20px", 
                cursor: "pointer", 
                fontSize: "0.95rem",
                width: "100%",
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
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedGame && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, overflowY: "auto", padding: window.innerWidth < 480 ? "1rem" : "2rem", paddingTop: window.innerWidth < 480 ? "2rem" : "2rem", paddingBottom: window.innerWidth < 480 ? "2rem" : "2rem" }}>
          <div style={{ background: "rgba(20, 20, 30, 0.98)", padding: window.innerWidth < 480 ? "1.5rem" : "2rem", borderRadius: "8px", border: "2px solid #ff3333", maxWidth: "600px", width: "100%", maxHeight: window.innerWidth < 480 ? "90vh" : "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1.5rem" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                  {selectedGame.image && (
                    <img src={selectedGame.image} alt={selectedGame.title} style={{ width: "80px", height: "80px", borderRadius: "8px", border: "2px solid #ff3333", objectFit: "cover" }} />
                  )}
                  <div>
                    <h2 style={{ color: "#ff3333", marginBottom: "0.5rem", fontSize: "1.8rem" }}>{selectedGame.title}</h2>
                    <p style={{ color: "#a0a0a0", marginBottom: "0", fontSize: "0.9rem" }}>{selectedGame.description}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedGame(null)} 
                style={{ 
                  background: "transparent", 
                  border: "none", 
                  color: "#ff3333", 
                  fontSize: "1.5rem", 
                  cursor: "pointer",
                  padding: "0.5rem",
                  minWidth: "40px"
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
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 51, 51, 0.2)";
                      e.currentTarget.style.borderColor = "#ff3333";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 51, 51, 0.1)";
                      e.currentTarget.style.borderColor = "rgba(255, 51, 51, 0.3)";
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "white", marginBottom: "0.5rem" }}>
                        {pkg.amount}
                      </div>
                      <div style={{ fontSize: "1.5rem", color: "#00ff88", fontWeight: "bold" }}>
                        {pkg.currency || "₱"}{pkg.price}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const priceText = `${pkg.amount} - ${pkg.currency || "₱"}${pkg.price}`;
                        navigator.clipboard.writeText(priceText);
                        alert('Copied to clipboard: ' + priceText);
                      }}
                      style={{
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
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(0, 255, 136, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(0, 255, 136, 0.2)";
                      }}
                    >
                      📋 Copy Price
                    </button>
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