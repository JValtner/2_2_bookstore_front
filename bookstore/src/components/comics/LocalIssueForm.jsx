import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { createLocalIssue } from "../../service/comics.service"
import "../../styles/style.scss"

const LocalIssueForm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const fetchedIssue = location.state?.issue

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ mode: "onSubmit" })

    // Pre-fill form fields if issue data exists
    useEffect(() => {
        if (fetchedIssue) {
            setValue("vineId", fetchedIssue.vineId || fetchedIssue.id)
            setValue("name", fetchedIssue.name || "")
            setValue("deck", fetchedIssue.deck || "")
            setValue("description", fetchedIssue.description || fetchedIssue.deck || "")
            setValue("issue_number", fetchedIssue.issue_number || 1)
            setValue("date_added", fetchedIssue.date_added?.split(" ")[0] || "")
            setValue("date_last_updated", fetchedIssue.date_last_updated?.split(" ")[0] || "")
            setValue("site_detail_url", fetchedIssue.site_detail_url || "")
            setValue("numberOfPages", fetchedIssue.numberOfPages || 0)
            setValue("price", fetchedIssue.price || 0)
            setValue("availableCopies", fetchedIssue.availableCopies || 0)
        }
    }, [fetchedIssue, setValue])

    // Submit handler adjusted for nested DTO
    const onSubmit = async (data) => {
        const dto = {
            vineId: data.vineId,
            name: data.name,
            deck: data.deck,
            description: data.description,
            issue_number: Number(data.issue_number),

            volume: {
                id: fetchedIssue?.volume?.id || 0,
                name: fetchedIssue?.volume?.name || "",
                api_detail_url: fetchedIssue?.volume?.api_detail_url || "",
                site_detail_url: fetchedIssue?.volume?.site_detail_url || "",
            },

            image: {
                icon_url: fetchedIssue?.image?.icon_url || "",
                medium_url: fetchedIssue?.image?.medium_url || "",
                small_url: fetchedIssue?.image?.small_url || "",
                super_url: fetchedIssue?.image?.super_url || "",
                thumb_url: fetchedIssue?.image?.thumb_url || "",
                tiny_url: fetchedIssue?.image?.tiny_url || "",
                original_url: fetchedIssue?.image?.original_url || "",
            },

            site_detail_url: data.site_detail_url,
            date_added: data.date_added,
            date_last_updated: data.date_last_updated,
            numberOfPages: Number(data.numberOfPages),
            price: Number(data.price),
            availableCopies: Number(data.availableCopies),
        }


        try {
            await createLocalIssue(dto)
            navigate(`/comics/issues-search?volume=${dto.volume.id}`, {
                state: { message: "Izdanje uspešno dodato u lokalnu bazu." },
            })
        } catch (error) {
            console.error("Greška prilikom čuvanja lokalnog izdanja:", error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="issue-form">
            <h2>Dodaj lokalno izdanje</h2>

            <label>
                Naziv izdanja:
                <input type="text" {...register("name", { required: "Unesite naziv" })} />
                {errors.name && <p className="error">{errors.name.message}</p>}
            </label>

            <label>
                Broj izdanja:
                <input
                    type="number"
                    {...register("issue_number", { required: "Unesite broj izdanja" })}
                />
                {errors.issue_number && <p className="error">{errors.issue_number.message}</p>}
            </label>

            <label>
                Kratak opis (deck):
                <textarea {...register("deck")} />
            </label>

            <label>
                Detaljan opis:
                <textarea {...register("description")} />
            </label>

            <label>
                Datum dodavanja (API):
                <input type="date" {...register("date_added")} />
            </label>

            <label>
                Poslednje ažuriranje:
                <input type="date" {...register("date_last_updated")} />
            </label>

            <label>
                Broj strana:
                <input
                    type="number"
                    {...register("numberOfPages", { required: "Unesite broj strana" })}
                />
                {errors.numberOfPages && <p className="error">{errors.numberOfPages.message}</p>}
            </label>

            <label>
                Cena:
                <input
                    type="number"
                    step="0.01"
                    {...register("price", { required: "Unesite cenu" })}
                />
                {errors.price && <p className="error">{errors.price.message}</p>}
            </label>

            <label>
                Dostupne kopije:
                <input
                    type="number"
                    {...register("availableCopies", { required: "Unesite broj kopija" })}
                />
                {errors.availableCopies && <p className="error">{errors.availableCopies.message}</p>}
            </label>

            <label>
                Link:
                <input type="text" {...register("site_detail_url")} />
            </label>

            {fetchedIssue?.image?.medium_url && (
                <div className="image-preview">
                    <img
                        src={fetchedIssue.image.medium_url}
                        alt={fetchedIssue.name}
                        style={{
                            maxWidth: "200px",
                            marginTop: "10px",
                            borderRadius: "6px",
                            boxShadow: "0 0 6px rgba(0,0,0,0.2)",
                        }}
                    />
                </div>
            )}

            <div className="form-actions">
                <button type="submit">Sačuvaj</button>
            </div>
        </form>
    )
}

export default LocalIssueForm
