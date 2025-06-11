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
    const timer = setTimeout(() => setShowLoader(true), 300);
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
      setFilteredData([]);
    }
  }, [keywords, data]);

  return (
    <div
      className="min-h-screen text-white flex flex-col justify-center items-center p-6"
      style={{
        backgroundImage: "url('/ucek.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: "sepia(0.4) saturate(1) contrast(1) brightness(0.9)",
      }}
    >
      <div className="bg-black/50 p-6 rounded-xl shadow-md backdrop-blur-md border border-gray-700 w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Available Downloads</h2>

        {loading && showLoader ? (
          <div className="text-white">Loading...</div>
        ) : filteredData.length > 0 ? (
          filteredData.map((row: Row, index: number) => {
            const [col1, col2, col3, col4, col5, col6] = row.c;
            return (
              <div key={index} className="mb-4">
                <ListCard
                  depts={String(col1?.v ?? 'N/A')}
                  types={String(col6?.v ?? 'N/A')}
                  semesters={String(col2?.v ?? 'N/A')}
                  titles={String(col5?.v ?? 'N/A')}
                  subjects={String(col3?.v ?? 'N/A')}
                  links={String(col4?.v ?? 'N/A')}
                />
              </div>
            );
          })
        ) : (
          <p>No resource found.</p>
        )}
      </div>
    </div>
  );
};

export default GoogleSheetData;
