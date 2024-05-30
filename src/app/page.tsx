import HomePage from "./home/HomePage";

export default function Home({
  searchParams,
}: {
  searchParams: { token?: string; refresh_token?: string; id?: string };
}) {
  return (
    <HomePage
      token={searchParams?.token}
      refreshToken={searchParams?.refresh_token}
      id={searchParams?.id}
    />
  );
}
