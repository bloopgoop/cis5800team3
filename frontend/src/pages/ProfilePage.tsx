import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@/components/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
  TableHeader,
  TableHead,
} from "@/components/ui/table";
import AuthContext from "@/context/auth-context";

type Appointment = {
  date: string;
  service: string;
  price: number;
  staff: string | null;
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, authTokens } = useContext(AuthContext);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const getAppointments = async () => {
    if (!authTokens) {
      console.error("User is not authenticated");
      navigate("/login", { state: { message: "Please log in first" } });
      return;
    }

    const resp = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/appointment/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      }
    );
    if (resp.ok) {
      setAppointments(await resp.json());
    } else {
      navigate("/error", {
        state: {
          statusCode: resp.status,
          hint: resp.statusText || "Failed to retrieve appointments.",
        },
      });
    }
  };

  useEffect(() => {
    getAppointments();
    console.log(appointments);
  }, []);

  return (
    <>
      <Navbar />
      <div className="my-8 mx-auto max-w-screen-lg border">
        <div className="p-10 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-2">Welcome, {user?.email}</h1>
          <Table className="w-full max-w-[80%] mx-auto">
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead className="w-[100px]">Price</TableHead>
                <TableHead className="w-[200px]">Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableCaption>Your Appointments</TableCaption>
            <TableBody>
              {appointments.map((appointment, index) => (
                <TableRow key={index}>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.price}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  {/* Record<K, T> is TypeScript utility to represent an object type where keys are type K and values are type T */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
