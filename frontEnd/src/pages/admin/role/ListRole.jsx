import {
  Button,
  Checkbox,
  Dropdown,
  Select,
  Table,
  Breadcrumb,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { pathAdmin } from "../../../utils/path";
import { ButtonPro, InputField } from "../../../components/common";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiCreateRole, apiGetAllRole, apiGetRole, apiUpdateRole } from "../../../apis/axios";

function ListRole() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [value, setValue] = useState({
    route: "",
    description: "",
  });

  const callApiGetAllRole = async () => {
    try {
      const res = await apiGetAllRole();
      if (res) {
        setData(res.roles);
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerSubmit = async () => {
    try {
      if (value.route.length === 0 || value.description.length === 0) {
        toast.error("Please fill in all fields");
        return;
      }

      const res = id ? await apiUpdateRole(id, value) : await apiCreateRole(value);

      if (res && res.status) {
        toast.success(res.message);
        setValue({ route: "", description: "" });
        callApiGetAllRole();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const callApiGetRole = async (id) => {
    try {
      const res = await apiGetRole(id);
      if (res) {
        setId(id);
        setValue({route: res.role.route, description: res.role.description});
        toast.success(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    callApiGetAllRole();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiHome}>
            Accounts
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
          <Breadcrumb.Item>Manager</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="flex flex-col md:flex-row rounded-md p-2 mb-3 gap-3">
        <div className="rounded-md p-2 bg-white dark:bg-slate-800 w-96">
          <div className="flex justify-between items-center rounded-md ">
            <p className="dark:text-[#fff] font-semibold">{id ? "Edit" : "Create"} Role</p>
            <Button type="submit" onClick={handlerSubmit}>
              Submit
            </Button>
          </div>
          <form className="flex max-w-md flex-col gap-4 border-t mt-2 pt-4">
            <InputField
              value={value.route}
              filed="Router name"
              type="text"
              placeholder="Group Role"
              onChange={(e) => setValue({ ...value, route: e.target.value })}
            />
            <InputField
              value={value.description}
              filed="Description"
              type="text"
              placeholder="Description"
              onChange={(e) =>
                setValue({ ...value, description: e.target.value })
              }
            />
          </form>
        </div>
        <div className="rounded-md p-2 bg-white dark:bg-slate-800 w-full">
          <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2">
            <Dropdown
              label="Actions"
              dismissOnClick={false}
              renderTrigger={() => <Button color="light">Actions</Button>}
            >
              <Dropdown.Item>
                <Link to={`${pathAdmin.category}/create`}>Create</Link>
              </Dropdown.Item>
              <Dropdown.Item>Delete</Dropdown.Item>
              <Dropdown.Item>Activated</Dropdown.Item>
            </Dropdown>
            <label for="table-search" class="sr-only">
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
              />
            </div>
          </div>

          <div className="overflow-x-auto border-y border-[#ccc] py-2">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-4">
                  <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell className="text-nowrap">STT</Table.HeadCell>
                <Table.HeadCell className="text-nowrap">Route</Table.HeadCell>
                <Table.HeadCell className="text-nowrap">
                  Description
                </Table.HeadCell>
                <Table.HeadCell className="text-nowrap">actions</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {data?.map((item, index) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-4">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.route}</Table.Cell>
                    <Table.Cell>{item.description}</Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        {/* <ButtonPro
                          type="button"
                          name={<i class="fa-solid fa-trash"></i>}
                          onclick={""}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        /> */}
                        <ButtonPro
                          onClick={() => callApiGetRole(item._id)}
                          name={<i className="fa-solid fa-pen-to-square"></i>}
                          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 dark:focus:ring-yellow-900"
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="max-w-md">
              <Select id="countries" required>
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
              </Select>
            </div>
            <div className="flex overflow-x-auto sm:justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListRole;
