import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [displacement, setDisplacement] = useState("");
  const [predictedMPG, setPredictedMPG] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    if (!displacement) {
      setError("⚠️ Please enter engine displacement (cc).");
      return;
    }

    setError(null);
    setLoading(true);

    try {
<<<<<<< HEAD
      const response = await axios.post("https://fuel-consumption-backend.onrender.com/predict", {
=======
      const response = await axios.post("https://fuel-consumption-backend.onrender.com", {
>>>>>>> 8565906ffc23b7fbed99faf4b89d41ba249a75e4
        displacement: parseFloat(displacement),
      });
      setPredictedMPG(response.data.predicted_mpg);
    } catch (err) {
      setError("❌ Failed to get prediction. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">🚗 Fuel Consumption Predictor</h1>
        <p className="subtitle">
          Predict your car’s mileage (MPG & km/l) based on engine displacement.
        </p>

        <div className="input-section">
          <input
            type="number"
            placeholder="Enter displacement (cc)"
            value={displacement}
            onChange={(e) => setDisplacement(e.target.value)}
            className="input-box"
          />
          <button onClick={handlePredict} className="predict-btn">
            {loading ? "⏳ Predicting..." : "Predict Mileage"}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {predictedMPG !== null && (
          <div className="result">
            <h2>Predicted Mileage:</h2>
            <p>
              <strong>{predictedMPG.toFixed(2)}</strong> MPG
            </p>
            <p>
              ≈ <strong>{(predictedMPG * 0.425144).toFixed(2)}</strong> km/l
            </p>
          </div>
        )}

        <footer className="footer">
          Built with ❤️ by <span>Shreyash</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
