'use client'
import { Link } from 'next-view-transitions'
import React, { useEffect, useState } from 'react'
import { buttonVariants } from './ui/button'
import { Plus } from 'lucide-react'
import { DataTable } from './ui/data-table/data-table'
import { columns, Worker } from './ui/data-table/Columns'
import { useRouter } from 'next/navigation'
import Loading from './ui/loading'

export default function HomePage() {
  const [data, setData] = useState<Worker[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    try {
      const res = await fetch(
        'https://sheet.best/api/sheets/a132bcfc-07b0-4318-845d-9f63ee21d259?_format=index'
      )
      const data = await res.json()
      setData(Object.keys(data).map(key => data[key]))
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold mb-4">Empleados</h1>
          <Link
            href="/create-user"
            className={buttonVariants({ variant: 'default' })}>
            <Plus className="mr-2 size-5" />
            Crear Empleado
          </Link>
        </div>
        <div className="min-h-96">
          {isLoading ? (
            <Loading />
          ) : (
            <DataTable columns={columns} data={data as Worker[]} />
          )}
        </div>
      </div>
    </main>
  )
}

export const handleDelete = async (rowIndex: number) => {
  try {
    const res = await fetch(
      `https://sheet.best/api/sheets/a132bcfc-07b0-4318-845d-9f63ee21d259/${rowIndex}`,
      {
        method: 'DELETE',
      }
    )
    if (res.ok) {
      window.location.reload()
    }
  } catch (error) {
    console.log(error)
  }
}
