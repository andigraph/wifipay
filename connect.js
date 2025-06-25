const connector = new TonConnectSDK.TonConnect({
  manifestUrl: "https://deeppay.vercel.app/tonconnect-manifest.json"
});

connector.restoreConnection();

document.getElementById("connect-btn").onclick = async () => {
  try {
    await connector.connect({ jsBridgeKey: "telegram" });
    const wallet = connector.wallet;
    if (wallet) {
      document.getElementById("address").classList.remove("hidden");
      document.getElementById("address").textContent = `✅ Terkoneksi: ${wallet.account.address}`;
      document.getElementById("pay-section").classList.remove("hidden");
    }
  } catch (error) {
    alert("Gagal menyambungkan wallet Telegram");
  }
};

document.getElementById("pay-btn").onclick = async () => {
  try {
    const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: "EQCabc123...", // Ganti dengan wallet DEEP NET
          amount: "100000000",     // 0.1 TON
          payload: TonConnectSDK.toNano("0.1"),
          stateInit: undefined,
          payload: "BAYAR_WIFI"
        }
      ]
    };

    await connector.sendTransaction(tx);
    document.getElementById("status").textContent = "✅ Transaksi terkirim!";
  } catch (error) {
    document.getElementById("status").textContent = "❌ Gagal mengirim transaksi.";
  }
};