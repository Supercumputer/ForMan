import React, { useEffect, useState } from "react";
import {
  Button,
  Pagination,
  Table,
  Breadcrumb,
  Modal,
  Label,
  Textarea,
  Blockquote,
  Rating,
  Avatar,
} from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { ButtonPro, Img } from "../../../components/common";
import { useTranslation } from "react-i18next";
import { start } from "../../../utils/helper";
import { apiGetRatings, apiUpdateReply } from "../../../apis/axios";
import { toast } from "react-toastify";

function ListRating() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState({});
  const { t } = useTranslation("admin");
  const [item, setIitem] = useState({});
  const [reply, setReply] = useState("");
  const { idc } = useParams();
  const [openModal, setOpenModal] = useState(false);

  const onPageChange = (page) => setCurrentPage(page);
  const apiGetRating = async () => {
    try {
      const res = await apiGetRatings(idc, currentPage);

      if (res && res.status) {
        setData(res.comments);
        setTotalPages(res.totalPages);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    apiGetRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  const handlerSubmit = async (id) => {
    try {
      const res = await apiUpdateReply({ reply, item_id: id }, data._id);
      if (res && res.status) {
        setOpenModal(false);
        setReply("");
        setIitem(null);
        apiGetRating();
        toast.success(res.message);
      }
    } catch (error) {
      return toast.error(error);
    }
  };

  const handlerModelShow = async (id) => {
    const item = data.comments.find((item) => item._id === id);
    setIitem(item);
    setReply(item.reply);
    setOpenModal(true);
  };

  return (
    <>
      <div className="mb-4">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiHome}>
            Accounts
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
          <Breadcrumb.Item>Manager</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="rounded-md p-2 bg-white dark:bg-slate-800">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-2">
          <div></div>
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
              <Table.HeadCell className="text-nowrap">STT</Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                User_Rating
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">Content</Table.HeadCell>
              <Table.HeadCell className="text-nowrap">Star</Table.HeadCell>
              <Table.HeadCell className="text-nowrap">
                Created At
              </Table.HeadCell>
              <Table.HeadCell className="text-nowrap">Actions</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {data?.comments?.length > 0 ? (
                data?.comments?.map((item, index) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center text-gray-900 whitespace-nowrap dark:text-white">
                        <Img
                          className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                          src={item.user_id.avatar}
                          alt="Jese image"
                        />
                        <div className="ps-3">
                          <div className="text-base font-semibold">{`${item.user_id.lastName} ${item.user_id.firstName}`}</div>
                          <div className="font-normal text-gray-500">
                            {item.user_id.email}
                          </div>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{item.content}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-1 text-yellow-500">{start(item.rating)}</div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex gap-1">{item.createdAt}</div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <ButtonPro
                          onClick={() => handlerModelShow(item._id)}
                          name={<i class="fa-solid fa-reply"></i>}
                          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2 dark:focus:ring-yellow-900"
                        />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center"
                    colSpan={9}
                  >
                    Chưa có đánh giá nào.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <div className="flex items-center justify-end mt-2">
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Reply Rating</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <figure className="max-w-screen-md">
              <div className="mb-4 flex items-center">
                <Rating size="md">
                  {Array.from({ length: item?.rating }, (v, i) => (
                    <Rating.Star key={i} />
                  ))}
                </Rating>
              </div>
              <Blockquote>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                  "{item?.content}"
                </p>
              </Blockquote>
              <figcaption className="mt-6 flex items-center space-x-3">
                <Avatar
                  rounded
                  size="xs"
                  img={item?.user_id?.avatar}
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
                  <cite className="pr-3 font-medium text-gray-900 dark:text-white">
                    {`${item?.user_id?.lastName} ${item?.user_id?.firstName}`}
                  </cite>
                  <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
                    {item?.user_id?.email}
                  </cite>
                </div>
              </figcaption>
            </figure>

            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Your message" />
              </div>
              <Textarea
                id="comment"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Leave a comment..."
                required
                rows={4}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handlerSubmit(item._id)}>Submit</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListRating;
