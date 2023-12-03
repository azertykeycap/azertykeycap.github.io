import { blurhashToCssGradientString } from "@unpic/placeholder";
import { Image } from "@unpic/react/nextjs";

export function MyImage({ src, alt, blurhash }) {
  const placeholder = blurhashToCssGradientString(blurhash);
  return <Image src={src} alt={alt} background={placeholder} />;
}
