import OtpForm from "./OtpForm";

export default async function OtpPage({
  searchParams,
}: {
  searchParams: Promise<{ method?: string; contact?: string }>;
}) {
  const { method, contact } = await searchParams;

  return <OtpForm method={method} contact={contact} />;
}