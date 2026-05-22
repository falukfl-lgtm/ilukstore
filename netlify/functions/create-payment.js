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
    const { buyerName, productCode, gameId, zoneId, itemName, price } = body;

    const VIP_API_KEY   = process.env.VIP_API_KEY;
    const VIP_API_ID    = process.env.VIP_API_ID;
    const VIP_API_SIGN  = process.env.VIP_API_SIGN;

    // Buat signature MD5
    const sign = crypto.createHash('md5')
      .update(VIP_API_KEY + 'prod')
      .digest('hex');

    // Buat ID transaksi unik
    const trxId = 'ASB-' + Date.now();

    // Kirim order ke VIP Reseller
    const vipRes = await fetch('https://vip-reseller.co.id/api/game-feature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        key:       VIP_API_KEY,
        sign:      sign,
        type:      'order',
        service:   productCode,
        data_no:   gameId,
        data_zone: zoneId || '',
        trx_id:    trxId
      })
    });

    const vipData = await vipRes.json();
    console.log('VIP Response:', JSON.stringify(vipData));

    if (vipData.result === true) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Top up sedang diproses!',
          trxId: trxId,
          data: vipData.data
        })
      };
    } else {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: false,
          message: vipData.message || 'Gagal memproses order'
        })
      };
    }

  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: err.message })
    };
  }
};
