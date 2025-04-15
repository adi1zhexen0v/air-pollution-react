import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./components/Map";
import DateSelector from "./components/DateSelector";
import AirQualityIndex from "./components/AirQualityIndex";
import Header from "./components/Header";
import Loader from "./components/Loader";

const App = () => {
  const [rawData, setRawData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [mapData, setMapData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://air-pollution-server.onrender.com/api/predictions"
        );
        const grouped = {};

        res.data.forEach((point) => {
          if (!grouped[point.date]) grouped[point.date] = [];
          grouped[point.date].push(point);
        });

        const daily = Object.entries(grouped)
          .map(([date, items]) => ({
            date,
            avg: items.reduce((sum, p) => sum + p["PM2.5"], 0) / items.length,
            items
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setDailyData(daily);
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
        const foundTomorrow = daily.find((d) => d.date === tomorrow);
        const defaultDate = foundTomorrow?.date || daily[0]?.date;
        setSelectedDate(defaultDate);
        setMapData(daily.find((d) => d.date === defaultDate)?.items || []);
        setRawData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedDate || !dailyData.length) return;
    const found = dailyData.find((d) => d.date === selectedDate);
    setMapData(found ? found.items : []);
  }, [selectedDate, dailyData]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="page-title">7-Day Air Quality Forecast</h1>
        <DateSelector
          dailyData={dailyData}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Map key={selectedDate} data={mapData} selectedDate={selectedDate} />
        <AirQualityIndex />
      </div>
    </>
  );
};

export default App;
