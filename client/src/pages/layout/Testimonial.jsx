import React from "react";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonialData = [
  {
    id: 1,
    name: "Victor",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Satya Narayan",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Sachin Tendulkar",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque reiciendis inventore iste ratione ex alias quis magni at optio",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonial = () => {
  return (
    <div data-aos="fade-up" data-aos-duration="300" className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 max-w-[600px] mx-auto">
          <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
            What our customers say
          </p>
          <h1 className="text-3xl font-bold mb-4">Testimonial</h1>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Perspiciatis delectus architecto error nesciunt,
          </p>
        </div>
        <div
          data-aos="zoom-in"
          data-aos-duration="300"
          className="max-w-[800px] mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonialData.map((data) => (
                <CarouselItem key={data.id} className="pl-4 md:basis-1/2">
                  <div className="flex flex-col gap-4 shadow-lg py-8 px-6 rounded-xl dark:bg-gray-800 bg-primary/10 relative h-full">
                    <div className="flex items-center gap-4">
                      <img
                        className="rounded-full w-16 h-16 object-cover border-2 border-primary/20"
                        src={data.img}
                        alt={data.name}
                      />
                      <div>
                        <h1 className="text-lg font-bold text-black/80 dark:text-light">
                          {data.name}
                        </h1>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {data.text}
                      </p>
                    </div>
                    <Quote className="absolute top-4 right-4 text-black/10 dark:text-white/10 w-12 h-12" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="static translate-y-0 hidden" />
              <CarouselNext className="static translate-y-0 hidden" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
