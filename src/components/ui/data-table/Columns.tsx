'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '../checkbox'
import { Link } from 'next-view-transitions'
import { handleDelete } from '@/components/home'
const transformarFecha = (fecha: string): string => {
  const [year, month, day] = fecha.split('-')
  return `${day}/${month}/${year}`
}
export type Worker = {
  id: string
  name: string
  position: string
  area: string
  date: string
  salary: string
  status: string
  email: string
  phone: string
  ubicacion: string
}

export const columns: ColumnDef<Worker>[] = [
  {
    accessorKey: 'contratacion',
    header: 'Fecha de Ingreso',
    cell: (info: any) => transformarFecha(info.getValue()),
  },

  {
    accessorKey: 'nombre',
    header: 'Nombre',
  },
  {
    accessorKey: 'puesto',
    header: 'Posición',
  },
  {
    accessorKey: 'area',
    header: 'Area',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'celular',
    header: 'Celular',
  },
  {
    accessorKey: 'sueldo',
    header: () => <div className="text-right">Sueldo</div>,
    cell: ({ row }) => {
      const salary = row.getValue('sueldo')
      const amount = parseFloat(salary as string)
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'ubicacion',
    header: 'Ubicación',
  },
  {
    accessorKey: 'estado',
    header: 'Estado',
    cell: ({ row }) => {
      const status = row.getValue('estado') as React.ReactNode

      return (
        <div
          className={`flex items-center justify-center p-1 rounded-full ${
            status === 'Activo'
              ? 'bg-green-600 text-white'
              : status === 'Licencia'
              ? 'bg-yellow-400'
              : status === 'Inactivo'
              ? 'bg-red-600 text-white'
              : ''
          }`}>
          {status}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.id

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <Link
              href={`/edit/${payment}/`}
              className={`${buttonVariants({ variant: 'ghost' })} w-full`}>
              Editar
            </Link>

            <Button
              variant={'ghost'}
              className="w-full text-red-600 hover:text-red-700"
              onClick={() => handleDelete(Number(payment))}>
              Eliminar
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
