import { permanentRedirect } from "next/navigation";

type PreviewProjectRedirectPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export default async function PreviewProjectRedirectPage({
  params,
}: PreviewProjectRedirectPageProps) {
  const { slug } = await params;

  permanentRedirect(`/projects/${encodeURIComponent(slug)}`);
}
