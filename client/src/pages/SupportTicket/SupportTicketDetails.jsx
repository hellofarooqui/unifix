import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSupportTicket from "../../hooks/useSupportTicket";
import { Button } from "../../components/ui/button";
import { ChevronDown, Plus, X } from "lucide-react";
import CommentCard from "../../components/custom/CommentCard";
import { useAuthContext } from "../../context/AuthContext";
import dateformat from "dateformat";
import { useHeader } from "../../context/HeaderContext";

const defaultComment = {
  user: "",
  comment: "",
};

const SupportTicketDetails = () => {
  const { header, setHeader } = useHeader();
  const { ticketNumber } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [newComment, setNewComment] = useState({
    user: user._id,
    comment: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [statusMenu, setStatusMenu] = useState(false);
  const statusMenuRef = React.useRef < HTMLDivElement > null;
  const [newStatus, setNewStatus] = useState("");
  const [showNewCommentBox, setShowNewCommentBox] = useState(false);

  const {
    getSupportTicketByNumber,
    updateSupportTicket,
    addCommentToSupportTicket,
  } = useSupportTicket();

  const fetchTicketDetails = async () => {
    try {
      const response = await getSupportTicketByNumber(ticketNumber);
      if (response) {
        console.log(response);
        setTicket(response);
        setLoading(false);
        setError("");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    setHeader({ ...header, title: "Ticket Details" });
  }, []);

  useEffect(() => {
    fetchTicketDetails();
    //setNewComment({...newComment, user: user._id });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(event.target)
      ) {
        setStatusMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleStatusChange = (status) => {
    setNewStatus(status);
    setStatusMenu(false);
    setTicket({ ...ticket, status: status });
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setNewStatus("");
    navigate(-1);
  };

  const handleUpdate = async () => {
    if (ticket) {
      const response = await updateSupportTicket(ticket._id, ticket);
      if (response) {
        setEditing(false);
        setNewStatus("");
        navigate(-1);
      }
    } else {
      setError("Something went wrong");
    }
  };

  const handleCommentBoxChange = (e) => {
    setNewComment({ ...newComment, comment: e.target.value });
  };
  const handleResetComment = () => {
    setShowNewCommentBox(false);
    setNewComment(defaultComment);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      //setNewComment({ ...newComment, user: user._id });
      console.log("User id", user._id);
      //setNewComment({...newComment, user: user._id})
      const response = await addCommentToSupportTicket(ticket?._id, {
        ...newComment,
        user: user._id,
      });
      if (response) {
        // console.log(response);
        // const updatedComments = [...ticket.comments, {user:user, ...newComment}];
        // setTicket({ ...ticket, comments: updatedComments });
        fetchTicketDetails(); // Refresh ticket details to include new comment
        setNewComment(defaultComment);
        setShowNewCommentBox(false);
      }
    } catch (error) {
      window.alert("Comment not added, something went wrong");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col gap-y-8 justify-between p-4">
      <div className="flex flex-col gap-y-8">
        <div className="bg-white flex justify-between items-center p-4 rounded-md border border-gray-300">
          <h2 className="text-xl font-bold text-gray-600">
            {ticket.ticket_number} - {ticket.title}
          </h2>
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setStatusMenu(!statusMenu)}
              className="w-[125px] flex items-center gap-x-2 group "
            >
              <span className="pl-4">{ticket.status}</span>{" "}
              <ChevronDown className="group-hover:opacity-100 opacity-0 transition-all duration-300" />
            </Button>
            {statusMenu && (
              <div
                ref={statusMenuRef}
                className="absolute top-full left-0 bg-white shadow-md rounded-md"
              >
                <ul className="flex flex-col gap-y-2">
                  <li
                    onClick={() => handleStatusChange("Open")}
                    className="px-4 py-2 hover:bg-gray-100 hover:cursor-pointer"
                  >
                    Open
                  </li>
                  <li
                    onClick={() => handleStatusChange("Closed")}
                    className="px-4 py-2 hover:bg-gray-100 hover:cursor-pointer"
                  >
                    Closed
                  </li>
                  <li
                    onClick={() => handleStatusChange("In Progress")}
                    className="px-4 py-2 hover:bg-gray-100 hover:cursor-pointer"
                  >
                    In Progress
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="bg-white  border border-gray-300 rounded-sm overflow-hidden">
          <h4 className=" font-semibold text-lg mb-2 p-4 py-2 bg-gray-100 border-b">
            Description
          </h4>
          <div className="p-4">
            <p className=" text-gray-800">{ticket.description}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-sm overflow-hidden">
          <h2 className=" font-semibold text-lg mb-2 p-4 py-2 bg-gray-100 border-b">
            Device Details
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 p-4">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {ticket.device?.deviceName}
            </p>
            <p>
              <span className="font-semibold">Type:</span>{" "}
              {ticket.device?.deviceType.name}
            </p>
            <p>
              <span className="font-semibold">Vendor:</span>{" "}
              {ticket.vendor_details?.name} {}
            </p>
            <p>
              <span className="font-semibold">Serial Number:</span>{" "}
              {ticket.device?.deviceSerialNumber}
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h4 className=" text-xl font-semibold mb-2">Comments</h4>
            <button
              onClick={() => setShowNewCommentBox((prev) => !prev)}
              className="flex items-center gap-x-2 font-bold text-sm text-gray-600 cursor-pointer p-2 rounded-md hover:bg-slate-100/30"
            >
              {showNewCommentBox ? <X /> : <Plus className="text-sm" />} Add
              Comment
            </button>
          </div>
          {showNewCommentBox && (
            <div>
              <form onSubmit={handleCommentSubmit} onReset={handleResetComment}>
                <textarea
                  name="new_comment"
                  placeholder="Type here"
                  className="w-full p-4 resize-none bg-white border rounded-md"
                  rows={3}
                  onChange={handleCommentBoxChange}
                />
                <div className="flex justify-end gap-x-2 mt-2 mb-4">
                  <Button type="reset" variant="outline">
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </div>
          )}
          <div className="flex flex-col gap-y-2">
            {!ticket.comments.length > 0 ? (
              <p className="bg-white p-4  border border-gray-300 rounded-sm">
                No comments
              </p>
            ) : (
              ticket.comments
                .map((comment) => (
                  <CommentCard key={comment._id} comment={comment} />
                ))
                .reverse()
            )}
          </div>
        </div>
      </div>
      {editing && (
        <div className="flex gap-x-2 justify-end">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="bg-red-500 text-white px-8"
          >
            Cancel
          </Button>
          <Button onClick={handleUpdate} className=" px-8">
            Update
          </Button>
        </div>
      )}
    </div>
  );
};

export default SupportTicketDetails;
