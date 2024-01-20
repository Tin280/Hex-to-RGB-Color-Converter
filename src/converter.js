function hexToRgb(hex) {
  // Remove the "#" prefix if present
  hex = hex.replace(/^#/, '');

  // Validate the input hex color code
  if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)) {
    return null; // Invalid input
  }

  // Expand short hex format (e.g., "F53" to "FF5533")
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }

  // Parse the hex values and convert to decimal
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

function rgbToHex(r, g, b) {
  // Ensure the values are within the valid RGB range (0-255)
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  // Convert the decimal values to hexadecimal
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  // Combine the hexadecimal values
  return `#${rHex}${gHex}${bHex}`;
}

module.exports = {
  hexToRgb,
  rgbToHex
};
