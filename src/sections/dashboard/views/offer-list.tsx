import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Pagination,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  Tabs,
  Tab,
  Typography,
  Box,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "@/context/AuthContext";

const OffersTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalData, setTotalData] = useState(1);

  const [perPage, setPerPage] = useState(5);
  const { token } = useAuth();
  const API_HEADERS = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    let query = `https://dummy-1.hiublue.com/api/offers?page=${page}&per_page=${perPage}`;
    if (search) query += `&search=${search}`;
    if (type !== "all") query += `&type=${type}`;
    if (status !== "all") query += `&status=${status}`;

    fetch(query, API_HEADERS)
      .then((res) => res.json())
      .then((result) => {
        setData(result.data || []);
        setLastPage(result.meta?.last_page || 1);
        setTotalData(result.meta?.total);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [page, search, type, status, perPage]);

  const getStatusChip = (status: string) => {
    const statusStyles: Record<
      string,
      { backgroundColor: string; color: string }
    > = {
      accepted: { backgroundColor: "#22C55E29", color: "#22C55E" },
      rejected: { backgroundColor: "#FF563029", color: "#FF5630" },
      pending: { backgroundColor: "#FFAB0029", color: "#FFAB00" },
    };
    return (
      <Chip
        label={status}
        sx={{
          backgroundColor: statusStyles[status]?.backgroundColor || "#e0e0e0",
          color: statusStyles[status]?.color || "#000",
        }}
      />
    );
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" color="#1C252E" sx={{ marginBottom: 2 }}>
        Offer List
      </Typography>
      <Tabs
        value={status}
        onChange={(e, newValue) => setStatus(newValue)}
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#1C252E",
          },
          "& .MuiTab-root": {
            color: "#637381",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#1C252E",
            fontWeight: "bold",
          },
        }}
      >
        <Tab label="All" value="all" />
        <Tab label="Accepted" value="accepted" />
      </Tabs>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
          flexDirection: {
            xs: "column", // Column layout on extra small screens
            sm: "row", // Row layout on small screens and above
          },
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ marginTop: 2, overflowX: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 700, color: "#637381" }}>
                Name
              </TableCell>
              <TableCell style={{ fontWeight: 700, color: "#637381" }}>
                Phone Number
              </TableCell>
              <TableCell style={{ fontWeight: 700, color: "#637381" }}>
                Company
              </TableCell>
              <TableCell style={{ fontWeight: 700, color: "#637381" }}>
                Job Title
              </TableCell>
              <TableCell style={{ fontWeight: 700, color: "#637381" }}>
                Type
              </TableCell>
              <TableCell style={{ fontWeight: 700, color: "#637381" }}>
                Status
              </TableCell>
              <TableCell style={{ fontWeight: 700, color: "#637381" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((offer: any) => (
              <TableRow key={offer.id}>
                <TableCell>
                  <Typography> {offer.user_name}</Typography>
                  <Typography style={{ color: "#919EAB" }}>
                    {" "}
                    {offer.email}
                  </Typography>
                </TableCell>
                <TableCell>{offer.phone}</TableCell>
                <TableCell>{offer.company}</TableCell>
                <TableCell>{offer.jobTitle}</TableCell>
                <TableCell style={{ textTransform: "capitalize" }}>
                  {offer.type}
                </TableCell>
                <TableCell
                  style={{ textTransform: "capitalize", fontWeight: 700 }}
                >
                  {getStatusChip(offer.status)}
                </TableCell>
                <TableCell style={{ display: "flex", gap: "8px" }}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalData}
        page={page - 1} // MUI uses zero-based indexing
        onPageChange={(event, newPage) => setPage(newPage + 1)}
        rowsPerPage={perPage}
        onRowsPerPageChange={(event) =>
          setPerPage(parseInt(event.target.value, 10))
        }
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Paper>
  );
};

export default OffersTable;
