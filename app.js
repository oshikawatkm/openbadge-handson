const express = require("express");
const openBadge = require("openbadge");
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/simple.svg', (req, res) => {
  openBadge({text: ['Accident Free', '20 Days']}, (err, badgeSvg) => {
    res.set('Content-Type', 'image/svg+xml');
    res.send(badgeSvg)
  });
});


app.get('/font.svg', (req, res) => {
  openBadge({text: ['Favorite Font', 'Comic Sans'], font: {fontFace: 'fonts/comic-sans/comic-sans.ttf'}}, (err, badgeSvg) => {
    res.set('Content-Type', 'image/svg+xml');
    res.send(badgeSvg);
  })
})

app.get('/colors.svg', (req, res) => {
  openBadge({text: ['Pretty', 'Colors!'], color:{left:"#ccc",right:"#cc99ff",font:"#333",shadow:"#fff"}}, (req,res) => {
    res.set('Content-Type', 'image/svg+xml');
    res.send(badgeSvg);
  })
})

 
app.get('/defaults.svg', (req, res) => {
  var badgeConfig = {
      badge: 'baseBadge',                 // baseBadge is the only one we have for now.
      text: ['Hello', 'World'],           // Array with the copy on either side of the badge
      color: {
          left: '#555',                   // Background color on the left
          right: '#4c1',                  // Background color on the right
          font: '#fff',                   // Badge font color
          shadow: '#010101'               // Text shadow color. (Defaults to 0.3 opacity)
      },
      font: {
          fontFace: 'fonts/Open_Sans/OpenSans-Bold.ttf', // Path to the font to use.
          fontSize: 11                    // Font size in pixels
      },
      paddingX: 6,                       // Horizontal padding (in pixels) around text
      paddingY: 6                         // Vertical padding (in pixels) around text
  };


  app.get('/', (req, res) => {
    res.send(
        '<html>' +
        '<head>' +
        '<style>' +
        '   img {vertical-align: top} ' +
        '   * {line-height: 25px}' +
        '</style>' +
        '</head>' +
        '<body style="font-family: monospace">' +
        'Default Confg: <img src="defaults.svg"/><br>' +
        'A Basic Badge: <img src="simple.svg"/><br>' +
        'Changed Fonts: <img src="font.svg"/><br>' +
        'Changed Color: <img src="colors.svg"/><br>' +
        '</body>' +
        '</html>'
      )
  });

  openBadge(badgeConfig, (err, badgeSvg) => {
      /* TODO: Check for err */
      res.set('Content-Type', 'image/svg+xml');
      res.send(badgeSvg);
  });
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`))