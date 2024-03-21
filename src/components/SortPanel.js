// SortPanel.js
import React from 'react';

const SortPanel = ({ options, selectedOption, onChange }) => {
    return (
        <div>
            <h3>Sort By</h3>
            <select value={selectedOption} onChange={(e) => onChange(e.target.value)}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

export default SortPanel;
