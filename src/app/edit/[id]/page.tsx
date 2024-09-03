import EditUser from '@/components/edit-user'
import { buttonVariants } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { Link } from 'next-view-transitions'
import React from 'react'

export default function page() {
  return (
    <div>
      <Link href="/" className={buttonVariants({ variant: 'link' })}>
        <ArrowLeftCircle className="mr-2 size-5" />
        Volver
      </Link>
      <EditUser />
    </div>
  )
}
