# Shelly RGBW Smooth Color Loop

A simple Shelly Script for RGBW lights that creates a smooth, slow, continuous color transition using HSB-to-RGB conversion.

The script cycles through the full hue range and sends RGB updates to a Shelly RGBW device every 500 ms, producing a gentle rainbow fade effect.

## Script File

Use this file on your Shelly device:

- [`shelly-rgbw-color-loop.js`](shelly-rgbw-color-loop.js)

## Features

- Smooth HSB-to-RGB color transitions
- Slow continuous hue loop
- Full saturation and brightness by default
- RGBW output with white channel set to `0`
- Compatible with the Shelly Script API using EJS-style JavaScript
- Easy to adjust speed, brightness, saturation, and hue step size

## Requirements

- A Shelly device that supports RGBW control
- Shelly Script support enabled on the device
- An RGBW light connected and configured
- Access to the Shelly web interface or Shelly app

## Script Overview

The script uses:

- `hsbToRgb(h, s, v)` to convert hue, saturation, and brightness into RGB values
- `Timer.set(500, true, function () { ... })` to update the color every half second
- `Shelly.call("RGBW.Set", { ... })` to apply the new color to the RGBW output

By default, the hue increases by `0.5` degrees every `500` ms. A full 360-degree cycle takes about 6 minutes.

## Installation

1. Open your Shelly device web interface.
2. Go to the Scripts section.
3. Create a new script.
4. Copy the contents of [`shelly-rgbw-color-loop.js`](shelly-rgbw-color-loop.js) into the script editor.
5. Save and enable the script.
6. Start the script.

Once running, the light should begin cycling smoothly through the color spectrum.

## Configuration

You can adjust the behavior by changing these values in the script:

### Transition Speed

```js
Timer.set(500, true, function () {
```

Lower values update the light more often. Higher values slow the update rate.

Example:

```js
Timer.set(1000, true, function () {
```

This updates the color once per second.

### Smoothness

```js
hue = (hue + 0.5) % 360;
```

Smaller hue steps create smoother, slower transitions. Larger steps create faster, more noticeable color changes.

Examples:

```js
hue = (hue + 0.25) % 360;
```

Very slow and smooth.

```js
hue = (hue + 2) % 360;
```

Faster color cycling.

### Brightness

```js
let rgb = hsbToRgb(hue, 100, 100);
```

The third value controls brightness.

Example:

```js
let rgb = hsbToRgb(hue, 100, 50);
```

This runs the loop at 50 percent brightness.

### Saturation

```js
let rgb = hsbToRgb(hue, 100, 100);
```

The second value controls saturation.

Example:

```js
let rgb = hsbToRgb(hue, 60, 100);
```

This creates softer, less intense colors.

## Safety Notes

- Test at a lower brightness first, especially with high-power LED strips.
- Make sure your power supply is correctly rated for the LED strip length and load.
- Stop the script if the controller, wiring, or LEDs become unusually warm.

## Notes

- The script targets RGBW output `id: 0`.
- The white channel is disabled with `white: 0`.
- If your device uses a different output ID, update the `id` value in the `Shelly.call("RGBW.Set", ...)` block.
- This script is intended for RGB color cycling, not white temperature control.

## Troubleshooting

If the light does not change color:

- Confirm the device supports `RGBW.Set`.
- Confirm the RGBW output is configured correctly.
- Check that the script is enabled and running.
- Review the Shelly script logs for errors.
- Make sure the light is connected to output `id: 0`, or update the script with the correct output ID.

## License

MIT License
