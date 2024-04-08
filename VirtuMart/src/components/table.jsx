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
        disableRowSelectionOnClick
        getRowId={(row) => row[idField]}
        autoHeight
        components={{
          Footer: () => {
            return <GridFooter sx={{ minHeight: "40px", height: "40px" }} />;
          },
        }}
        autosizeOnMount
      />
    </Box>
  );
}
