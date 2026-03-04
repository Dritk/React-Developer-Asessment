interface ProfileProps {
  fullName: string;
  imgSrc?: string;
  email: string;
  phone: string;
  companyName: string;
}

const Profile = ({
  fullName,
  imgSrc,
  email,
  phone,
  companyName,
}: ProfileProps) => {
  return (
    <div>
      <div className="bg-amber-100 border border-black p-5 ">
        <div className="flex flex-row items-center">
          <img src={imgSrc || "/vite.svg"} alt="" className="w-12 h-12" />
          <h1>{fullName}</h1>
        </div>
        <p>{email}</p>
        <p>{phone}</p>
        <p>{companyName}</p>
      </div>
    </div>
  );
};

export default Profile;
