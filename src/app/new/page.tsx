'use client'
import React, { useState } from 'react'

const FormPage: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = {
      values: [[name, email, phone, country]],
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      includeValuesInResponse: true,
    }

    try {
      const response = await fetch(
        'https://api.apico.dev/v1/rwUAN5/1zDmcgGwPsWpKK_9-pAmhxfO5ZojhCojVfIeFqNJqLKc/values/Sheet1:append',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      const result = await response.json()
      console.log('Response:', result)

      if (response.ok) {
        setMessage('Datos enviados con éxito')
      } else {
        setMessage(`Error al enviar los datos: ${result.error}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Error al enviar los datos')
    }
  }

  return (
    <div>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>País:</label>
          <input
            type="text"
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default FormPage
