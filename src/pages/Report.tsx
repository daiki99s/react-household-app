import React from "react";
import IncomeExpenseForm from "../components/IncomeExpenseForm";
import { useRecords } from "../context/RecordsContext";
import { Record } from "../context/RecordsContext";
import { Typography, Paper, Card, CardContent, Chip, Box } from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import EditRecordDialog, { EditRecord } from "../components/EditRecordDialog";

const Report = () => {
    const { records, addRecord, editRecord, deleteRecord } = useRecords();
    const [editOpen, setEditOpen] = React.useState(false);
    const [editIndex, setEditIndex] = React.useState<number | null>(null);
    const [editData, setEditData] = React.useState<EditRecord | null>(null);

    // 逆順表示のためのインデックス変換
    const reversedRecords = records.slice().reverse();
    const handleCardClick = (i: number) => {
        setEditIndex(i);
        setEditData(reversedRecords[i]);
        setEditOpen(true);
    };
    const handleEditSave = (data: EditRecord) => {
        if (editIndex !== null) {
            // 逆順なので元のindexに変換
            const originalIndex = records.length - 1 - editIndex;
            editRecord(originalIndex, data);
        }
        setEditOpen(false);
    };

    // 削除処理
    const handleEditDelete = () => {
        if (editIndex !== null) {
            const originalIndex = records.length - 1 - editIndex;
            deleteRecord(originalIndex);
        }
        setEditOpen(false);
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 h-screen flex flex-col">
            <Typography variant="h4" className="mb-6 text-center font-bold text-blue-700">
                収支レポート
            </Typography>

            <Paper className="p-4 mb-6 shadow-md bg-gradient-to-r from-blue-50 to-blue-100">
                <IncomeExpenseForm onAdd={addRecord} />
            </Paper>

            <div className="flex-1 overflow-hidden">
                <div className="space-y-6 h-full overflow-y-auto px-4 pb-8">
                    {records.length === 0 ? (
                        <Typography className="text-gray-400 text-center py-8">まだ記録がありません。</Typography>
                    ) : (
                        reversedRecords.map((r, i) => (
                            <Card
                                key={i}
                                className={`shadow-md hover:shadow-xl transition-shadow border-l-8 ${
                                    r.type === "収入"
                                        ? "border-green-400 bg-gradient-to-r from-green-50 to-green-100"
                                        : "border-red-400 bg-gradient-to-r from-red-50 to-red-100"
                                }`}
                                onClick={() => handleCardClick(i)}
                                style={{ cursor: "pointer" }}
                            >
                                <CardContent className="flex items-center justify-between py-4">
                                    <div>
                                        <Box className="flex items-center gap-2 mb-2">
                                            <Chip
                                                label={r.type}
                                                size="small"
                                                icon={r.type === "収入" ? <AddCircle /> : <RemoveCircle />}
                                                className={
                                                    r.type === "収入"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }
                                            />
                                            <Chip
                                                label={r.category}
                                                size="small"
                                                variant="outlined"
                                                className="text-gray-600"
                                            />
                                        </Box>
                                        {r.memo && (
                                            <Typography className="text-sm text-gray-500 mt-1">
                                                {r.memo}
                                            </Typography>
                                        )}
                                    </div>
                                    <Typography
                                        variant="h6"
                                        className={`font-bold text-right ${
                                            r.type === "収入" ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        {r.amount.toLocaleString()}円
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
            <EditRecordDialog
                open={editOpen}
                record={editData}
                onClose={() => setEditOpen(false)}
                onSave={handleEditSave}
                onDelete={handleEditDelete}
            />
        </div>
    );
};

export default Report;
