const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const app = express();
const port = 3000;

// view engine hbs
app.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'prasetya',
    password: '1234',
    database: 'pembayaran_spp'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

//login-------

app.get('/', (req, res) => {
    koneksi.query('SELECT*FROM login', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'ppob',
            data: hasil
        });
    });
});

app.post('/', (req, res) =>{
    var EMAIL = req.body.inputEMAIL;
    var PASSWORD = req.body.inputPASSWORD;
    koneksi.query('INSERT INTO login(EMAIL, PASSWORD)values(?,?)',
    [EMAIL, PASSWORD],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});

//INPUT PEMBBAYARAN
app.get('/pembayaran', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('pembayaran.hbs',{
            judulhalaman: 'DATA-PEMBAYARAN',
            data: hasil
        });
    });
});

app.post('/pembayaran', (req, res) =>{
    var siswa = req.body.inputsiswa;
    var bulan = req.body.inputbulan;
    var jumlah = req.body.inputtahun;
    var tangggal_transaksi = req.body.inputtangggal_transaksi;
    koneksi.query('INSERT INTO pembayaran(siswa, bulan, jumlah, tangggal_transaksi)values(?,?,?,?)',
    [siswa, bulan, jumlah, tangggal_transaksi],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/pembayaran');
    }
    )
});

app.get('/hapus-id_pembayaran/:id_pembayaran', (req, res) => {
    var id_pembayaran = req.params.id_pembayaran;
    koneksi.query("DELETE FROM pembayaran WHERE id_pembayaran=?",
         [id_pembayaran], (err, hasil) => {
             if(err) throw err;
             res.redirect('/pembayaran');
         }
    )
});

//DATA PEMBAYARAN
app.get('/data', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('data.hbs',{
            judulhalaman: 'DATA-PEMBAYARAN',
            data: hasil
        });
    });
});

app.post('/data', (req, res) =>{
    var siswa = req.body.inputsiswa;
    var bulan = req.body.inputbulan;
    var jumlah = req.body.inputtahun;
    var tangggal_transaksi = req.body.inputtangggal_transaksi;
    koneksi.query('INSERT INTO pembayaran(siswa, bulan, jumlah, tangggal_transaksi)values(?,?,?,?)',
    [siswa, bulan, jumlah, tangggal_transaksi],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/data');
    }
    )
});

app.get('/hapus-id_pembayaran/:id_pembayaran', (req, res) => {
    var id_pembayaran = req.params.id_pembayaran;
    koneksi.query("DELETE FROM pembayaran WHERE id_pembayaran=?",
         [id_pembayaran], (err, hasil) => {
             if(err) throw err;
             res.redirect('/data');
         }
    )
});

//logout
app.get('/logout', (req, res) => {
    koneksi.query('SELECT*FROM login', (err, hasil) => {
        if(err) throw err;
        res.render('logout.hbs',{
            judulhalaman: 'ppob',
            data: hasil
        });
    });
});
app.listen(port, () => {
    console.log(`app  berjalan pada port ${port}`);
});