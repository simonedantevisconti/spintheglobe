const path = require("path");
const countriesData = require(
  path.join(__dirname, "../../src/data/countries.json"),
);

const getFallbackTitle = (code, name) => {
  if (name) return name;
  if (code) return code.toUpperCase();
  return "Nazione selezionata";
};

const fetchCountryDetails = async (code, name) => {
  const normalizedCode = String(code || "")
    .trim()
    .toLowerCase();

  const localCountry = countriesData[normalizedCode];

  if (!localCountry) {
    return {
      title: getFallbackTitle(code, name),
      description: "Descrizione non disponibile per questa nazione.",
      image: "",
      images: [],
    };
  }

  return {
    title: localCountry.name || getFallbackTitle(code, name),
    description: localCountry.description || "Descrizione non disponibile.",
    image: localCountry.images?.[0] || "",
    images: Array.isArray(localCountry.images) ? localCountry.images : [],
  };
};

module.exports = { fetchCountryDetails };
