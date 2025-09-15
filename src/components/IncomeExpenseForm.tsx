import React, { useState } from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";

const categories = ["食費", "交通費", "娯楽", "給料", "その他"];

const IncomeExpenseForm = ({ onAdd }: { onAdd: (data: any) => void }) => {
    const [type, setType] = useState("収入");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [memo, setMemo] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount) return;
        onAdd({ type, amount: Number(amount), category, memo });
        setAmount("");
        setMemo("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
            <TextField select label="種別" value={type} onChange={(e) => setType(e.target.value)} className="w-24">
                <MenuItem value="収入">収入</MenuItem>
                <MenuItem value="支出">支出</MenuItem>
            </TextField>
            <TextField
                label="金額"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-32"
                required
            />
            <TextField
                select
                label="カテゴリ"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-32"
            >
                {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                        {cat}
                    </MenuItem>
                ))}
            </TextField>
            <TextField label="メモ" value={memo} onChange={(e) => setMemo(e.target.value)} className="w-40" />
            <Button type="submit" variant="contained" className="bg-blue-500 hover:bg-blue-600 text-white">
                追加
            </Button>
        </Box>
    );
};

export default IncomeExpenseForm;
