import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import 'assets/scss/style.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'utils/darkmode/theme'; 
import { GlobalStyles } from 'utils/darkmode/global';
import { useDarkMode } from 'utils/useDarkMode';

import Home from 'pages/Home';
import Live from 'pages/Live';
import RoomList from 'pages/RoomList';
import MultiRoom from 'pages/MultiRoom';
import About from 'pages/About';

function App(props) {
  const [theme, toggleTheme] = useDarkMode();
  props = {theme, toggleTheme}

  const TRACKING_ID = "UA-226891621-1";
  ReactGA.initialize(TRACKING_ID);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [window.location.pathname]);

  props = {
    theme,
    toggleTheme
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div className="App">
        <GlobalStyles />
        <Router>
          <Route path="/" component={() => <Home {...props} /> } exact />
          <Route path="/room/:name/:id/" component={() => <Live {...props} />} />
          <Route path="/list-room" component={() => <RoomList {...props} />} />
          <Route path="/multi-room" component={() => <MultiRoom {...props} />} />
          <Route path="/about" component={() => <About {...props} />} />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
