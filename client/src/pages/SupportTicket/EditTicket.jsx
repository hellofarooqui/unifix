import React, { use, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import useSupportTicket from "../../hooks/useSupportTicket";
import { useNavigate, useParams } from "react-router-dom";
import { useHeader } from "../../context/HeaderContext";



const defaultTicket = {
  _id:"",
  ticket_number: "",
  title: "",
  description: "",
};
const EditTicket = () => {
  const {header,setHeader} = useHeader()
  const params = useParams()
    const navigate = useNavigate();
    const [ticket, setTicket] =  useState<SupportTicket>(defaultTicket);
    const [loading, setLoading] = React.useState(true);
    const [error,setError]=useState("")

    const {updateSupportTicket,getSupportTicketByNumber} = useSupportTicket();

    useEffect(()=>{
      setHeader({...header,title:"Update Ticket"})
    },[])

    useEffect(()=>{
      const fetchTicket = async ()=>{
        try{
          const response = await getSupportTicketByNumber(params.ticketNumber)
          if(response){
            console.log(response)
            setTicket(response)
            setLoading(false)
          }
          
        }
        catch(error){
            setError("Something went wrong")
          }
      }
      fetchTicket()
    },[])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTicket({ ...ticket, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateSupportTicket(ticket._id, ticket);
            console.log("Ticket updated successfully:", response);
            setTicket(defaultTicket); // Reset the form
            navigate("/support");
        } catch (error) {
            console.error("Error creating ticket:", error);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="p-6">
     
     <div className=" bg-white p-4 rounded-md shadow">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="ticket_number">Ticket Number</label>
            <input
              type="text"
              id="ticket_number"
              value={ticket.ticket_number}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              name="ticket_number"
            />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={ticket.title}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md p-2"
              name="title"
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={ticket.description}
              onChange={handleInputChange}
              name="description"
              placeholder="Enter description here..."
              className="resize-none w-full border border-gray-300 rounded-md p-2"
              rows={4}
            />
          </div>
          <Button type="submit" className="self-end">Submit</Button>
        </form>
     </div>
    </div>
  );
};

export default EditTicket;
