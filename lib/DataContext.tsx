import React, { createContext, useContext, useState, ReactNode } from 'react';

type DataContextType = {
    data: any;
    setData: React.Dispatch<React.SetStateAction<any>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<any>(null);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};