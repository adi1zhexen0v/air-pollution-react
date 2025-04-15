import { TiWeatherCloudy } from "react-icons/ti";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <TiWeatherCloudy />
          TazaAua
        </div>
      </nav>
    </header>
  );
}
