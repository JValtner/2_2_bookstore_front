import React from "react"
import { useForm } from 'react-hook-form'
import "../styles/style.scss"

const BookForm = ({ addMovie, editMovie, editingMovie }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({mode: "onChange"})
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
  <label>
    Naslov:
    <input 
      type="text" 
      {...register('movieName', { 
        required: 'Unesite naslov filma',
        minLength: { value: 3, message: 'Naziv mora imati najmanje 3 karaktera' }
      })} 
    />
    {errors.naslovFilma && <p style={{ color: 'red' }}>{errors.naslovFilma.message}</p>}
  </label>
  <br />

  <label>
    Sala:
    <input 
      type="number"
      {...register('movieHall', { 
        required: 'Izaberite salu',
        min: { value: 1, message: 'Sala mora biti između 1 i 12' },
        max: { value: 12, message: 'Sala mora biti između 1 i 12' }
      })} 
    />
    {errors.salaProjekcijeFilma && <p style={{ color: 'red' }}>{errors.salaProjekcijeFilma.message}</p>}
  </label>
  <br />

  <label>
    Cena:
    <input 
      type="number"
      step="0.01" 
      {...register('moviePrice', { 
        required: 'Unesite cenu',
        min: { value: 1, message: 'Cena mora biti pozitivna' },
        max: { value: 500, message: 'Cena ne može biti veća od 500' }
      })} 
    />
    {errors.cenaFilma && <p style={{ color: 'red' }}>{errors.cenaFilma.message}</p>}
  </label>
  <br />

  <label>
    Url postera:
    <input 
      type="text" 
      {...register('moviePoster', { required: 'Unesite Url' })} 
    />
    {errors.urlPosteraFilma && <p style={{ color: 'red' }}>{errors.urlPosteraFilma.message}</p>}
  </label>
  <br />

  <button type="submit">{editingMovie ? "Izmeni" : "Dodaj"}</button>
  <button type="button" onClick={() => reset()}>Obriši</button>
  <hr />
</form>

  )
}

export default BookForm
