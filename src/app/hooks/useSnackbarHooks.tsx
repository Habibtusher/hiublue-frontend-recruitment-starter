import { useState, useCallback } from "react";
import CustomSnackbar from "@/components/common/CustomSnackbar";

export default function useSnackbar() {
  const [snackbar, setSnackbar] = useState({
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
    open: false,
  });

  const showSnackbar = useCallback((message: string, severity: "success" | "error" | "warning" | "info") => {
    setSnackbar({ message, severity, open: true });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const SnackbarComponent = (
    <CustomSnackbar
      severity={snackbar.severity}
      message={snackbar.message}
      open={snackbar.open}
      onClose={closeSnackbar}
    />
  );

  return { showSnackbar, SnackbarComponent };
}
