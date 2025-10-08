import React from "react";

const SortForm = ({ sortTypes, chosenType, onSortChange }) => {
  return (
    <div className="controls">
      <label>
        Sortiraj po:
        <select
          className="select"
          value={chosenType}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">-- Odaberi --</option>
          {sortTypes.map((stype) => (
            <option key={stype.key ?? stype.id} value={stype.key ?? stype.id}>
              {stype.name ?? stype.Name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SortForm;
