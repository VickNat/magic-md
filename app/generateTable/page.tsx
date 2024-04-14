'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { MdContentCopy } from "react-icons/md";

const Page = () => {
  const [rows, setRows] = useState([['', '']]);
  const [padding, setPadding] = useState(true);

  const handleCellChange = (i: any, j: any, value: any) => {
    const newRows = [...rows];
    newRows[i][j] = value;
    setRows(newRows);
  };

  const addRow = () => {
    const newCols = Array(rows[0].length).fill('');
    setRows([...rows, newCols]);
  };

  const addColumn = () => {
    setRows(rows.map(row => [...row, '']));
  };

  const togglePadding = () => {
    setPadding(!padding);
  };

  const generateMarkdown = () => {
    const maxLengths = rows[0].map((_, j) => Math.max(...rows.map(row => row[j]?.length)));

    const markdownRows = rows.map(row => {
      const markdownRow = row.map((cell, j) => {
        const paddedCell = cell.padEnd(maxLengths[j]);
        return padding ? ` ${paddedCell} ` : paddedCell;
      }).join('|');

      const separator = row.map((_, j) => {
        const paddedSeparator = '-'.padEnd(maxLengths[j], '-');
        return padding ? ` ${paddedSeparator} ` : paddedSeparator;
      }).join('|');

      return `|${markdownRow}|\n|${separator}|`;
    });

    return markdownRows.join('\n');
  };

  const removeRow = () => {
    if (rows.length > 1) {
      setRows(rows.slice(0, -1));
    }
  };

  const removeColumn = () => {
    if (rows[0].length > 1) {
      setRows(rows.map(row => row.slice(0, -1)));
    }
  };

  const resetTable = () => {
    setRows([['', '']]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMarkdown());
  };

  return (
    <div className='min-h-[650px] mx-auto w-10/12 max-w-screen-xl flex flex-col justify-start items-center gap-y-8'>
      <h1 className='text-center font-bold text-3xl md:text-4xl' >Generate Link</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Button onClick={addRow} className='bg-indigo-500 hover:bg-indigo-600'>Add Row</Button>
        <Button onClick={addColumn} className='bg-indigo-500 hover:bg-indigo-600'>Add Column</Button>
        <Button onClick={removeRow} variant={'destructive'}>Remove Row</Button>
        <Button onClick={removeColumn} variant={'destructive'}>Remove Column</Button>
        <Button onClick={resetTable} className='bg-gray-400 hover:bg-gray-500'>Reset Table</Button>
        <Button onClick={togglePadding} className='bg-indigo-500 hover:bg-indigo-600'>{padding ? 'Remove Padding' : 'Add Padding'}</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <table className="w-full border-collapse">
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} className="border border-gray-300">
                    <input
                      value={cell}
                      onChange={e => handleCellChange(i, j, e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6 relative">
            <Button onClick={copyToClipboard} variant={'ghost'} className="absolute top-0 right-0 "><MdContentCopy className='h-6 w-auto text-indigo-600' /></Button>
            <pre>{generateMarkdown()}</pre>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Page