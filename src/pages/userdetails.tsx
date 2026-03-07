import { useEffect, useState } from "react";
import type { User } from "../types/users";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [userDetails, setUserDetails] = useState<User>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`https://dummyjson.com/users/${id}`);
        setUserDetails(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  const deleteUser = async () => {
    const response = await axios.delete(`https://dummyjson.com/users/${id}`);
    if (response.status == 200) {
      alert("User Deleted");
      navigate("/");
    }
  };
  const fullName = `${userDetails?.firstName} ${userDetails?.lastName}`;
  const companyAddress = `${userDetails?.company.address.address} , ${userDetails?.company.address.city} , ${userDetails?.company.address.country} `;
  return (
    <div className="flex flex-col items-center">
      <img
        src={userDetails?.image || "/vite.svg"}
        alt="Prof"
        className="w-32 h-32"
      />
      <div className="w-full flex  justify-between  items-center p-4">
        <button
          onClick={() => navigate(`/`)}
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition"
        >
          Back to Listing
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/edit-user/${id}`)}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition"
          >
            Edit User
          </button>
          <button
            onClick={deleteUser}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition"
          >
            Delete User
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        <div className="userdetailscard1">
          <div className="userdetailscard2">
            <p>Personal Details</p>
          </div>
          <RowDetails label="Fullname" value={fullName || ""} />
          <RowDetails
            label="Date of Birth"
            value={userDetails?.birthDate || ""}
          />
          <RowDetails label="Gender" value={userDetails?.gender || ""} />
          <RowDetails label="Phone Number" value={userDetails?.phone || ""} />
          <RowDetails label="Email" value={userDetails?.email || ""} />
        </div>

        <div className="userdetailscard1">
          <div className="userdetailscard2">
            <p>Address</p>
          </div>
          <RowDetails
            label="Address"
            value={userDetails?.address.address || ""}
          />
          <RowDetails label="City" value={userDetails?.address.city || ""} />
          <RowDetails label="State" value={userDetails?.address.state || ""} />
          <RowDetails
            label="State Code"
            value={userDetails?.address.stateCode || ""}
          />
          <RowDetails
            label="Postal Code"
            value={userDetails?.address.postalCode || ""}
          />
        </div>

        <div className="userdetailscard1">
          <div className="userdetailscard2">
            <p>Company Details</p>
          </div>
          <RowDetails label="Name" value={userDetails?.company.name || ""} />

          <RowDetails label="Address" value={companyAddress || ""} />
          <RowDetails
            label="Department"
            value={userDetails?.company.department || ""}
          />
          <RowDetails
            label="Position"
            value={userDetails?.company.title || ""}
          />
        </div>

        <div className="userdetailscard1">
          <div className="userdetailscard2">
            <p>Bank Details</p>
          </div>
          <RowDetails
            label="Card Expiry"
            value={userDetails?.bank.cardExpire || ""}
          />

          <RowDetails
            label="Card Number"
            value={userDetails?.bank.cardNumber || ""}
          />
          <RowDetails
            label="Card Type"
            value={userDetails?.bank.cardType || ""}
          />
          <RowDetails
            label="Currency"
            value={userDetails?.bank.currency || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

const RowDetails = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="grid grid-cols-[35%_65%] p-2  text-md border-b ">
      <p className="font-bold">{label}</p>
      <p>{value}</p>
    </div>
  );
};
