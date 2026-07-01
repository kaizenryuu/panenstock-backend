const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());

// Menghubungkan ke database Supabase menggunakan Variabel Lingkungan di Render
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint dasar untuk mengecek apakah server aktif
app.get('/', (req, res) => {
  res.status(200).json({ message: "Server Backend PanenStock Aktif & Berjalan Lancar!" });
});

// Endpoint untuk menerima data chat/foto (Logika OCR & Simpan Data)
app.post('/api/panen', async (req, res) => {
  try {
    const { nama_barang, stok, image_url } = req.body;

    // Menyimpan data ke dalam tabel 'stok_barang' di Supabase
    const { data, error } = await supabase
      .from('stok_barang')
      .insert([{ nama_barang, stok, image_url }]);

    if (error) throw error;

    res.status(200).json({ success: true, message: "Data berhasil disimpan ke Supabase!", data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server PanenStock berjalan di port ${PORT}`);
});
