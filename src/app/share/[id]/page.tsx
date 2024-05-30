import SharePage from "./SharePage";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;
  const chat = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat-completion/get-detail-chat/${id}`
  ).then((res) => res.json());

  return {
    title: chat?.data?.title || "This is a fantastic chat",
    openGraph: {
      title: chat?.data?.title || "This is a fantastic chat",
      description: "Explore the world of AI with our AI assistant.",
      url: process.env.NEXT_PUBLIC_URL,
      siteName: "AI Assistant",
      images: [
        {
          url: "https://assets-global.website-files.com/645523c36dce1ac1ed9106e2/64dde1726d446b169fb8d05d_GPT-3%20Personal%20Assistant.png", // Must be an absolute URL
        },
      ],
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_URL,
    },
  };
}

async function getData(id: string) {
  const chat = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/chat-completion/get-detail-chat/${id}`
  ).then((res) => res.json());

  return chat?.data;
}

export default async function Share({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return <SharePage chat={data} />;
}
