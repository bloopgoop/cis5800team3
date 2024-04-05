import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";

import bs1 from "@/assets/bs1.png";
import bs2 from "@/assets/bs2.png";
import bs3 from "@/assets/bs3.png";

import { Images } from "@/types/images";

const shops: Images[] = [{
    image: bs1,
    description: {
        address: "1 Main St",
        phone: "123-456-7890",
    }
},
{
    image: bs2,
    description: {
        address: "2 Main St",
        phone: "123-456-7890",
    }
},
{
    image: bs3,
    description: {
        address: "3 Main St",
        phone: "123-456-7890",
    }
}]

export default function HomePage() {
return (
    <>
        <Navbar />

        <div className="grid grid-cols-[7fr_3fr]">
            <div className="m-6 p-6 bg-gray-100 rounded">
                <section>
                    <ImageCarousel images={shops} />
                </section>
            </div>

            <div className="col-span-1 sm:col-span-1">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Book Now
                </button>
            </div>
        </div>
    </>
);
}
