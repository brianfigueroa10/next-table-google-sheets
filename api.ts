import slugify from 'slugify'
import { z } from 'zod'

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string(),
  area: z.string(),
  date: z.string(),
  salary: z.string(),
  status: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string(),
})

export const api = {
  list: async () => {
    const timestamp = new Date().getTime()
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/1n5G1b_RsEbkx1e05xSGHvGIxHFlekfL3ANmtGcutyg4/pub?output=tsv&t=${timestamp}`,
      {
        cache: 'no-cache',
      }
    ).then(res => res.text())
    const rows = response
      .split('\n')
      .slice(1)
      .map(row => row.trim().split('\t')) //evita los headers

    return rows.map(
      ([
        temporal,
        name,
        position,
        area,
        date,
        salary,
        status,
        email,
        phone,
        location,
      ]) => {
        return projectSchema.parse({
          id: slugify(name, { lower: true }),
          temporal,
          name,
          position,
          area,
          date,
          salary,
          status,
          email,
          phone,
          location,
        })
      }
    )
  },
}
