import React from 'react'

import dateformat from 'dateformat'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'



const RMACard = ({ rma }) => {
  return (
    <Link to={rma.rmaNumber} state={{rma:rma}} className="no-underline">
      <Card className="gap-4">
        <CardHeader>
          <CardTitle className="text-lg font-bold bg-slate-200  p-2 mb-2 rounded-md">{rma.rmaNumber}</CardTitle>
          <Badge className="bg-gray-600">{rma.status}</Badge>
        </CardHeader>
        <CardContent>
          <p className='text-sm truncate line-clamp-1 mb-8'>{rma.reason}</p>
          <div className='flex justify-between items-center mt-2'>
            <p className='text-slate-600 text-sm'><span className='block font-semibold'>Device </span>{rma.deviceName}</p>
            <p className='text-slate-600 text-sm'><span className='block font-semibold'>Serial Number </span> {rma.deviceSerialNumber}</p>

          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className='text-xs text-gray-600 italic mt-4'>Created: {dateformat(rma.requestedOn, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default RMACard