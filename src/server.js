const express = require('express');
const cors = require('cors');
const app = express();
const serverless = require('serverless-http')
const router = express.Router()

app.use(express.json());
const corsOptions = {
  origin: '*'
};
app.use(cors(corsOptions))

// Import the hexToRgb function from the converter module
const { hexToRgb,rgbToHex  } = require('./converter');
// API route for hex to RGB conversion
router.get('/hex-to-rgb/:hex', (req, res) => {
  const hex = req.params.hex;
  const rgb = hexToRgb(hex);
  console.log({ hex, rgb })
  
  res.json({ hex, rgb });
});

router.post('/hex-to-rgb', (req, res) => {
    const hex = req.body.hex;
    const rgb = hexToRgb(hex);
    console.log({ hex, rgb })
    res.json({ hex, rgb });
  });


  router.post('/rgb-to-hex', (req, res) => {
    const { red, green, blue } = req.body; // Receive RGB values as an object
    const hex = rgbToHex(red, green, blue); // Convert RGB to hex
    console.log({ red, green, blue, hex });
    res.json({ hex });
  });
  router.get('/' , (req,res) => {
    res.json({
      'hello':'hello'
    })
  })
  
// if (process.env.NODE_ENV === 'test') {
//     module.exports = app;
// } else {
//     app.listen(port, () => {
//         console.log(`Server: localhost:${port}`)
//     })
// }

app.use('/.netlify/functions/server',router)

module.exports.handler = serverless(app);