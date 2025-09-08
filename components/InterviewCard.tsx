import React from 'react'
import dayjs from 'dayjs';
import { Button } from "./ui/button";
import Link from "next/link";
import Image from 'next/image';
import DisplayTechIcons from "./DisplayTechIcons";
import { getRandomInterviewCover } from "@/lib/utils";

const interviewCard = ({ interviewId, userId, role, type, techstack, createdAt }: InterviewCardProps) => {
  const feedback: Feedback | null = null;
  const normalizedType = /mix/gi.test(type) ? 'Mixed' : type;
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");
  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
      <div className="card-interview">
        <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600'>
          <p className="badge-text ">{normalizedType}</p>
        </div>

        <Image src={getRandomInterviewCover()} alt="cover-image"
          width={90}
          height={90}
          className="rounded-full object-fit size-[90px]" />

        <h3 className='captalize mt-5'>{role} Interview</h3>

        <div className='flex flex-row gap-5 mt-3'>
          <div className='flex flex-row gap-2'>
            <Image src='/calendar.svg' width={22} height={22} alt='calendar' />
            <p>{formattedDate}</p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p>{feedback?.totalScore || "---"}/100</p>
          </div>
        </div>
         <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
      
       <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
           </div>    
    </div>
  )
}

export default interviewCard
