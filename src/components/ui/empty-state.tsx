'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from './Heading'
import Button from './button'

interface EmptyStateProps {
    title?: string,
    subtitle?: string,
    showReset?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No exact matches',
    subtitle = 'try changing or removing some of your fiters.',
    showReset
}) => {
    const router = useRouter();
  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
        <Heading
            title={title}
            subTitle={subtitle}
         />
         <div className='w-48 mt-4'>
            {showReset && (
                <Button
                    outline
                    label='Remove all fiters'
                    onClick={() => router.push('/')}
                 />
            )}
         </div>
    </div>
  )
}

export default EmptyState