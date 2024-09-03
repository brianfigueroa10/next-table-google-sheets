'use client'

import {
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import React from 'react'
import { Input } from '../input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { DataTableViewOptions } from './data-table-view-option'
import { DataTablePagination } from './pagination'
import { Worker } from './Columns'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  const locationes = React.useMemo(() => {
    if (!data) return []
    const locations = data.map(item => (item as Worker).ubicacion)
    return Array.from(new Set(locations))
  }, [data])

  const handleLocationFilter = (location: string | null) => {
    table.getColumn('ubicacion')?.setFilterValue(location)
  }
  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Buscar por Nombre..."
          value={(table.getColumn('nombre')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('nombre')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center justify-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto hidden h-8 lg:flex"
                size="sm">
                Filtrar por Ubicación
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuCheckboxItem
                checked={
                  table.getColumn('ubicacion')?.getFilterValue() === null
                }
                onClick={() => handleLocationFilter(null)}>
                Mostrar Todos
              </DropdownMenuCheckboxItem>
              {locationes.map(location => (
                <DropdownMenuCheckboxItem
                  key={location}
                  checked={
                    table.getColumn('ubicacion')?.getFilterValue() === location
                  }
                  onClick={() => handleLocationFilter(location)}>
                  {location}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
