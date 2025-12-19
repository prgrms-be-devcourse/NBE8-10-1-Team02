const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function toImageSrc(imageUrl?: string | null) {
  if (!imageUrl) return "/placeholder.gif";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
  return `${NEXT_PUBLIC_API_BASE_URL}${imageUrl}`;
}