import axios from "axios";

export const getCountryDetails = async (name) => {
  const response = await axios.get(
    "http://localhost:5000/api/countries/details",
    {
      params: { name },
    },
  );

  return response.data;
};
