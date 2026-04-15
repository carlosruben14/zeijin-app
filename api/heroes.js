export default async function handler(req, res) {
  const fallbackHeroes = {
    data: [
      {
        hero_name: "Miya",
        hero_title: "Moonlight Archer",
        role: "Marksman",
        specialty: "Reap",
        lane_recommendation: "Gold Lane",
        region_of_origin: "Moonlit Forest",
        release_date: "2016-11-09",
        bp_price: 10800,
        diamond_price: 399
      },
      {
        hero_name: "Alucard",
        hero_title: "Demon Hunter",
        role: "Fighter",
        specialty: "Chase/Damage",
        lane_recommendation: "Jungle",
        region_of_origin: "Moniyan Empire",
        release_date: "2016-11-09",
        bp_price: 15000,
        diamond_price: 399
      },
      {
        hero_name: "Layla",
        hero_title: "Malefic Gunner",
        role: "Marksman",
        specialty: "Damage/Reap",
        lane_recommendation: "Gold Lane",
        region_of_origin: "Eruditio",
        release_date: "2016-11-09",
        bp_price: 0,
        diamond_price: 0
      },
      {
        hero_name: "Tigreal",
        hero_title: "Warrior of Dawn",
        role: "Tank",
        specialty: "Control",
        lane_recommendation: "Roam",
        region_of_origin: "Moniyan Empire",
        release_date: "2016-11-09",
        bp_price: 6500,
        diamond_price: 299
      },
      {
        hero_name: "Eudora",
        hero_title: "Lightning Weaver",
        role: "Mage",
        specialty: "Burst/Control",
        lane_recommendation: "Mid Lane",
        region_of_origin: "Northern Vale",
        release_date: "2016-11-09",
        bp_price: 2000,
        diamond_price: 120
      }
    ]
  };

  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    // Proxy request to MLBB API
    const response = await fetch('https://mlbb-wiki-api.vercel.app/api/heroes', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`Heroes upstream failed with status ${response.status}. Serving fallback data.`);
      return res.status(200).json({
        ...fallbackHeroes,
        source: 'fallback',
        upstreamStatus: response.status
      });
    }

    const data = await response.json();
    res.status(200).json({
      ...data,
      source: 'upstream'
    });
  } catch (error) {
    console.error('Heroes API error:', error);
    res.status(200).json({
      ...fallbackHeroes,
      source: 'fallback',
      error: 'Failed to fetch heroes data',
      message: error.message
    });
  }
}
