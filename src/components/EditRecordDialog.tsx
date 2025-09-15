import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from "@mui/material";

const categories = ["食費", "交通費", "娯楽", "給料", "その他"];

export type EditRecord = {
    type: string;
    amount: number;
    category: string;
    memo: string;
};

interface EditRecordDialogProps {
    open: boolean;
    record: EditRecord | null;
    onClose: () => void;
    onSave: (record: EditRecord) => void;
}

const EditRecordDialog: React.FC<EditRecordDialogProps> = ({ open, record, onClose, onSave }) => {
    const [type, setType] = useState(record?.type || "収入");
    const [amount, setAmount] = useState(record?.amount?.toString() || "");
    const [category, setCategory] = useState(record?.category || categories[0]);
    const [memo, setMemo] = useState(record?.memo || "");

    React.useEffect(() => {
        if (record) {
            setType(record.type);
            setAmount(record.amount.toString());
            setCategory(record.category);
            setMemo(record.memo || "");
        }
    }, [record]);

    const handleSave = () => {
        if (!amount) return;
        onSave({ type, amount: Number(amount), category, memo });
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ className: "rounded-xl bg-gradient-to-br from-blue-50 to-blue-100" }}>
            <DialogTitle>
                <span className="text-lg font-bold text-blue-700">レコード編集</span>
            </DialogTitle>
            <DialogContent>
                <Box className="flex flex-col gap-6 mt-2">
                    <Box className="flex gap-4">
                        <TextField
                            select
                            label="種別"
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className="w-28"
                        >
                            <MenuItem value="収入">収入</MenuItem>
                            <MenuItem value="支出">支出</MenuItem>
                        </TextField>
                        <TextField
                            label="金額"
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            className="w-32"
                            required
                        />
                    </Box>
                    <Box className="flex gap-4">
                        <TextField
                            select
                            label="カテゴリ"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="w-40"
                        >
                            {categories.map(cat => (
                                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="メモ"
                            value={memo}
                            onChange={e => setMemo(e.target.value)}
                            className="w-56"
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions className="flex justify-between px-6 pb-4">
                <Button onClick={onClose} variant="outlined" color="inherit" className="rounded-full">キャンセル</Button>
                <Button onClick={handleSave} variant="contained" color="primary" className="rounded-full bg-blue-500 hover:bg-blue-600 text-white">保存</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditRecordDialog;
