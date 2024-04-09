import { useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect, useState, Dispatch } from "react";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/context/auth-context";
import { useContext } from "react";

type TimeSlots = "morning" | "afternoon" | "evening";

const dummyTimeSlots = {
  morning: ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM"],
  afternoon: ["1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"],
  evening: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"],
};

const TimeSlotCarousel = ({
  value,
  timeSlots,
  selectedTime,
  selectedTimeOfDay,
  setSelectedTime,
  setSelectedTimeOfDay,
}: {
  value: string;
  timeSlots: string[];
  selectedTime: number;
  selectedTimeOfDay: string;
  setSelectedTime: Dispatch<React.SetStateAction<number>>;
  setSelectedTimeOfDay: Dispatch<React.SetStateAction<TimeSlots>>;
}) => {
  return (
    <Carousel className="w-full max-w-[80%] mx-auto">
      <CarouselContent className="-ml-1">
        {timeSlots.map((time, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-1/7"
            onClick={() => {
              setSelectedTime(index);
              setSelectedTimeOfDay(value as TimeSlots);
            }}
          >
            <div className="p-1">
              <Card>
                <CardContent
                  className={`flex items-center justify-center rounded py-2 hover:cursor-pointer ${
                    selectedTime === index && selectedTimeOfDay === value
                      ? "bg-[#2596be] text-background"
                      : "hover:bg-secondary"
                  }`}
                >
                  <div className="flex flex-col items-center p-1">
                    <p
                      className={`text-xs font-semibold w-16 text-center ${
                        selectedTime === index && selectedTimeOfDay === value
                          ? "text-background"
                          : "text-muted-foreground"
                      }`}
                    >
                      {time}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

function getNextFourteenDays() {
  const dateArray = [];
  for (let i = 0; i <= 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dateArray.push(date);
  }
  return dateArray;
}

const BookAppointmentPage = () => {
  const location = useLocation();
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const dates = getNextFourteenDays();
  const [api, setApi] = useState<CarouselApi>();
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTimeOfDay, setSelectedTimeOfDay] =
    useState<TimeSlots>("morning");
  const [selectedTime, setSelectedTime] = useState<number>(0);

  console.log(location.state);

  const makeAppointment = async () => {
    if (!authTokens) {
      console.error("User is not authenticated");
      navigate("/login", { state: { message: "Please log in first" } });
      return;
    }

    const resp = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/appointment/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify({
          service: location.state.name,
          staff: null,
          time: dates[selectedDay].toISOString(),
          price: location.state.price, //cents
        }),
      }
    );
    if (resp.ok) {
      console.log("Appointment made successfully");
      navigate("/success");
    } else {
      console.error("Failed to make an appointment");
      navigate("/error", {
        state: {
          statusCode: resp.status,
          hint: resp.statusText || "Failed to make an appointment",
        },
      });
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    console.log(dates[selectedDay]);
    console.log(selectedTimeOfDay);
    console.log(dummyTimeSlots[selectedTimeOfDay][selectedTime]);
  }, [api, selectedDay, selectedTimeOfDay, selectedTime, dates]);

  if (!location.state) {
    return (
      <Navigate
        to="/error"
        state={{
          statusCode: 400,
          hint: "Book an appointment by clicking the `Book` button!",
        }}
      />
    );
  }
  return (
    <>
      <Navbar />
      <div className="my-8 mx-auto max-w-screen-lg border">
        <div className="p-10 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2">
            {dates[0].toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h1>
          <Carousel setApi={setApi} className="w-full max-w-[80%] mx-auto">
            <CarouselContent className="-ml-1">
              {dates.map((date, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-1/7"
                  onClick={() => setSelectedDay(index)}
                >
                  <div className="p-1">
                    <Card>
                      <CardContent
                        className={`flex items-center justify-center py-14 px-6 rounded hover:cursor-pointer ${
                          selectedDay === index
                            ? "bg-[#2596be] text-background"
                            : "hover:bg-secondary"
                        }`}
                      >
                        <div className="flex flex-col items-center p-1">
                          <p className="text-sm font-semibold">
                            {date.toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p
                            className={`text-xs font-semibold ${
                              selectedDay === index
                                ? "text-background"
                                : "text-muted-foreground"
                            }`}
                          >
                            {date.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <Tabs
            defaultValue="morning"
            className="w-full flex flex-col items-center mt-8"
          >
            <TabsList>
              <TabsTrigger value="morning">Morning</TabsTrigger>
              <TabsTrigger value="afternoon">Afternoon</TabsTrigger>
              <TabsTrigger value="evening">Evening</TabsTrigger>
            </TabsList>
            <TabsContent value="morning" className="w-full">
              <TimeSlotCarousel
                value="morning"
                timeSlots={dummyTimeSlots.morning}
                selectedTime={selectedTime}
                selectedTimeOfDay={selectedTimeOfDay}
                setSelectedTime={setSelectedTime}
                setSelectedTimeOfDay={setSelectedTimeOfDay}
              />
            </TabsContent>
            <TabsContent value="afternoon" className="w-full">
              <TimeSlotCarousel
                value="afternoon"
                timeSlots={dummyTimeSlots.afternoon}
                selectedTime={selectedTime}
                selectedTimeOfDay={selectedTimeOfDay}
                setSelectedTime={setSelectedTime}
                setSelectedTimeOfDay={setSelectedTimeOfDay}
              />
            </TabsContent>
            <TabsContent value="evening" className="w-full">
              <TimeSlotCarousel
                value="evening"
                timeSlots={dummyTimeSlots.evening}
                selectedTime={selectedTime}
                selectedTimeOfDay={selectedTimeOfDay}
                setSelectedTime={setSelectedTime}
                setSelectedTimeOfDay={setSelectedTimeOfDay}
              />
            </TabsContent>
          </Tabs>

          <section className="bg-secondary mt-8 w-full p-6 rounded">
            <div className="border-b flex flex-row justify-between pb-2">
              <h1 className="text-md font-bold py-2">{location.state.name}</h1>

              <div className="flex flex-col">
                <p className="text-md pb-2 text-end font-bold">
                  ${(location.state.price / 100).toFixed(2)}
                </p>
                <p className="text-sm pb-4">
                  {dates[selectedDay].toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  }) +
                    ", " +
                    dummyTimeSlots[selectedTimeOfDay][selectedTime]}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between pt-4 text-sm">
              <p className="flex gap-1 items-center">
                Staff:<span className="font-semibold">No preference</span>
              </p>
              <Link to="/staff">
                <Button variant={"outline"}>Change</Button>
              </Link>
            </div>
          </section>

          <section className="my-4 self-start">
            <Button variant={"ghost"} className="text-md gap-1">
              <IconPlus /> Add a service
            </Button>
          </section>

          <section className="my-8 border-t w-full flex flex-col">
            <div className="text-md font-semibold py-6 ml-auto flex flex-col">
              <h1>
                Total:{" "}
                <span className="font-bold">
                  ${(location.state.price / 100).toFixed(2)}
                </span>
              </h1>
              <p className="text-muted-foreground text-right">
                {location.state.time}
              </p>
            </div>
            <Button
              variant={"default"}
              className="w-full py-6 bg-[#2596be] shadow-md hover:bg-accent-foreground hover:shadow-lg"
              onClick={makeAppointment}
            >
              Confirm Appointment
            </Button>
          </section>
        </div>
      </div>
    </>
  );
};
export default BookAppointmentPage;
