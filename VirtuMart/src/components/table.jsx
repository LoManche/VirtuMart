// Programmer: Ng Tiffany 1155158907
// Date: 2024-04-11
// Purpose:
//    This is the table component for the tables used in admin page

/* eslint-disable react/prop-types */
import { DataGrid, GridFooter } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function Table({ columns, rows, idField }) {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          rowLength: 100,
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20, 30]}
        disableSelectionOnClick
        disableColumnSelector
        getRowId={(row) => row[idField]}
        autoHeight
        components={{
          Footer: () => {
            return <GridFooter sx={{ minHeight: "40px", height: "40px" }} />;
          },
        }}
      />
    </Box>
  );
}
