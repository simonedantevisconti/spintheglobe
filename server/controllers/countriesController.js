const { fetchCountryDetails } = require("../service/countryService");

const getCountryDetails = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        message: "Nome nazione mancante",
      });
    }

    const country = await fetchCountryDetails(name);
    return res.json(country);
  } catch (error) {
    console.error("Errore controller country:", error.message);

    return res.status(500).json({
      message: "Errore nel recupero dettagli della nazione",
    });
  }
};

module.exports = { getCountryDetails };
