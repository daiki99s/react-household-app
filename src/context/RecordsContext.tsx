import React, { createContext, useContext, useState } from "react";

export type Record = {
    type: string;
    amount: number;
    category: string;
    memo: string;
};

type RecordsContextType = {
    records: Record[];
    addRecord: (record: Record) => void;
    editRecord: (index: number, record: Record) => void;
};

const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

export const RecordsProvider = ({ children }: { children: React.ReactNode }) => {
    const [records, setRecords] = useState<Record[]>([]);
    const addRecord = (record: Record) => setRecords((prev) => [...prev, record]);
    const editRecord = (index: number, record: Record) =>
        setRecords((prev) => prev.map((r, i) => (i === index ? record : r)));
    return <RecordsContext.Provider value={{ records, addRecord, editRecord }}>{children}</RecordsContext.Provider>;
};

export const useRecords = () => {
    const context = useContext(RecordsContext);
    if (!context) throw new Error("useRecords must be used within RecordsProvider");
    return context;
};
