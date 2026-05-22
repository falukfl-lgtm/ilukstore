exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(event.body);
    console.log('Webhook VIP:', JSON.stringify(payload));

    // Cek status transaksi
    const status = payload.status || payload.data?.status;

    if (status === 'Success' || status === 'success') {
      console.log('Top up berhasil:', payload);
    } else {
      console.log('Status:', status);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    console.error('Webhook error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
