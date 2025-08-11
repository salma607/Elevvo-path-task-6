import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";
import { projects } from "./constant";
import Sidebar from "../../Component/Sidebar/Sidebar";


// Example: More customer projects

export default function Tables() {
  // Pagination state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Event handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Paginated slice
  const paginatedProjects = projects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const textstyle={
     color:"var(--color-gray)"
  };

  return (
    
    <div className=" mx-30 ">
      <Sidebar/>
      <Table sx={{border:" 1px var(--color-green) ", borderRadius:"10px"}}>
        <TableHead sx={{ background:"var(--color-lightgreen) "}} >
          <TableRow >
            <TableCell sx={textstyle} >Project name</TableCell>
            <TableCell sx={textstyle}>Type</TableCell>
            <TableCell sx={textstyle} >Date</TableCell>
            <TableCell sx={textstyle}>Customer Name</TableCell>
            <TableCell sx={textstyle}>Customer Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {paginatedProjects.map((row, idx) => (
            <TableRow key={page * rowsPerPage + idx}>
              <TableCell>{row.project}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={projects.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{color:"var(--color-gray)"}}
      />
    </div>
  );
}