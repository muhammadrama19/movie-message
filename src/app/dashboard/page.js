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
import { useRef, useState, useEffect, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Step and Value Data
const StepsCardData = [
  {
    icon: <Pencil />,
    header: "Step 1: Write Your Anonymous Message",
    content: "Got something to say? Type your thoughts, confessions, or emotions—completely anonymous!",
  },
  {
    icon: <Film />,
    header: "Step 2: Attach a Movie",
    content: "Pick a movie that perfectly matches your mood.",
  },
  {
    icon: <Send />,
    header: "Step 3: Send Anonymously",
    content: "Hit send and let your menfess find its way to the right audience. Sit back, watch reactions, and discover new stories!",
  },
];

const ValueCardData = [
  {
    icon: <Drama />,
    headline: "Let Movies Speak Your Heart!",
    explanationheadline: "Some emotions are hard to put into words. A movie can say it all.",
    content: "I attached ‘Eternal Sunshine of the Spotless Mind’ to my menfess… and they instantly understood.",
    smalltext: "Eternal Sunshine of the Spotless Mind, 2004",
  },
  {
    icon: <LockKeyhole />,
    headline: "Speak Freely, Stay Anonymous!",
    explanationheadline: "No usernames, no pressure—just you, your message, and a movie.",
    content: "I confessed through ‘500 Days of Summer’… like writing in a secret diary.",
    smalltext: "500 Days of Summer, 2009",
  },
  {
    icon: <Clapperboard />,
    headline: "Discover Stories Hidden in Cinema!",
    explanationheadline: "Every movie menfess carries a story waiting to be uncovered.",
    content: "I never truly understood ‘Call Me By Your Name’… until now.",
    smalltext: "Call Me By Your Name, 2017",
  },
];

export default function Dashboard() {
  const plugin = useRef(Autoplay({ delay: 2000 }));
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch messages with useCallback to prevent unnecessary re-fetching
  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch("/api/menfess_sample");
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className={`${geist.className} flex flex-col items-center justify-center w-full text-gray-900`}>
      
      {/* Hero Section */}
      <div className="text-center relative mb-8">
        <h1 className="text-3xl md:text-6xl font-bold mb-4">
          Every Movie has its Own Story, <br /> Tell it Anonymously{" "}
        </h1>
        <p className="text-lg md:text-xl text-gray-700/80 mb-6">
          Send anonymous messages with a movie scene that says it all.
        </p>
        <div className="flex justify-center mb-6 space-x-4">
          <a href="/menfess_browse" className="btn bg-black hover:bg-gray-500 text-white px-4 py-2 rounded-md flex items-center">
            Browse Menfess <Search size={24} className="ml-2" />
          </a>
          <a href="/send" className="btn bg-black hover:bg-gray-500 text-white px-4 py-2 rounded-md flex items-center">
            Send Menfess <Send size={24} className="ml-2" />
          </a>
        </div>
      </div>

      {/* How It Works */}
      <h2 className="text-2xl text-gray-700 font-bold mb-4">How It Works?</h2>
      <Carousel plugins={[plugin.current]} className="w-full max-w-4xl mx-auto mb-8 px-4">
        <CarouselContent className="flex gap-2">
          {StepsCardData.map((item, index) => (
            <CarouselItem key={index} className="flex justify-center md:basis-1/2">
              <StepsCard icon={item.icon} header={item.header} content={item.content} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Carousel Navigation Buttons */}
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out">
          <span>&lt;</span>
        </CarouselPrevious>
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white rounded-full p-2 shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out">
          <span>&gt;</span>
        </CarouselNext>
      </Carousel>

      {/* Why Share a Movie Menfess? */}
      <div className="py-5 px-5 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
        <h2 className="text-2xl text-gray-700 font-bold mb-4 text-center">Why Share a Movie Menfess?</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {ValueCardData.map((item, index) => (
            <ValueCard key={index} icon={item.icon} headline={item.headline} explanation={item.explanationheadline} content={item.content} smalltext={item.smalltext} />
          ))}
        </div>
      </div>

      {/* See What People Are Confessing */}
      <h2 className="text-2xl text-gray-700 font-bold mt-8 mb-4 text-center">See What People Are Confessing...</h2>
      <Carousel plugins={[plugin.current]} className="w-full max-w-4xl mx-auto mb-8 px-4">
        <CarouselContent className="flex gap-2">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="flex justify-center md:basis-1/2">
                  <Skeleton className="w-64 h-96 rounded-md" />
                </CarouselItem>
              ))
            : messages.map((message, index) => (
                <CarouselItem key={index} className="flex justify-center md:basis-1/2">
                  <CustomCard
                    poster={message.movie_poster_url}
                    title={message.movie_title}
                    year={message.movie_release_year}
                    message={message.message}
                    receiver={message.receiver}
                  />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>

      {/* Final CTA */}
      <div className="bg-gray-400 w-full max-w-4xl mx-auto rounded-lg shadow-lg p-6 mt-8 flex flex-col items-center text-center">
        <h2 className="text-2xl text-gray-700 font-bold mb-4">Ready to Share Your Movie Menfess?</h2>
        <p className="text-lg text-gray-700 mb-4">Join the fun and let your favorite movies do the talking!</p>
        <Button asChild className="bg-gray-500 hover:bg-gray-700">
          <a href="/send">
            Send Your Menfess Now <Send size={24} />
          </a>
        </Button>
      </div>
    </div>
  );
}
