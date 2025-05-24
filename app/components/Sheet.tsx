"use client";
import { useEffect, useState } from 'react';
import ListCard from './list';

type Row = {
  c: Array<{ v: string | number | null } | undefined>;
};

type GoogleSheetDataProps = {
  keywords: string[];
};

const GoogleSheetData = ({ keywords }: GoogleSheetDataProps) => {
  const [data, setData] = useState<Row[]>([]);
  const [filteredData, setFilteredData] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 300); // delay loader appearance
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sheetId = '1R9hJjxUYZCNgntXunSAhzxKLlBgUCL6RBZLc1gPt5Ks';
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    const fetchSheetData = async () => {
      try {
        const response = await fetch(sheetUrl);
        const text = await response.text();
        const jsonData = JSON.parse(text.substring(47).slice(0, -2));
        const rows = jsonData.table.rows;

        setData(rows);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSheetData();
  }, []);

  useEffect(() => {
    if (keywords.length === 3) {
      const filtered = data.filter((row: Row) =>
        keywords.every((keyword) =>
          row.c.some((cell) => {
            if (cell?.v) {
              const cellValue = typeof cell.v === 'string' ? cell.v.toLowerCase() : String(cell.v).toLowerCase();
              return cellValue.includes(keyword.toLowerCase());
            }
            return false;
          })
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData([]); // Require exactly 3 keywords
    }
  }, [keywords, data]);

  if (loading && showLoader) {
    return <div className='h-[90vh] w-full flex items-center justify-center flex-col'>Loading...</div>;
  }

 return (
  <div className='h-[90vh] w-full flex items-center justify-center flex-col'>
    <h2 className='font-bold'>Available downloads</h2>

    {loading && showLoader ? (
      <div>Loading...</div>
    ) : filteredData.length > 0 ? (
      filteredData.map((row: Row, index: number) => {
        const [col1, col2, col3, col4, col5,col6] = row.c;
        return (
          <div key={index}>
            <ListCard
             depts={String(col1?.v ?? 'N/A')}
        types={String(col6?.v ?? 'N/A')}
        semesters={String(col2?.v ?? 'N/A')}
        titles={String(col5?.v ?? 'N/A')}
        subjects={String(col3?.v ?? 'N/A')}
        links={String(col4?.v ?? 'N/A')}/>
          </div>
        );
      })
    ) : (
      <p>No resource found.</p>
    )}
  </div>
);
;
};

export default GoogleSheetData;
