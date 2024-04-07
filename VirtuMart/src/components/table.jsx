/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function Table({ columns, rows, idField }) {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        getRowId={(row) => row[idField]}
      />
    </Box>
  );
}
