import axios from "axios";

export const getCountryDetails = async (code, name) => {
  const response = await axios.get(
    "http://localhost:5000/api/countries/details",
    {
      params: { code, name },
    },
  );

  return response.data;
};
