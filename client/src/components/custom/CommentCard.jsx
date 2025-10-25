import dateformat from "dateformat";


const CommentCard = ({ comment }) => {
  return (
    <div className="flex flex-col bg-white border rounded-md p-4">
      <div className="flex justify-between items-center mb-2">
        <p className=" font-semibold text-gray-800">
          {comment.user ? comment.user.name : "NA"}
        </p>
        <p className="text-xs text-gray-600">Commented on {dateformat(comment.createdAt)}</p>
      </div>

      <p className="text-gray-700 ">{comment.comment}</p>
    </div>
  );
};

export default CommentCard;
