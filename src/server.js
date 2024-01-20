const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
const corsOptions = {
  origin: 'http://127.0.0.1:5500'
};
app.use(cors(corsOptions))

// Import the hexToRgb function from the converter module
const { hexToRgb,rgbToHex  } = require('./converter');
// API route for hex to RGB conversion
app.get('/hex-to-rgb/:hex', (req, res) => {
  const hex = req.params.hex;
  const rgb = hexToRgb(hex);
  console.log({ hex, rgb })
  
  res.json({ hex, rgb });
});

app.post('/hex-to-rgb', (req, res) => {
    const hex = req.body.hex;
    const rgb = hexToRgb(hex);
    console.log({ hex, rgb })
    res.json({ hex, rgb });
  });


  app.post('/rgb-to-hex', (req, res) => {
    const { red, green, blue } = req.body; // Receive RGB values as an object
    const hex = rgbToHex(red, green, blue); // Convert RGB to hex
    console.log({ red, green, blue, hex });
    res.json({ hex });
  });
  
if (process.env.NODE_ENV === 'test') {
    module.exports = app;
} else {
    app.listen(port, () => {
        console.log(`Server: localhost:${port}`)
    })
}
