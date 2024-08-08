import { HiHome } from "react-icons/hi";
import { Breadcrumb } from "flowbite-react";
import { ButtonPro } from "../../../components/common";
import pathAdmin from "../../../utils/pathAdmin";

function InforAccount() {
  return (
    <div>
      <Breadcrumb aria-label="Default breadcrumb example " className="mb-4">
        <Breadcrumb.Item href="#" icon={HiHome}>
          Accounts
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Manager</Breadcrumb.Item>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex bg-white dark:bg-slate-800 p-5 rounded-lg shadow-lg">
          <div className="w-36 h-36 flex-shrink-0">
            <img
              src={""}
              className="w-full h-full object-cover rounded-full border-4 border-blue-500"
              alt=""
            />
          </div>
          <div className="ml-4">
            <h1 className="font-bold text-2xl mt-2 dark:text-white">
              Unactivated Account
            </h1>
            <p className="font-semibold text-gray-600 dark:text-gray-300 mt-1">
              Details about the unactivated account
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
              View Details
            </button>
          </div>
        </div>

        <div className="flex bg-white dark:bg-slate-800 p-5 rounded-lg shadow-lg">
          <div className="w-36 h-36 flex-shrink-0">
            <img
              src={""}
              className="w-full h-full object-cover rounded-full border-4 border-green-500"
              alt=""
            />
          </div>
          <div className="ml-4">
            <h1 className="font-bold text-2xl mt-2 dark:text-white">
              Admin Account
            </h1>
            <p className="font-semibold text-gray-600 dark:text-gray-300 mt-1">
              Details about the admin account
            </p>
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
              View Details
            </button>
          </div>
        </div>

        <div className="flex bg-white dark:bg-slate-800 p-5 rounded-lg shadow-lg">
          <div className="w-36 h-36 flex-shrink-0">
            <img
              src={""}
              className="w-full h-full object-cover rounded-full border-4 border-purple-500"
              alt=""
            />
          </div>
          <div className="ml-4">
            <h1 className="font-bold text-2xl mt-2 dark:text-white">
              User Account
            </h1>
            <p className="font-semibold text-gray-600 dark:text-gray-300 mt-1">
              Details about the user account
            </p>
            <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition duration-300">
              View Details
            </button>
          </div>
        </div>

        <div className="flex bg-white dark:bg-slate-800 p-5 rounded-lg shadow-lg">
          <div className="w-36 h-36 flex-shrink-0">
            <img
              src={""}
              className="w-full h-full object-cover rounded-full border-4 border-red-500"
              alt=""
            />
          </div>
          <div className="ml-4">
            <h1 className="font-bold text-2xl mt-2 dark:text-white">
              Manager Roles
            </h1>
            <p className="font-semibold text-gray-600 dark:text-gray-300 mt-1 mb-4">
              Details about the guest account
            </p>
            <div className="flex gap-4">
              <ButtonPro
                name="Group Roles"
                to={`${pathAdmin.accountGroupRoles}`}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              ></ButtonPro>
              <ButtonPro
                name="Roles"
                to={`${pathAdmin.accountRoles}`}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              ></ButtonPro>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InforAccount;
