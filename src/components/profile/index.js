import { useUser } from "../../providers/userProvider";

const Profile = () => {
  const { currentUser } = useUser();

  return (
    <div className=" md:min-h-screen lg:px-36 md:py-14 pt-20  px-8">
      <div className="bg-gray-100 shadow-md md:pr-10 md:pl-2 px-3   md:pb-14 pb-3 rounded-lg ">
        <div className="flex md:justify-start justify-end">
          <svg
            fill="none"
            viewBox="5.33 10 53.33 42.67"
            className="md:h-12 md:w-12 h-8 w-8 shadow-md bg-gray-100 rounded-lg hover:shadow-none"
          >
            <path
              fill="#445CDA"
              fillRule="evenodd"
              d="M22.666 26.667a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666Zm-6 3.333a6 6 0 1 1 12 0 6 6 0 0 1-12 0Z"
              clipRule="evenodd"
            />
            <path
              fill="#445CDA"
              fillRule="evenodd"
              d="M22.666 37.334c-4.152 0-7.333 3.083-7.333 6.666a1.333 1.333 0 0 1-2.667 0c0-5.253 4.58-9.333 10-9.333s10 4.08 10 9.333A1.333 1.333 0 1 1 30 44c0-3.583-3.18-6.666-7.334-6.666zM37.334 26c0-.736.597-1.333 1.334-1.333H50a1.333 1.333 0 1 1 0 2.667H38.667A1.333 1.333 0 0 1 37.333 26zm0 17.867c0-.737.597-1.334 1.334-1.334H50a1.333 1.333 0 1 1 0 2.667H38.667a1.333 1.333 0 0 1-1.334-1.334zm0-8.933c0-.736.597-1.333 1.334-1.333H50a1.333 1.333 0 1 1 0 2.666H38.667a1.333 1.333 0 0 1-1.334-1.333z"
              clipRule="evenodd"
            />
            <path
              fill="#2B3151"
              fillRule="evenodd"
              d="M28 14a4 4 0 0 1 8 0v5.333a4 4 0 1 1-8 0V14Zm4-1.333c-.736 0-1.333.597-1.333 1.333v5.333a1.333 1.333 0 1 0 2.666 0V14c0-.736-.597-1.333-1.333-1.333Z"
              clipRule="evenodd"
            />
            <path
              fill="#2B3151"
              fillRule="evenodd"
              d="M28 16.667H12a6.667 6.667 0 0 0-6.667 6.667V46A6.667 6.667 0 0 0 12 52.667h40A6.667 6.667 0 0 0 58.667 46V23.334A6.667 6.667 0 0 0 52 16.667H36V18c0 .553 0 .983-.018 1.334H52a4 4 0 0 1 4 4V46a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V23.334a4 4 0 0 1 4-4h16.018C28 18.984 28 18.554 28 18v-1.333Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="md:flex md:justify-around items-center  ">
          <div className="order-first md:order-last flex justify-center py-3 -mt-28 md:mt-0">
            <div className="h-40 w-40 rounded-full ring ring-blue-300 shadow-xl hover:ring-none flex items-center  justify-center bg-primary-main hover:text-black  hover:font-bold border border-transparent font-medium hover:rounded-full text-white hover:bg-blue-600 ">
              <h1 className="pb-4 text-9xl ">
                {" "}
                {currentUser?.user?.fullName.charAt(0)}
              </h1>
            </div>
          </div>
          <div className="space-y-5 ">
            <div className="flex justify-start items-center space-x-2">
              <div className="font-semibold text-gray-900"> Name:</div>
              <h1 className="text-xl font-bold text-gray-600">
                {" "}
                {currentUser?.user?.fullName}
              </h1>
            </div>
            <div className="flex justify-start items-center space-x-2">
              <div className="font-semibold text-gray-900">Email:</div>
              <h1 className="text-xl font-bold text-gray-600">
                {currentUser?.user?.email}
              </h1>{" "}
            </div>
            <div className="flex justify-start items-center space-x-2">
              <div className="font-semibold text-gray-900">Role:</div>
              <h1 className="text-xl font-bold text-gray-600">
                {currentUser?.user?.role}
              </h1>
            </div>
            <div className="flex justify-start items-center space-x-2">
              <div className="font-semibold text-gray-900">Employe ID:</div>
              <h1 className="text-xl font-bold text-gray-600">
                {currentUser?.user?.employeeId}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
