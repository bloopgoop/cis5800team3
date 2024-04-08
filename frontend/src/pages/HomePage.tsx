import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconPhoneCall, IconBrandInstagram } from "@tabler/icons-react";

import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";

import craig from "@/assets/craig-mckay-jmURdhtm7Ng-unsplash.jpg";
import junior from "@/assets/junior-moran-SYlzcTAwTWE-unsplash.jpg";
import vicky from "@/assets/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg";
import bs1 from "@/assets/bs1.png";
import bs2 from "@/assets/bs2.png";
import bs3 from "@/assets/bs3.png";
import { Images } from "@/types/images";
import { Link } from "react-router-dom";

const shops: Images[] = [
  {
    image: bs1,
    description: {
      address: "1 Main St",
      phone: "123-456-7890",
    },
  },
  {
    image: bs2,
    description: {
      address: "2 Main St",
      phone: "123-456-7890",
    },
  },
  {
    image: bs3,
    description: {
      address: "3 Main St",
      phone: "123-456-7890",
    },
  },
];

const popularServices = [
  {
    name: "Men's Haircut",
    price: 2000,
    time: "15min",
  },
  {
    name: "Haircut and Beard",
    price: 1000,
    time: "30min",
  },
  {
    name: "Kids Haircut",
    price: 500,
    time: "15min",
  },
];

const staffers = [
  {
    name: "Craig",
    image: craig,
  },
  {
    name: "Junior",
    image: junior,
  },
  {
    name: "Vicky",
    image: vicky,
  },
];
const StaffAvatar = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="flex flex-col">
      <Avatar className="h-14 w-14">
        <AvatarImage src={image} className="object-cover"/>
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <p className="text-center text-sm font-semibold">{name}</p>
    </div>
  );
};

const schedule = [
  { day: "Sunday", hours: "9:00am - 3:00pm" },
  { day: "Monday", hours: "9:00am - 6:30pm" },
  { day: "Tuesday", hours: "9:00am - 6:30pm" },
  { day: "Wednesday", hours: "9:00am - 6:30pm" },
  { day: "Thursday", hours: "9:00am - 6:30pm" },
  { day: "Friday", hours: "9:00am - 6:30pm" },
  { day: "Saturday", hours: "9:00am - 6:30pm" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      <div className="grid grid-cols-[6fr_4fr]">
        <div className="ml-12 mr-6 my-8">
          <section id="location_slideshow" className="p-6 bg-secondary rounded">
            <ImageCarousel images={shops} />
          </section>
          <section id="services" className="mt-4">
            <h1 className="text-2xl font-bold border-b">Services</h1>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Popular Services</AccordionTrigger>
                <AccordionContent>
                  {popularServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between font-medium py-4 border-t"
                    >
                      <p>{service.name}</p>

                      <div className="flex gap-2">
                        <div className="text-right">
                          <p>${(service.price / 100).toFixed(2)}</p>
                          <p className="text-muted-foreground">
                            {service.time}
                          </p>
                        </div>
                        <Button>Book</Button>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        <div className="col-span-1 sm:col-span-1">
          <section className="ml-6 mr-12 my-8 bg-secondary h-full p-6 flex flex-col rounded">
            <h1 className="text-xs font-bold py-2">ABOUT US</h1>
            <p className="text-sm pb-4">
              "We offer a wide variety of top-notch services. Just give us a
              call or stop by and we'll take care of you."
            </p>
            <h1 className="text-xs font-bold py-2">STAFFERS</h1>
            <p className="flex flex-row gap-8 pb-4">
              {staffers.map((staff, index) => (
                <StaffAvatar
                  key={index}
                  name={staff.name}
                  image={staff.image}
                />
              ))}
            </p>
            <h1 className="text-xs font-bold py-2 border-b">
              CONTACT & BUSINESS HOURS
            </h1>
            <p className="text-sm py-4 border-b flex text-muted-foreground items-center">
              <IconPhoneCall size={20} />
              <span className="pl-2">(718) 682-1780</span>
              <Button className="ml-auto">Call</Button>
            </p>
            <div className="text-sm py-4">
              <div className="grid grid-cols-2 gap-1">
                {schedule.map((day) => (
                  <>
                    <p>{day.day}</p>
                    <p className="ml-auto">{day.hours}</p>
                  </>
                ))}
              </div>
            </div>
            <h1 className="text-xs font-bold py-2">SOCIAL MEDIA</h1>
            <div className="flex flex-row items-center justify-center gap-2">
              <div className="flex flex-col items-center text-muted-foreground">
                <Link to="https://www.instagram.com/">
                  <IconBrandInstagram size={40} />
                </Link>
                <p>Instagram</p>
              </div>
            </div>
            <footer className="pt-3 border-t mt-auto text-sm font-semibold flex justify-between">
              <Link to="/admin" className="flex flex-row justify-between w-full items-center">
                <p>Report</p>
                <p className="text-xl">&gt;</p>
              </Link>
            </footer>
          </section>
        </div>
      </div>
    </>
  );
}
