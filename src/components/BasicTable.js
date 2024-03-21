// BasicTable.js
import React, { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import sample_data from './sample_data.json';
import { COLUMNS } from './columns.js';
import SortPanel from './SortPanel';

const BasicTable = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('');

    const columns = useMemo(() => COLUMNS, []);

    const filteredData = useMemo(() => {
        let filtered = sample_data;

        if (searchQuery) {
            filtered = filtered.filter(item =>
                Object.values(item).some(value =>
                    value !== null && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }

        return filtered;
    }, [sample_data, searchQuery]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: {
                sortBy: [{ id: sortBy, desc: false }]
            }
        },
        useSortBy
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortChange = (selectedOption) => {
        setSortBy(selectedOption);
    };

    return (
        <div>
            <SortPanel
                options={[
                    { label: 'Default', value: '' },
                    { label: 'Name (A-Z)', value: 'name' },
                    { label: 'Name (Z-A)', value: '-name' },
                    // Add more sorting options as needed
                ]}
                selectedOption={sortBy}
                onChange={handleSortChange}
            />
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ marginBottom: '10px' }}
            />
            <table {...getTableProps()} style={{ border: 'solid 1px blue', borderCollapse: 'collapse' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    style={{ padding: '10px', border: 'solid 1px black' }}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px black' }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default BasicTable;
