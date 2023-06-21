export default function calculateColor(text) {
  let hashCode = 0;
  for (let i = 0; i < text.length; i++) {
    hashCode = text.charCodeAt(i) + ((hashCode << 5) - hashCode);
  }

  let colorCode = (hashCode & 0x00ffffff).toString(16).toUpperCase();
  while (colorCode.length < 6) {
    colorCode = "0" + colorCode;
  }

  const red = parseInt(colorCode.substring(0, 2), 16);
  const green = parseInt(colorCode.substring(2, 4), 16);
  const blue = parseInt(colorCode.substring(4, 6), 16);
  const luminance = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;

  const textColor = luminance > 0.5 ? "#000000" : "#FFFFFF";

  return {
    background: "#" + colorCode,
    text: textColor,
  };
}
