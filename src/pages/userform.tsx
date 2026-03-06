import { Formik } from "formik";
import { userDetailsSchema } from "../schema/formvalidation";
import type { InputFieldProps } from "../types/inputfield";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { User } from "../types/users";

const UserForm = () => {
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
  console.log(userDetails);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: userDetails?.firstName || "",
        lastName: userDetails?.lastName || "",
        birthDate: userDetails?.birthDate || "",
        gender: userDetails?.gender || "",
        phone: userDetails?.phone || "",
        email: userDetails?.email || "",
        address: userDetails?.address?.address || "",
        city: userDetails?.address?.city || "",
        companyName: userDetails?.company?.name || "",
        department: userDetails?.company?.department || "",
        title: userDetails?.company?.title || "",
        cardExpire: userDetails?.bank?.cardExpire || "",
        cardNumber: userDetails?.bank?.cardNumber || "",
      }}
      validationSchema={userDetailsSchema}
      onSubmit={async (values) => {
        const response = id
          ? await axios.put(`https://dummyjson.com/users/${id}`, values)
          : await axios.post("https://dummyjson.com/users/add", values);
        if (response.status == 201 || response.status == 200) {
          alert(id ? "Edit Successfully" : "User Added");
          navigate("/");
        }
      }}
    >
      {(props) => {
        console.log(props.errors);
        return (
          <div className="flex flex-col items-center ">
            <h1 className="text-2xl font-bold my-4">
              {id ? "Edit User" : "Add New User"}
            </h1>
            <form
              onSubmit={props.handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl p-4"
            >
              <div>
                <p>Personal Details</p>

                <InputField
                  name="firstName"
                  placeholder="First Name"
                  value={props.values.firstName}
                  onChange={props.handleChange}
                  error={props.errors.firstName}
                />

                <InputField
                  name="lastName"
                  placeholder="Last Name"
                  value={props.values.lastName}
                  onChange={props.handleChange}
                  error={props.errors.lastName}
                />
                <InputField
                  name="birthDate"
                  placeholder="Birth Date"
                  value={props.values.birthDate}
                  onChange={props.handleChange}
                  error={props.errors.birthDate}
                />

                <select
                  name="gender"
                  value={props.values.gender}
                  onChange={props.handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <h2>Address</h2>

                <InputField
                  name="address"
                  placeholder="Address"
                  value={props.values.address}
                  onChange={props.handleChange}
                  error={props.errors.address}
                />

                <InputField
                  name="city"
                  placeholder="City"
                  value={props.values.city}
                  onChange={props.handleChange}
                  error={props.errors.city}
                />

                <InputField
                  name="email"
                  placeholder="Email"
                  value={props.values.email}
                  onChange={props.handleChange}
                  error={props.errors.email}
                />

                <InputField
                  name="phone"
                  placeholder="Phone"
                  value={props.values.phone}
                  onChange={props.handleChange}
                  error={props.errors.phone}
                />
              </div>

              <div>
                <h2>Company</h2>
                <InputField
                  name="companyName"
                  placeholder="Company Name"
                  value={props.values.companyName}
                  onChange={props.handleChange}
                  error={props.errors.companyName}
                />

                <InputField
                  name="department"
                  placeholder="Department"
                  value={props.values.department}
                  onChange={props.handleChange}
                  error={props.errors.department}
                />

                <InputField
                  name="title"
                  placeholder="Position"
                  value={props.values.title}
                  onChange={props.handleChange}
                  error={props.errors.title}
                />
              </div>

              <div>
                <h2>Bank</h2>
                <InputField
                  name="cardExpire"
                  placeholder="MM/YY"
                  value={props.values.cardExpire}
                  onChange={props.handleChange}
                  error={props.errors.cardExpire}
                />

                <InputField
                  name="cardNumber"
                  placeholder="Card Number"
                  value={props.values.cardNumber}
                  onChange={props.handleChange}
                  error={props.errors.cardNumber}
                />
              </div>

              <button
                className="bg-blue-500 text-white w-[200px] py-2 px-4 rounded hover:bg-blue-600"
                type="submit"
              >
                {id ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default UserForm;

const InputField = ({
  name,
  placeholder,
  value,
  onChange,
  error,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 my-2">
      <input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 py-0.5 px-2 rounded"
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
