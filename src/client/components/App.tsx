import React, { useEffect } from 'react';

import { setupCanvas } from '../logic/logic';

function App() {
  useEffect(() => {
    setupCanvas();
  }, []);

  return <canvas id='canvas'></canvas>;
}

export default App;
