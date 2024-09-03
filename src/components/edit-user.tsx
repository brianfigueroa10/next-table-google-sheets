'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loading from './ui/loading'

const EditUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const param = usePathname()
  const id = param.split('/').pop()
  console.log(typeof id)

  const [data, setData] = useState({
    nombre: '',
    puesto: '',
    area: '',
    contratacion: '',
    sueldo: '',
    estado: '',
    email: '',
    celular: '',
    ubicacion: '',
  })
  const router = useRouter()
  const getData = async () => {
    try {
      const res = await fetch(
        `https://sheet.best/api/sheets/a132bcfc-07b0-4318-845d-9f63ee21d259/${id}`
      )
      const data = await res.json()
      setData(data[0])
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `https://sheet.best/api/sheets/a132bcfc-07b0-4318-845d-9f63ee21d259/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      if (res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(data.contratacion)
  return (
    <section className="hero mt-24 p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl  font-bold mb-4">Editar Empleado</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-12 min-h-96 justify-end">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <div className="flex flex-col text-start gap-1">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  required
                  type="text"
                  name="nombre"
                  value={data.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col text-start gap-1">
                <Label htmlFor="puesto">Posición</Label>
                <Input
                  required
                  type="text"
                  name="puesto"
                  value={data.puesto}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col text-start gap-1">
                <Label htmlFor="area">Área</Label>
                <Input
                  required
                  type="text"
                  name="area"
                  value={data.area}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col text-start gap-1">
                <Label htmlFor="contratacion">Fecha de Ingreso</Label>
                <Input
                  required
                  type="date"
                  name="contratacion"
                  value={data.contratacion}
                  className="flex content-between "
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col text-start gap-1">
                <Label htmlFor="sueldo">Salario</Label>
                <Input
                  required
                  type="tel"
                  name="sueldo"
                  value={data.sueldo}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col text-start gap-1">
                <Label htmlFor="estado">Estado</Label>
                <select
                  required
                  name="estado"
                  className=" flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm "
                  onChange={handleChange}
                  value={data.estado}>
                  <option value="" disabled>
                    Seleccione el estado
                  </option>
                  <option value="Activo">Activo</option>
                  <option value="Licencia">Licencia</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div className="flex flex-col text-start gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  required
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col text-start gap-1">
                <Label htmlFor="celular">Teléfono</Label>
                <Input
                  required
                  type="number"
                  name="celular"
                  value={data.celular}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col text-start gap-1">
                <Label htmlFor="ubicacion">Ubicación</Label>
                <select
                  required
                  name="ubicacion"
                  value={data.ubicacion}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  //value={formData.ubicacion}
                >
                  <option value="" disabled>
                    Seleccione la ubicación
                  </option>
                  <option value="Oficina Princial">Oficina Principal</option>
                  <option value="Sucursal Norte">Sucursal Norte</option>
                  <option value="Remoto">Remoto</option>
                </select>
              </div>
            </div>
            <Button type="submit" variant={'default'}>
              Enviar
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}

export default EditUser
