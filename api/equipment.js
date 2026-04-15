export default async function handler(req, res) {
  const fallbackEquipment = {
    data: [
      {
        item_name: "Demon Hunter Sword",
        description: "Basic attacks deal bonus physical damage based on target current HP.",
        attack_power: "+35"
      },
      {
        item_name: "Berserker's Fury",
        description: "Provides high critical chance and critical damage for marksman and fighter heroes.",
        attack_power: "+65",
        crit_chance: "+25%"
      },
      {
        item_name: "Bloodlust Axe",
        description: "Gives spell vamp to sustain while casting skills.",
        attack_power: "+70"
      },
      {
        item_name: "Holy Crystal",
        description: "Massively increases magic power for burst mage builds.",
        magic_power: "+100"
      },
      {
        item_name: "Guardian Helmet",
        description: "Increases max HP and grants strong HP regeneration out of combat.",
        hp: "+1550"
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
    const response = await fetch('https://mlbb-wiki-api.vercel.app/api/equipment', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`Equipment upstream failed with status ${response.status}. Serving fallback data.`);
      return res.status(200).json({
        ...fallbackEquipment,
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
    console.error('Equipment API error:', error);
    res.status(200).json({
      ...fallbackEquipment,
      source: 'fallback',
      error: 'Failed to fetch equipment data',
      message: error.message
    });
  }
}
