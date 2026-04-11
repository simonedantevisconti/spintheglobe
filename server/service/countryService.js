const axios = require("axios");

const fetchCountryDetails = async (name) => {
  const response = await axios.get(
    `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`,
  );

  const country = Array.isArray(response.data)
    ? response.data[0]
    : response.data;

  return {
    title: country?.name?.common || name || "Nazione selezionata",
    description: `Capitale: ${country?.capital?.[0] || "N/D"}. Regione: ${
      country?.region || "N/D"
    }. Popolazione: ${
      country?.population?.toLocaleString?.("it-IT") || "N/D"
    }.`,
    image: country?.flags?.png || "",
  };
};

module.exports = { fetchCountryDetails };
