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
    <div>
      <div className="bg-amber-50 border border-black/30 rounded-lg p-5 ">
        <div className="flex flex-col ">
          <img src={imgSrc || "/vite.svg"} alt="" className="w-14 h-14" />
          <p className="font-bold text-lg ">{fullName}</p>
        </div>
        <p>E-mail:{email}</p>
        <p>
          <span className="">Phone:</span>
          {phone}
        </p>
        <p>{companyName}</p>
        <button
          className="bg-blue-500 text-white rounded-lg p-2 mt-2"
          onClick={onClick}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
