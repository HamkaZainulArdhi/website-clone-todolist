import { Metadata } from "next";

import Container from "@/common/components/elements/Container";
import Home from "@/modules/home";
import { METADATA } from "@/common/constants/metadata";

export const metadata: Metadata = {
  title: `${METADATA.creator} | Personal Website`,
  description:
    "Website portofolio Hamka Zainul Ardhi, front-end developer yang fokus pada pengembangan UI modern dan UX yang solid.",
  alternates: {
    canonical: `${process.env.DOMAIN}`,
  },
  openGraph: {
    title: "Hamka Zainul Ardhi | Personal Website",
    description: "Portofolio developer, showcase project, dan skillset Hamka.",
    url: `${process.env.DOMAIN}`,
    siteName: "Hamka Zainul Ardhi",
    images: [
      {
        url: `${process.env.DOMAIN}/hamka.jpg`,
        width: 1200,
        height: 630,
        alt: "Hamka Zainul Ardhi - Personal Site Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamka Zainul Ardhi | Portofolio Developer",
    description: "Yuk kenal lebih dekat dengan Hamka dan proyeknya!",
    images: [`${process.env.DOMAIN}/hamka.jpg`],
  },
};

const HomePage = () => {
  return (
    <Container data-aos="fade-up">
      <Home />
    </Container>
  );
};

export default HomePage;
