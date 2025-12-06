import React from "react";
import { Link } from "react-router-dom";   
import SearchContent from "../components/Search/SearchContent";

const Search = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Search</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>Search</li>
        </ul>
      </div>

      <SearchContent />
    </>
  );
};

export default Search;
