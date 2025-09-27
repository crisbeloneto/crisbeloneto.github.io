import { Routes, Route } from 'react-router-dom';
import Projects from './pages/Projects';
import { ThemeProvider } from './context/ThemeContext';
import AboutMe from './pages/AboutMe';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/about" element={<AboutMe />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
