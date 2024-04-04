'use client'

import React, { useState } from 'react'
import { Table, Textarea, Button, CopyButton, ActionIcon, Tooltip, rem } from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';

const page = () => {
  const [tableData, setTableData] = useState<string[][]>([['', '', '']]);
  const [markdownContent, setMarkdownContent] = useState<string>('');


  const handleCellChange = (rowIndex: number, columnIndex: number, value: string) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][columnIndex] = value;
    setTableData(updatedTableData);

    // Update the Markdown representation
    const markdown = generateMarkdown(updatedTableData);
    setMarkdownContent(markdown);
  };

  const addRow = () => {
    setTableData([...tableData, Array(tableData[0].length).fill('')]);
  };

  const addColumn = () => {
    const updatedTableData = tableData.map((row) => [...row, '']);
    setTableData(updatedTableData);
  };

  const deleteLastRow = () => {
    if (tableData.length === 1) return;
    setTableData(tableData.slice(0, -1));
  };

  const deleteLastColumn = () => {
    if (tableData[0].length === 1) return;
    const updatedTableData = tableData.map((row) => row.slice(0, -1));
    setTableData(updatedTableData);
  };

  const generateMarkdown = (data: string[][]) => {
    return data.map((row) => `| ${row.join(' | ')} |`).join('\n');
  };


  return (
    <div>
      <Table>
        <Table.Tbody>
          {tableData.map((row, rowIndex) => (
            <Table.Tr key={rowIndex}>
              {row.map((cell, columnIndex) => (
                <Table.Td key={columnIndex}>
                  <Textarea
                    value={cell}
                    onChange={(event) =>
                      handleCellChange(rowIndex, columnIndex, event.target.value)
                    }
                  />
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Button onClick={addRow}>Add Row</Button>
      <Button onClick={addColumn}>Add Column</Button>
      <Button onClick={deleteLastRow}>Delete Last Row</Button>
      <Button onClick={deleteLastColumn}>Delete Last Column</Button>

      <CopyButton value={markdownContent} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
            <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
              {copied ? (
                <IconCheck style={{ width: rem(16) }} />
              ) : (
                <IconCopy style={{ width: rem(16) }} />
              )}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>

      <Textarea
        value={markdownContent}
        readOnly
        style={{ minHeight: '200px' }}
      />

    </div>
  )
}

export default page