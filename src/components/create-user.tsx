'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { api } from '../../api'

const CreateUser = () => {
  const [data, setData] = useState({
    nombre: '',
    posicion: '',
    area: '',
    fecha: '',
    salario: '',
    estado: '',
    email: '',
    telefono: '',
    ubicacion: '',
  })
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const res = await fetch(
        'https://sheet.best/api/sheets/a132bcfc-07b0-4318-845d-9f63ee21d259',
        {
          method: 'POST',
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

  return (
    <section className="hero mt-24 p-8">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Crear Empleado</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="flex flex-col text-start gap-1">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                required
                type="text"
                name="nombre"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-start gap-1">
              <Label htmlFor="puesto">Posición</Label>
              <Input
                required
                type="text"
                name="puesto"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-start gap-1">
              <Label htmlFor="area">Área</Label>
              <Input required type="text" name="area" onChange={handleChange} />
            </div>
            <div className="flex flex-col text-start gap-1">
              <Label htmlFor="contratacion">Fecha de Ingreso</Label>
              <Input
                required
                type="date"
                name="contratacion"
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
                //value={formData.estado}
              >
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
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-start gap-1">
              <Label htmlFor="celular">Teléfono</Label>
              <Input
                required
                type="number"
                name="celular"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col text-start gap-1">
              <Label htmlFor="ubicacion">Ubicación</Label>
              <select
                required
                name="ubicacion"
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
      </div>
    </section>
  )
}

export default CreateUser
