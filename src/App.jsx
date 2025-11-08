import { useState } from "react";
import axios from "axios";

function App() {
  const [displacement, setDisplacement] = useState("");
  const [predictedMPG, setPredictedMPG] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    if (!displacement) {
      setError("Please enter engine displacement (cc).");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("https://fuel-consumption-backend.onrender.com/predict", {
        displacement: parseFloat(displacement),
      });
      setPredictedMPG(response.data.predicted_mpg);
    } catch (err) {
      setError("Failed to get prediction. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        marginTop: "80px",
      }}
    >
      <h1>🚗 Fuel Consumption Predictor</h1>
      <p>Enter your car's engine displacement (cc) to predict mileage (MPG)</p>

      <input
        type="number"
        placeholder="e.g., 1600"
        value={displacement}
        onChange={(e) => setDisplacement(e.target.value)}
        style={{ padding: "8px", marginRight: "10px" }}
      />
      <button
        onClick={handlePredict}
        style={{
          padding: "8px 15px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Predict
      </button>

      {loading && <p>⏳ Predicting...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {predictedMPG !== null && (
        <div style={{ marginTop: "20px" }}>
          <h2>Predicted Mileage: {predictedMPG} MPG</h2>
          <p>
            (In km/l ≈ {(predictedMPG * 0.425144).toFixed(2)} km/l)
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
