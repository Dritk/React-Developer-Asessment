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
    <div className="">
      <div className="bg-white border border-gray-200 rounded-xl p-6 w-64 shadow-sm">
        <div className="flex items-center gap-3 mb-4 ">
          <img
            src={imgSrc || "/vite.svg"}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900 text-sm ">{fullName}</p>
            <p className="text-xs text-gray-500">{companyName}</p>
          </div>
        </div>
        <div className="h-px bg-gray-300 mb-4" />
        <div className="space-y-1.5 mb-5 text-sm text-gray-700">
          <p>{email}</p>
          <p>{phone}</p>
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
