import axios from "axios";
const API_URL = "http://localhost:3000/api/support";


const useSupportTicket = () => {
  // Custom hook logic here
  const getAllSupportTicketsList = async () => {
    try {
      const response = await axios.get(`${API_URL}/list`);
      //console.log("Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching support tickets:", error);
      throw error;
    }
  };
  const getSupportTicketById = async (ticketId) => {
    try {
      const response = await axios.get(`${API_URL}/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching support ticket:", error);
      throw error;
    }
  };
  const getSupportTicketByNumber = async (ticketNumber) => {
    try {
      ////console.log("Number:", ticketNumber)
      const response = await axios.get(`${API_URL}/number/${ticketNumber}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching support ticket:", error);
      throw error;
    }
  };
  const createSupportTicket = async (ticketData) => {
    try {
      //console.log("Ticket Data:", ticketData);
      const response = await axios.post(`${API_URL}/`, ticketData);
      return response.data;
    } catch (error) {
      console.error("Error creating support ticket:", error);
      throw error;
    }
  };
  const updateSupportTicket = async (
    ticketId,
    ticketData
  ) => {
    try {
      const response = await axios.put(`${API_URL}/${ticketId}`, ticketData);
      return response.data;
    } catch (error) {
      console.error("Error updating support ticket:", error);
      throw error;
    }
  };
  const deleteSupportTicket = async (ticketId) => {
    try {
      const response = await axios.delete(`${API_URL}/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting support ticket:", error);
      throw error;
    }
  };
  const addCommentToSupportTicket = async (
    ticketId,
    commentData
  ) => {
    try {
        //console.log("CommentData",commentData)
      const response = await axios.post(
        `${API_URL}/${ticketId}/comments`,
        commentData
      );
      return response.data;
    } catch (error) {
      console.error("Error adding comment to support ticket:", error);
      throw error;
    }
  };
  const deleteCommentFromSupportTicket = async (
    ticketId,
    commentId
  ) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${ticketId}/comments/${commentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting comment from support ticket:", error);
      throw error;
    }
  };
  const updateCommentOnSupportTicket = async (
    ticketId,
    commentId,
    commentData
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/${ticketId}/comments/${commentId}`,
        commentData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating comment on support ticket:", error);
      throw error;
    }
  };
  const getCommentsForSupportTicket = async (ticketId) => {
    try {
      const response = await axios.get(`${API_URL}/${ticketId}/comments`);
      return response.data;
    } catch (error) {
      console.error("Error fetching comments for support ticket:", error);
      throw error;
    }
  };

  return {
    getAllSupportTicketsList,
    getSupportTicketById,
    getSupportTicketByNumber,
    createSupportTicket,
    updateSupportTicket,
    deleteSupportTicket,
    addCommentToSupportTicket,
    deleteCommentFromSupportTicket,
    updateCommentOnSupportTicket,
    getCommentsForSupportTicket,
  };
};

export default useSupportTicket;
