import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Images } from "@/types/images";

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const ImageFrame = ({ src }: { src: string }) => {
  return (
    <div className="w-[100%]">
      <AspectRatio ratio={16 / 9}>
        <img src={src} alt="" className="object-cover" />
      </AspectRatio>
    </div>
  );
};

const ImageCarousel = ({ images }: { images: Images[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <>
      <Carousel
        setApi={setApi}
        className="w-full max-w-[80%] mx-auto"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <ImageFrame src={image.image} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* only render when setCurrent is finshed */}
      {0 <= current - 1 && current - 1 <= images.length - 1 && (
        <Table className="w-full max-w-[80%] mx-auto">
          <TableCaption>
            Slide {current} of {count}
          </TableCaption>
          <TableBody>
            {Object.keys(images[current - 1].description).map((key) => (
              <TableRow key={key}>
                <TableCell>{capitalize(key)}</TableCell>
                <TableCell>
                  {
                    (images[current - 1].description as Record<string, string>)[
                      key
                    ]
                  }
                </TableCell>
                {/* Record<K, T> is TypeScript utility to represent an object type where keys are type K and values are type T */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
export default ImageCarousel;
