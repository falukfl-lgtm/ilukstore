const crypto = require('crypto');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    const body = JSON.parse(event.body);
    const { buyerName, productCode, gameId, zoneId, itemName, price, trxId, tgl } = body;

    const VIP_API_KEY  = process.env.VIP_API_KEY;
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;

    // Simpan order ke Supabase
    await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      body: JSON.stringify({
        trx_id:       trxId,
        tgl:          tgl,
        user_name:    buyerName,
        game:         itemName,
        game_id:      gameId,
        zone_id:      zoneId || '',
        item:         itemName,
        price:        'Rp ' + price.toLocaleString('id-ID'),
        raw_price:    price,
        product_code: productCode,
        status:       'pending'
      })
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Order tersimpan!' })
    };

  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: err.message })
    };
  }
};
