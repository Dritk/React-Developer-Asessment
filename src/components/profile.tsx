import { MdOutlineMail, MdOutlinePhone } from "react-icons/md";

interface ProfileProps {
  fullName: string;
  imgSrc?: string;
  email: string;
  phone: string;
  companyName: string;
  onClick?: () => void;
}

const Profile = ({
  fullName,
  imgSrc,
  email,
  phone,
  companyName,
  onClick,
}: ProfileProps) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200  w-full">
      <div className="h-0.5 bg-gray-200 group-hover:bg-blue-700 transition-colors duration-300" />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4 ">
          <img
            src={imgSrc || "/vite.svg"}
            alt=""
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm ">{fullName}</p>
            <p className="text-xs text-gray-500">{companyName}</p>
          </div>
        </div>
        <div className="h-px bg-gray-300 mb-4" />
        <div className="space-y-1.5 mb-5 text-sm text-gray-700">
          <p className="flex items-center gap-1">
            <MdOutlineMail className="shrink-0" />
            {email}
          </p>
          <p className="flex items-center gap-1">
            <MdOutlinePhone />
            {phone}
          </p>
        </div>

        <button
          className="w-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-700 transition-colors rounded-lg p-2 mt-2"
          onClick={onClick}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
