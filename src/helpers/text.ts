export function setVariant(variant: string) {
  let fontWeight = 400;
  switch (variant) {
    case 'light':
      fontWeight = 300;
      break;
    case 'regular':
      fontWeight = 400;
      break;
    case 'medium':
      fontWeight = 500;
      break;
    case 'semi-bold':
      fontWeight = 600;
      break;
    case 'bold':
      fontWeight = 700;
      break;
    case 'extra-bold':
      fontWeight = 800;
      break;
    default:
      fontWeight = 400;
      break;
  }

  return fontWeight;
}
