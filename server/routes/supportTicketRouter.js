import express from "express";
import {
  addCommentToSupportTicket,
  createSupportTicket,
  deleteCommentFromSupportTicket,
  deleteSupportTicket,
  getAllSupportTickets,
  getAllSupportTicketsList,
  getCommentsByTicketId,
  getSupportTicketById,
  getSupportTicketByNumber,
  updateSupportTicket,
  updateCommentInSupportTicket,
} from "../controllers/supportTicketController.js";

const router = express.Router();

router.get("/", getAllSupportTickets);
router.get("/list", getAllSupportTicketsList);
router.get("/:ticketId", getSupportTicketById);
router.get("/number/:ticketNumber", getSupportTicketByNumber);
router.post("/", createSupportTicket);
router.put("/:ticketId", updateSupportTicket);
router.delete("/:ticketId", deleteSupportTicket);

router.get("/:ticketId/comments", getCommentsByTicketId);
router.post("/:ticketId/comments", addCommentToSupportTicket);
router.delete("/:ticketId/comments/:commentId", deleteCommentFromSupportTicket);
router.put("/:ticketId/comments/:commentId", updateCommentInSupportTicket);

export default router;
