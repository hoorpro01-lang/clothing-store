const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = './products.json';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const getProducts = () => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

app.get('/api/products', (req, res) => {
    try {
        const products = getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "خطأ في قراءة البيانات" });
    }
});

app.post('/api/products', (req, res) => {
    try {
        const { name, price, image } = req.body;
        if (!name || !price || !image) {
            return res.status(400).json({ error: "بيانات ناقصة" });
        }

        const products = getProducts();
        const newProduct = { id: Date.now(), name, price, image };
        products.unshift(newProduct);

        fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
        res.json({ message: "تم حفظ المنتج بنجاح", product: newProduct });
    } catch (err) {
        res.status(500).json({ error: "حدث خطأ أثناء الحفظ" });
    }
});

app.delete('/api/products/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let products = getProducts();
        products = products.filter(p => p.id !== id);

        fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
        res.json({ message: "تم الحذف بنجاح" });
    } catch (err) {
        res.status(500).json({ error: "حدث خطأ أثناء الحذف" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 السيرفر شغال بنجاح على المنفذ ${PORT}`);
});
