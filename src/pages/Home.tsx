import React, { useMemo, useState } from "react";
import { useRecords } from "../context/RecordsContext";
import { Record } from "../context/RecordsContext";
import EditRecordDialog from "../components/EditRecordDialog";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { AttachMoney, RemoveCircle, AddCircle } from "@mui/icons-material";

const Home = () => {
    const { records, editRecord, deleteRecord } = useRecords();
    const [editOpen, setEditOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editRecordData, setEditRecordData] = useState(null);

    // 合計金額の計算
    const totals = useMemo(() => {
        return records.reduce(
            (acc, record) => {
                if (record.type === "収入") {
                    acc.income += record.amount;
                } else {
                    acc.expense += record.amount;
                }
                return acc;
            },
            { income: 0, expense: 0 }
        );
    }, [records]);

    // レコードクリック時
    const handleEditClick = (record: any, index: number) => {
        setEditIndex(index);
        setEditRecordData(record);
        setEditOpen(true);
    };

    // 編集保存時
    const handleEditSave = (newRecord: any) => {
        if (editIndex !== null) {
            editRecord(editIndex, newRecord);
        }
        setEditOpen(false);
    };

    // 削除処理
    const handleEditDelete = () => {
        if (editIndex !== null) {
            deleteRecord(editIndex);
        }
        setEditOpen(false);
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 h-screen flex flex-col pb-8">
            {/* タイトル */}
            <Typography variant="h4" className="mb-6 text-center font-bold">
                家計簿ダッシュボード
            </Typography>

            {/* 合計金額のカード */}
            <Box className="grid grid-cols-3 gap-6 mb-6">
                {/* 収入 */}
                <Card className="bg-green-50 hover:shadow-lg transition-shadow">
                    <CardContent className="text-center py-6">
                        <Typography variant="h6" className="text-green-600 flex items-center justify-center gap-2 mb-3">
                            <AddCircle /> 収入
                        </Typography>
                        <Typography variant="h5" className="text-green-700 font-bold">
                            {totals.income.toLocaleString()}円
                        </Typography>
                    </CardContent>
                </Card>

                {/* 支出 */}
                <Card className="bg-red-50 hover:shadow-lg transition-shadow">
                    <CardContent className="text-center py-6">
                        <Typography variant="h6" className="text-red-600 flex items-center justify-center gap-2 mb-3">
                            <RemoveCircle /> 支出
                        </Typography>
                        <Typography variant="h5" className="text-red-700 font-bold">
                            {totals.expense.toLocaleString()}円
                        </Typography>
                    </CardContent>
                </Card>

                {/* 残高 */}
                <Card className="bg-blue-50 hover:shadow-lg transition-shadow">
                    <CardContent className="text-center py-6">
                        <Typography variant="h6" className="text-blue-600 flex items-center justify-center gap-2 mb-3">
                            <AttachMoney /> 残高
                        </Typography>
                        <Typography variant="h5" className="text-blue-700 font-bold">
                            {(totals.income - totals.expense).toLocaleString()}円
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* 記録一覧 */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {records.length === 0 ? (
                    <Typography className="text-gray-500 text-center py-8">まだ記録がありません。</Typography>
                ) : (
                    <div className="space-y-6 p-4">
                        {records
                            .slice()
                            .reverse()
                            .map((r, i, arr) => {
                                // 逆順表示なので元indexを計算
                                const origIndex = records.length - 1 - i;
                                return (
                                    <Card
                                        key={i}
                                        className={`shadow-md hover:shadow-lg transition-shadow ${
                                            r.type === "収入"
                                                ? "border-l-4 border-green-500"
                                                : "border-l-4 border-red-500"
                                        } cursor-pointer`}
                                        onClick={() => handleEditClick(r, origIndex)}
                                    >
                                        <CardContent className="flex items-center justify-between">
                                            <div>
                                                <Box className="flex items-center gap-2 mb-1">
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
                                                className={`font-bold ${
                                                    r.type === "収入" ? "text-green-600" : "text-red-600"
                                                }`}
                                            >
                                                {r.amount.toLocaleString()}円
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                    </div>
                )}
            </div>

            {/* 編集モーダル */}
            <EditRecordDialog
                open={editOpen}
                record={editRecordData}
                onClose={() => setEditOpen(false)}
                onSave={handleEditSave}
                onDelete={handleEditDelete}
            />
        </div>
    );
};

export default Home;
