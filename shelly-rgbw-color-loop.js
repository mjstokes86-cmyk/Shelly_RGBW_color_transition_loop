// Smooth and slow HSB-to-RGB color transition loop for Shelly RGBW
// Compatible with Shelly Script API (EJS)

// HSB (Hue, Saturation, Brightness) to RGB conversion
function hsbToRgb(h, s, v) {
  h = h % 360;
  s = s / 100;
  v = v / 100;

  let c = v * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = v - c;

  let r1 = 0, g1 = 0, b1 = 0;

  if (h < 60)      { r1 = c; g1 = x; b1 = 0; }
  else if (h < 120){ r1 = x; g1 = c; b1 = 0; }
  else if (h < 180){ r1 = 0; g1 = c; b1 = x; }
  else if (h < 240){ r1 = 0; g1 = x; b1 = c; }
  else if (h < 300){ r1 = x; g1 = 0; b1 = c; }
  else             { r1 = c; g1 = 0; b1 = x; }

  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255)
  ];
}

// Start hue at 0°
let hue = 0;
print("Starting smooth and slow RGB loop...");

// Run every 500 ms, slower transitions
Timer.set(500, true, function () {
  let rgb = hsbToRgb(hue, 100, 100);
  print("Setting RGB color:", rgb);

  Shelly.call("RGBW.Set", {
    id: 0,
    on: true,
    brightness: 100,
    white: 0,
    rgb: rgb
  }, function (res, err) {
    if (err) {
      print("Error setting color:", JSON.stringify(err));
    }
  });

  // Smaller hue step = smoother color shift
  hue = (hue + 0.5) % 360;
});

