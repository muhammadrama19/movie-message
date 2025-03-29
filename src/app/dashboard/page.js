"use client";
import { Geist } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Send,
  Pencil,
  Film,
  Drama,
  LockKeyhole,
  Clapperboard,
  Search,
} from "lucide-react";
import CustomCard from "@/components/custom/custom-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import StepsCard from "@/components/custom/steps-card";
import ValueCard from "@/components/custom/value-card";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, useEffect } from "react";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify font weights you want to use
});

//dummy date movie and message for testing component
const movie = {
  poster: "https://image.tmdb.org/t/p/w500/xWWg47tTfparvjK0WJNX4xL8lW2.jpg",
  receiver: "Prince Charming",
  message: "I wish I could be with you, but I can't. I'm sorry.",
};

const StepsCardData = [
  {
    icon: <Pencil />,
    header: "Step 1: Write Your Anonymous Message",
    content:
      "Got something to say? Type your thoughts, confessions, or emotions—completely anonymous!",
  },
  {
    icon: <Film />,
    header: "Step 2: Attach a Movie",
    content: "Pick a movie that perfectly matches your mood.",
  },
  {
    icon: <Send />,
    header: "Step 3: Send Anonymously",
    content:
      "Hit send and let your menfess find its way to the right audience. Sit back, watch reactions, and discover new stories!",
  },
];

const ValueCardData = [
  {
    icon: <Drama />,
    headline: "Let Movies Speak Your Heart!",
    explanationheadline:
      "Some emotions are hard to put into words. A movie can say it all.",
    content:
      "I attached ‘Eternal Sunshine of the Spotless Mind’ to my menfess… and they instantly understood.",
    smalltext: "Eternal Sunshine of the Spotless Mind, 2004",
  },
  {
    icon: <LockKeyhole />,
    headline: "Speak Freely, Stay Anonymous!",
    explanationheadline:
      "No usernames, no pressure—just you, your message, and a movie.",
    content:
      "I confessed through ‘500 Days of Summer’… like writing in a secret diary.",
    smalltext: "500 Days of Summer, 2009",
  },
  {
    icon: <Clapperboard />,
    headline: "Discover Stories Hidden in Cinema!",
    explanationheadline:
      "Every movie menfess carries a story waiting to be uncovered.",
    content: "I never truly understood ‘Call Me By Your Name’… until now.",
    smalltext: "Call Me By Your Name, 2017",
  },
];

export default function Dashboard() {
  const plugin = useRef(Autoplay({ delay: 2000 }));
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/movie_message"); // Fetch from your API
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setMessages(data); 
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMessages();
  }, []);

  return (
    <div
      className={`${geist.className} flex flex-col items-center justify-center h-screen w-full text-gray-900`}
    >
      <div className="text-center relative mb-8">
        <h1 className="text-3xl md:text-6xl font-bold mb-4">
          Every Movie has its Own Story, <br /> Tell it Anonymously{" "}
        </h1>

        <p className="text-lg md:text-xl text-gray-700/80 mb-6">
          Send anonymous messages with a movie scene that says it all.
        </p>
        <div className="flex justify-center mb-6 md:w-1/2 mx-auto lg:w-1/3 space-x-4">
          <Button href="/browse">
            Browse Menfess
            <Search size={24} />
          </Button>
          <Button href="/send">
            Send Menfess
            <Send size={24} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-8">
        <h2 className="text-2xl md:text-2xl text-gray-700 font-bold">
          {" "}
          How It Works?{" "}
        </h2>
      </div>

      <Carousel
        opts={{
          loop: false,
          speed: 500,
          slidesToScroll: 2,
          autoplay: true,
        }}
        className="w-full max-w-4xl mx-auto mb-8 relative px-4"
        plugins={[plugin.current]}
        loop={true}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="flex gap-2">
          {StepsCardData.map((item, index) => (
            <CarouselItem
              key={index}
              className=" pl-1 flex justify-center md:basis-1/2 sm:basis-1/3"
            >
              <StepsCard
                icon={item.icon}
                header={item.header}
                content={item.content}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition duration-200 ease-in-out">
          <span className="text-gray-700">&lt;</span>
        </CarouselPrevious>

        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 p-3 rounded-full hover:bg-gray-400 transition duration-200 ease-in-out">
          <span className="text-gray-700">&gt;</span>
        </CarouselNext>
      </Carousel>

      <div className="py-5 px-5 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <h2 className="text-2xl md:tex-xl text-gray-700 font-bold">
            {" "}
            Why Share a Movie Menfess?{" "}
          </h2>
        </div>
        <div className="container mx-auto mx-8 flex flex-col md:flex-row sm:flex-row xs:flex-row items-center justify-center gap-4">
          {ValueCardData.map((item, index) => (
            <ValueCard
              key={index}
              icon={item.icon}
              headline={item.headline}
              explanation={item.explanationheadline}
              content={item.content}
              smalltext={item.smalltext}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl md:text-xl text-gray-700 font-bold mt-8 mb-4 justify-center flex flex-col items-center">
          {" "}
          See What People Are Confessing...{" "}
        </h2>
      </div>
      <Carousel
        opts={{
          loop: true,
          autoplay: true,
          stopOnMouseEnter: true,
          playOnInit: true,
          stopOnInteraction: false,
            speed: 1000,
            slidesToScroll: 1,

        }}
        className="w-full max-w-4xl mx-auto mb-8 relative px-4"
        plugins={[plugin.current]}
        loop={true}
      >
        <CarouselContent className="flex gap-2">
          {loading ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : (
            messages.map((message, index) => (
              <CarouselItem
                key={index}
                className="pl-1 flex justify-center md:basis-1/2 sm:basis-1/3"
              >
                <CustomCard
                poster={message.movie_poster_url}
                title={message.movie_title}
                year={message.movie_release_year}
                message={message.message}
                receiver={message.receiver}
                />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>

      {/* CTA Final Action*/}
      <div className="bg-gray-400 w-full max-w-4xl mx-auto rounded-lg shadow-lg p-6 mt-8 flex flex-col items-center justify-center mb-8">
        <h2 className="text-2xl md:text-xl text-gray-700 font-bold mb-4">
          Ready to Share Your Movie Menfess?
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          Join the fun and let your favorite movies do the talking!
        </p>
        <Button href="/send" className="bg-gray-500 hover:bg-blue-700">
          Send Your Menfess Now
          <Send size={24} />
        </Button>

      </div>


    </div>
  );
}
