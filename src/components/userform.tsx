import { Formik } from "formik";
import { userDetailsSchema } from "../schema/formvalidation";
import type { InputFieldProps } from "../types/inputfield";
import axios from "axios";

const UserForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        phone: "",
        email: "",

        address: "",
        city: "",

        companyName: "",
        department: "",
        title: "",

        cardExpire: "",
        cardNumber: "",
      }}
      validationSchema={userDetailsSchema}
      onSubmit={async (values) => {
        const response = await axios.post(
          "https://dummyjson.com/users/add",
          values,
        );
        console.log(response.data);
      }}
    >
      {(props) => {
        console.log(props.errors);
        return (
          <div className="flex flex-col items-center ">
            <h1 className="text-2xl font-bold my-4">Add New User</h1>
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
                Submit
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
