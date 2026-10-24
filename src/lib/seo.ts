import type { Metadata } from "next";

const BRAND_NAME = "Smart Move";
const OG_IMAGE = "/assets/logo/englishOgImage.jpg";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  includeBrand?: boolean;
};

export function buildAlternates(
  path: string,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: path,
    languages: { en: path },
  };
}

export function buildOpenGraph({
  title,
  description,
  path,
}: Omit<MetadataInput, "includeBrand">): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: BRAND_NAME,
    title,
    description,
    url: path,
    locale: "en_US",
    images: [OG_IMAGE],
  };
}

export function buildMetadata({
  title,
  description,
  path,
  includeBrand = true,
}: MetadataInput): Metadata {
  const fullTitle = includeBrand ? `${title} | ${BRAND_NAME}` : title;

  return {
    title: fullTitle,
    description,
    alternates: buildAlternates(path),
    openGraph: buildOpenGraph({ title: fullTitle, description, path }),
  };
}
