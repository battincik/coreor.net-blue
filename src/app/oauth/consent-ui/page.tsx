import OAuthConsentClient from "./ui-client"

type ConsentPageProps = {
  searchParams: Promise<{ state?: string }>
}

export default async function OAuthConsentPage({ searchParams }: ConsentPageProps) {
  const params = await searchParams
  return <OAuthConsentClient state={params.state || ""} />
}
