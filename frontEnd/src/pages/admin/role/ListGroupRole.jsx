import { Button, Checkbox, Table, Breadcrumb, Label } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { ButtonPro, InputField } from "../../../components/common";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/helper";
import { createGroupRole, deleteGroupRole, getAllGroupRoles, getAllRoles, getGroupRoleById, updateGroupRole } from "../../../apis/roleApi";

function ListGroupRole() {
  const [data, setData] = useState([]);

  const [id, setId] = useState(null);

  const [name, setName] = useState("");

  const [value, setValue] = useState({
    dataCheckValue: [],
    dataCheckId: new Set(),
  });

  const [listRoles, setListRoles] = useState([]);

  const callApiGetAllGroupRole = async () => {
    try {
      const res = await getAllGroupRoles("");

      if (res && res.status) {
        setData(res.groupRoles);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const callApiGetAllRoles = async () => {
    try {
      const res = await getAllRoles();

      if (res && res.status) {
        setListRoles(res.roles);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerCheckBox = (data) => {
    setValue((prev) => {
      const dataCheckId = new Set(prev.dataCheckId);

      if (dataCheckId.has(data._id)) {
        dataCheckId.delete(data._id);

        const dataCheckValue = prev.dataCheckValue.filter(
          (item) => item._id !== data._id
        );

        return {
          dataCheckValue,
          dataCheckId: dataCheckId,
        };
      } else {
        dataCheckId.add(data._id);

        return {
          dataCheckValue: [...prev.dataCheckValue, data],
          dataCheckId: dataCheckId,
        };
      }
    });
  };

  const handlerSubmit = async () => {
    try {
      if ([...value.dataCheckId].length === 0 || name.length === 0) {
        toast.warning("Please fill in all fields");
        return;
      }

      const data = {
        name,
        permissions: [...value.dataCheckId],
      };

      const res = id
        ? await updateGroupRole(id, data)
        : await createGroupRole(data);

      if (res && res.status) {
        toast.success(res.message);
        setName("");
        setValue({
          dataCheckValue: [],
          dataCheckId: new Set(),
        });
        callApiGetAllGroupRole();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const callApiGetGroupRole = async (id) => {
    try {
      const res = await getGroupRoleById(id);
      if (res) {
        setId(id);
        setName(res.groupRole.name);
        console.log(res.groupRole);
        setValue({
          dataCheckValue: [...res.groupRole.permissions],
          dataCheckId: new Set(
            res.groupRole.permissions.map((item) => item._id)
          ),
        });

        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlerDelete = async (id) => {
    try {
      const res = await deleteGroupRole(id);
      if (res && res.status) {
        toast.success(res.message);
        callApiGetAllGroupRole();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    callApiGetAllGroupRole();
    callApiGetAllRoles();
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
            <p className="dark:text-[#fff] font-semibold">
              {id ? "Edit" : "Create"} Group Role
            </p>
            <Button type="submit" onClick={handlerSubmit}>
              Submit
            </Button>
          </div>
          <form className="flex max-w-md flex-col gap-4 border-t mt-2 pt-4">
            <InputField
              filed="Group Role"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Group Role"
            />

            <div>
              <div className="mb-2 block">
                <Label htmlFor="" value="Permission" />
              </div>
              {value?.dataCheckValue.map((item, index) => (
                <span key={index}
                  id="badge-dismiss-default"
                  className="inline-flex items-center px-2 py-1 me-2 mb-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {item.route}
                  <button
                    onClick={() => handlerCheckBox(item)}
                    type="button"
                    className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </span>
              ))}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="List role" />
              </div>
              <ul
                className="space-y-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHelperButton"
              >
                {listRoles?.map((role, index) => (
                  <li key={index}>
                    <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <div className="flex items-center h-5">
                        <input
                          checked={value.dataCheckId.has(role._id)}
                          id={`helper-checkbox-${role._id}`}
                          type="checkbox"
                          onChange={() => handlerCheckBox(role)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                      </div>

                      <div className="ms-2 text-sm">
                        <label
                          htmlFor={`helper-checkbox-${role._id}`}
                          className="font-medium text-gray-900 dark:text-gray-300"
                        >
                          <div>{role.route}</div>
                          <p
                            id="helper-checkbox-text-1"
                            className="text-xs font-normal text-gray-500 dark:text-gray-300"
                          >
                            {role.description}
                          </p>
                        </label>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
        <div className="rounded-md p-2 bg-white dark:bg-slate-800 w-full">
          <div className="overflow-x-auto ">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell className="p-4">
                  <Checkbox />
                </Table.HeadCell>
                <Table.HeadCell className="text-nowrap">STT</Table.HeadCell>
                <Table.HeadCell className="text-nowrap">Name</Table.HeadCell>
                <Table.HeadCell className="text-nowrap">
                  createdAt
                </Table.HeadCell>

                <Table.HeadCell className="text-nowrap">
                  Upadted_at
                </Table.HeadCell>
                <Table.HeadCell className="text-nowrap">actions</Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {data?.map((item, index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="p-4">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{formatDate(item.createdAt)}</Table.Cell>
                    <Table.Cell>{formatDate(item.updatedAt)}</Table.Cell>

                    <Table.Cell>
                      <div className="flex gap-2">
                        <ButtonPro
                          type="button"
                          name={<i className="fa-solid fa-trash"></i>}
                          actionDelete={handlerDelete}
                          dataId={item?._id}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        />

                        <ButtonPro
                          onClick={() => callApiGetGroupRole(item._id)}
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
        </div>
      </div>
    </div>
  );
}

export default ListGroupRole;
