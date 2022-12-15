import sanityClient from "@sanity/client"

export const client = sanityClient({
  projectId: "l8fivkfp",
  dataset: "production",
  apiVersion: "2022-07-12",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})
