import React from "react";
import { Link } from "react-router-dom";
import BasicTable from "../../components/UiKit/Table/BasicTable";
import DataTable from "../../components/UiKit/Table/DataTable";
import SortingSelectingTable from "../../components/UiKit/Table/SortingSelectingTable";
import CustomizedTables from "../../components/UiKit/Table/CustomizedTables";
import CustomPaginationActions from "../../components/UiKit/Table/CustomPaginationActions";
import StickyHeadTable from "../../components/UiKit/Table/StickyHeadTable";

const Table = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Table</h5>

        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/ecommerce/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>UI Elements</li>
          <li>Table</li>
        </ul>
      </div>

      <BasicTable />

      <DataTable />

      <SortingSelectingTable />

      <CustomizedTables />

      <CustomPaginationActions />

      <StickyHeadTable />
    </>
  );
};

export default Table;
