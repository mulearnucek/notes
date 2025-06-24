"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SHEET_ID } from './data';
import Papa from 'papaparse';
import { CSQL } from './csql';
import Loading from '@/app/loading_';
import DepartmentSelectDialog from '@/components/DepartmentSelectDialog';

type DataContextType = {
    db: CSQL | undefined;
    vldb: CSQL | undefined;
    pyq: CSQL | undefined; // <-- add this
    dept: string;
    setDept: React.Dispatch<React.SetStateAction<string>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [db, setDb] = useState<CSQL>();
    const [vldb, setVldb] = useState<CSQL>();
    const [pyq, setPyq] = useState<CSQL>(); // <-- add this
    const [dept, setDept] = useState<string>('');
    const [showDeptDialog, setShowDeptDialog] = useState<boolean>(false);    useEffect(() => {
        Papa.parse(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=notes`, {
            download: true,
            header: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.error('Error loading database:', results.errors);
                } else {
                    const cachedDept = localStorage.getItem('dept');
                    if(cachedDept) {
                        setDept(cachedDept);
                    } else {
                        setShowDeptDialog(true);
                    }
                    setDb(new CSQL(results.data));
                }
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
            }
        });

        Papa.parse(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=playlists`, {
            download: true,
            header: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.error('Error loading VLDB:', results.errors);
                } else {
                    setVldb(new CSQL(results.data));
                }
            },
            error: (error) => {
                console.error('Error parsing VLDB CSV:', error);
            }
        });

        Papa.parse(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=pyq`, {
            download: true,
            header: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.error('Error loading PYQ:', results.errors);
                } else {
                    setPyq(new CSQL(results.data));
                }
            },
            error: (error) => {
                console.error('Error parsing PYQ CSV:', error);
            }
        });
    }, []);    useEffect(() => {
        if (dept) {
            localStorage.setItem('dept', dept);
        }
    }, [dept]);

    const handleDepartmentSelect = (selectedDept: string) => {
        setDept(selectedDept);
        setShowDeptDialog(false);
    };
        return (
        <DataContext.Provider value={{ db, vldb, pyq, dept, setDept }}>
            <DepartmentSelectDialog 
                isOpen={showDeptDialog} 
                onSelect={handleDepartmentSelect}
                db={db}
            />
            {db && vldb && pyq ? children : <Loading msg="Getting your notes..." />}
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