import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useRMA from '../../hooks/useRMA'
import { Button } from '../../components/ui/button'


const RMAEdit = () => {
    const params = useParams()
    const navigate = useNavigate()
    const rmaNumber = params.rmanumber
    

    const { getRMADetails,editRMA } = useRMA()

    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState("")

    const [rma, setRMA] = React.useState({
        rmaNumber: "",
        deviceName: "",
        deviceSerialNumber: "",
        status: "New",
        reason: ""
    })

    useEffect(() => {
        const fetchRMA = async () => {
            const response = await getRMADetails(rmaNumber)
            if (response) {
          
                setLoading(false)
                setError("")
                setRMA(response)
            } else {
                console.error("Error fetching RMA details")
                setError("Error fetching RMA details")
            }
        }
        fetchRMA()
    }, [rmaNumber])


    if(loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h2 className='font-bold text-2xl'>Loading...</h2>
            </div>
        )
    }

    if(error) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <h2 className='font-bold text-2xl'>Error: {error}</h2>
            </div>
        )
    }
    const handleRmaUpdateSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await editRMA(rma.rmaNumber, rma)
            console.log(response)
            if (response) {
                setRMA({
                    rmaNumber: "",
                    deviceName: "",
                    deviceSerialNumber: "",
                    status: "New",
                    reason: ""
                })
                navigate(-2)
            }
        }
        catch (error) {
            console.error("Error updating RMA:", error)
        }
    }



  return (
    <div>
        <div className='w-full flex justify-between items-center'>
            <h2 className='font-bold text-2xl'>Edit RMA</h2>
        </div>

        <div className='bg-white px-4 py-8 rounded-lg mt-4 shadow-md w-[720px]'>
        <form onSubmit={handleRmaUpdateSubmit} className='flex flex-col gap-y-4'>
          <div className='flex w-full gap-x-4 items-center'>
            <label className='font-semibold text-slate-700' htmlFor="rmaNumber">RMA Number</label>
            <input
              type="text"
              id="rmaNumber"
              name="rmaNumber"
              placeholder="Enter RMA number"
              required
              value={rma.rmaNumber}
              onChange={(e) => setRMA({ ...rma, rmaNumber: e.target.value })}
              className='flex-1 border border-slate-300 rounded-sm px-2 py-1'
            />
          </div>
          <div className='flex w-full gap-x-4 items-center'>
            <label className='font-semibold text-slate-700' htmlFor="deviceName">Device Name</label>
            <input
              type="text"
              id="deviceName"
              name="deviceName"
              placeholder="Enter device name"
              required
              value={rma.deviceName}
              onChange={(e) => setRMA({ ...rma, deviceName: e.target.value })}
              className='flex-1 border border-slate-300 rounded-sm px-2 py-1'
            />
          </div>
          <div className='flex w-full gap-x-4 items-center'>
            <label className='font-semibold text-slate-700' htmlFor="deviceSerialNumber">Device Serial Number</label>
            <input
              type="text"
              id="deviceSerialNumber"
              name="deviceSerialNumber"
              placeholder="Enter device serial number"
              required
              value={rma.deviceSerialNumber}
              onChange={(e) => setRMA({ ...rma, deviceSerialNumber: e.target.value })}
              className='flex-1 border border-slate-300 rounded-sm px-2 py-1'
            />
          </div>
          <div className='flex w-full gap-x-4 items-start'>
            <label className='font-semibold text-slate-700' htmlFor='reason'>Reason</label>
            <textarea
              id='reason'
              name='reason'
              placeholder='Enter reason for RMA'
              required
              value={rma.reason}
              onChange={(e) => setRMA({ ...rma, reason: e.target.value })}
              className='flex-1 border border-slate-300 rounded-sm px-2 py-1 resize-none h-32'
            ></textarea>
          </div>
          <div className='flex justify-end gap-x-4'>
          <Button variant="outline" type='button' onClick={()=>navigate(-1)} className='px-8'>Cancel</Button>
          <Button type='submit' className=' px-8'>Save</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RMAEdit