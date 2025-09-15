import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NoMatch = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <Paper elevation={6} className="p-8 rounded-2xl max-w-md w-full flex flex-col items-center gap-6">
                <ErrorOutline className="text-blue-400" sx={{ fontSize: 60 }} />
                <Typography variant="h5" className="font-bold text-blue-700 text-center">
                    ご指定のページが見つかりません
                </Typography>
                <Typography variant="h6" className="text-blue-500">404 Error</Typography>
                <Typography className="text-gray-600 text-center">
                    アクセスしようとしたページは変更または削除されたか、現在利用できません。<br />
                    ご不便をおかけいたしますが、URLをご確認いただくか、ホーム画面より再度ご訪問ください。
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    className="rounded-full mt-2 bg-blue-500 hover:bg-blue-600"
                    onClick={() => navigate("/")}
                >
                    ホームに戻る
                </Button>
            </Paper>
        </div>
    );
};

export default NoMatch;
