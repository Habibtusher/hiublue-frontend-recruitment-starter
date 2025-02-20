"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import Barchart from "./barchart";
import LineChart from "./linechart";

export default function DashboardSummary() {
  const [data, setData] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [filter, setFilter] = useState("this-week");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const API_HEADERS = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const statsResponse = await axios.get(
          `https://dummy-1.hiublue.com/api/dashboard/summary?filter=${filter}`,
          API_HEADERS
        );
        setStats(statsResponse.data);
        const dataResponse = await axios.get(
          `https://dummy-1.hiublue.com/api/dashboard/stat?filter=${filter}`,
          API_HEADERS
        );
        setData(dataResponse.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter, token]);

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0; // Avoid division by zero
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const statItems = stats
    ? [
        {
          title: "Total active users",
          value: stats.current.active_users,
          change: calculateChange(
            stats.current.active_users,
            stats.previous.active_users
          ),
        },
        {
          title: "Total clicks",
          value: stats.current.clicks,
          change: calculateChange(stats.current.clicks, stats.previous.clicks),
        },
        {
          title: "Total appearances",
          value: stats.current.appearance,
          change: calculateChange(
            stats.current.appearance,
            stats.previous.appearance
          ),
        },
      ]
    : [];

  // Loading state handling
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // flexDirection={{ xs: "column", sm: "row" }}
        mb={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Dashboard
        </Typography>
        <Select
          size="small"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="this-week">This Week</MenuItem>
          <MenuItem value="prev-week">Previous Week</MenuItem>
        </Select>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mt={2}>
        {statItems.map((stat, index) => {
          const increase = parseFloat(stat.change as string) >= 0;
          return (
            <Grid item xs={12} sm={6} lg={4} key={index}>
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
                <Typography color="gray">{stat.title}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {stat.value.toLocaleString()}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  {increase ? (
                    <ArrowUpward sx={{ color: "green", fontSize: 18 }} />
                  ) : (
                    <ArrowDownward sx={{ color: "red", fontSize: 18 }} />
                  )}
                  <Typography
                    sx={{ color: increase ? "green" : "red", ml: 0.5 }}
                  >
                    {stat.change}%
                  </Typography>
                  <Typography color="gray" ml={1}>
                    previous week
                  </Typography>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Grid container spacing={3} mt={2}>
        {/* Website Visits (Bar Chart) */}
        <Grid item xs={12} sm={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Website Visits
            </Typography>
            {data && <Barchart data={data} />}
          </Card>
        </Grid>

        {/* Offers Sent (Line Chart) */}
        <Grid item xs={12} sm={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Offers Sent
            </Typography>
            {data && <LineChart data={data} />}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
