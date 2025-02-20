export const token = localStorage.getItem("token");
export const API_HEADERS = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };