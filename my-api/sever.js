const express = require("express");
const app = express();
const PORT = 3000;

// Middleware เพื่อให้สามารถรับข้อมูล JSON ได้
app.use(express.json());

// ตัวอย่างข้อมูล (ฐานข้อมูลจำลอง)
let items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
];

// GET - ดึงข้อมูลทั้งหมด
app.get("/api/items", (req, res) => {
    res.json(items);
});

// GET - ดึงข้อมูลตาม ID
app.get("/api/items/:id", (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send("Item not found.");
    res.json(item);
});

// POST - สร้างข้อมูลใหม่
app.post("/api/items", (req, res) => {
    const newItem = {
        id: items.length + 1, // กำหนด ID ใหม่
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT - อัปเดตข้อมูลตาม ID
app.put("/api/items/:id", (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send("Item not found.");

    item.name = req.body.name;
    res.json(item);
});

// DELETE - ลบข้อมูลตาม ID
app.delete("/api/items/:id", (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send("Item not found.");

    items.splice(itemIndex, 1);
    res.status(204).send();
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
