const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// Menghubungkan ke database Supabase menggunakan Variabel Lingkungan
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint dasar untuk mengecek status server
app.get('/', (req, res) => {
  res.status(200).json({ message: "Server Backend PanenStock Aktif & Berjalan Lancar!" });
});

// Endpoint untuk menerima data (Simpan ke Supabase)
app.post('/api/panen', async (req, res) => {
  try {
    const { nama_barang, stok, image_url } = req.body;

    const { data, error } = await supabase
      .from('stok_barang')
      .insert([{ nama_barang, stok, image_url }]);

    if (error) throw error;

    res.status(200).json({ 
      success: true, 
      message: "Data berhasil disimpan ke Supabase!", 
      data 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Export untuk Vercel Serverless Function
module.exports = app;
