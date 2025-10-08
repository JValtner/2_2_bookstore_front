import React from "react";

const BookFilterSection = ({ filter, setFilter, authors }) => {
  const handleChange = (field, value) => {
    setFilter(prev => ({
      ...prev,
      [field]: value || null
    }));
  };

  return (
    <div className="book-filter-section">
      <div className="filter-row">
        <label>
          Title:
          <input type="text" value={filter.Title || ""} onChange={(e) => handleChange("Title", e.target.value)} />
        </label>

        <label>
          Published From:
          <input type="date" value={filter.PublishedDateFrom || ""} onChange={(e) => handleChange("PublishedDateFrom", e.target.value)} />
        </label>

        <label>
          Published To:
          <input type="date" value={filter.PublishedDateTo || ""} onChange={(e) => handleChange("PublishedDateTo", e.target.value)} />
        </label>
      </div>

      <div className="filter-row">
        <label>
          Author Name:
          <input type="text" value={filter.AuthorFullName || ""} onChange={(e) => handleChange("AuthorFullName", e.target.value)} />
        </label>

        <label>
          Author:
          <select value={filter.AuthorId || 0} onChange={(e) => handleChange("AuthorId", parseInt(e.target.value))}>
            <option value={0}>-- Select Author --</option>
            {authors.map(author => (
              <option key={author.id} value={author.id}>{author.fullName}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-row">
        <label>
          Author DOB From:
          <input type="date" value={filter.AuthorDateOfBirthFrom || ""} onChange={(e) => handleChange("AuthorDateOfBirthFrom", e.target.value)} />
        </label>

        <label>
          Author DOB To:
          <input type="date" value={filter.AuthorDateOfBirthTo || ""} onChange={(e) => handleChange("AuthorDateOfBirthTo", e.target.value)} />
        </label>
      </div>
    </div>
  );
};

export default BookFilterSection;
