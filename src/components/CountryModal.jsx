import React from "react";

const CountryModal = ({ show, onHide, country }) => {
  if (!show) return null;

  return (
    <div className="country-modal-overlay" onClick={onHide}>
      <div className="country-modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="country-modal-close" onClick={onHide}>
          ×
        </button>

        <div className="row g-4 align-items-start">
          <div className="col-12 col-md-7">
            <h2 className="country-modal-title">
              {country?.title || "Nazione selezionata"}
            </h2>

            <p className="country-modal-text">
              {country?.description || "Descrizione non disponibile."}
            </p>
          </div>

          <div className="col-12 col-md-5">
            <div className="country-image-box">
              {country?.image ? (
                <img
                  src={country.image}
                  alt={country.title || "Nazione"}
                  className="country-image"
                />
              ) : (
                <div className="country-image-placeholder">
                  Nessuna immagine disponibile
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryModal;
