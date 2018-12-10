export default function getStyle(item) {
  if (!item.description || !item.description.trim()) {
    return "none";
  }
  if (item.descriptionStyle === "right" && window.innerWidth < 1024) {
    return "bottom";
  }
  return item.descriptionStyle || "mini";
}
