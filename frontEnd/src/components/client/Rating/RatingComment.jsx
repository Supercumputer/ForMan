import { Blockquote, Button, Label, Modal, Textarea } from 'flowbite-react'
import { useState } from 'react'
import Rating from "react-star-ratings";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createRating } from '../../../apis/ratingApi';

const listGoiY = [
    "Chất lượng sản phẩm tuyệt vời",
    "Đóng gói sản phẩm đẹp và chắc chắn",
    "Giao hàng nhanh chóng",
    "Shop phục vụ rất tốt"
]

function RatingComment({ openModal, setOpenModal, variant_id }) {
    
    const [content, setContent] = useState(listGoiY[0]);
    const [rating, setRating] = useState(5);
    const {account} = useSelector(state => state.auth);
    
    const handlerSubmit = async () => {
        try {
            const res = await createRating({ rating, content, user_id: account?.id }, variant_id);

            if (res && res.status) {
                toast.success(res.message);
                setOpenModal(false);
            }else{
                toast.error(res.message);
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Rating star and comment</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <figure className="max-w-screen-md">
                        <div className="mb-4 flex items-center justify-center">
                            <Rating
                                rating={rating}
                                starRatedColor="#E3A008"
                                starHoverColor="#E3A008"
                                changeRating={(newRating) => setRating(newRating)}
                                // starDimension="30px"
                                starSpacing="5px"
                                numberOfStars={5}
                                name="rating"
                            />
                        </div>
                        <Blockquote className="flex justify-center items-center gap-4 flex-wrap">
                            {listGoiY.map((item, index) => (
                                <p key={index}
                                    onClick={() => setContent(item)}
                                    className="text-sm p-2 rounded-full font-semibold border text-gray-800 text-nowrap cursor-pointer">
                                    {item}
                                </p>
                            ))}
                        </Blockquote>

                    </figure>

                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="comment" value="Nhập đánh giá của bạn" />
                        </div>
                        <Textarea
                            id="comment"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Leave a comment..."
                            required
                            rows={4}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handlerSubmit(5)}>Submit</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default RatingComment
