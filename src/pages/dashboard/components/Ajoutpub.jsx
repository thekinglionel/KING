import React from "react";
import { useForm } from "react-hook-form";
import { Stack, TextField, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function Ajoutpub() {
    const user = JSON.parse(localStorage.getItem("utilisateur"));
    const navigate = useNavigate();  
    const { handleSubmit, register, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const publication = {
            ...data,
            idUtilisateur: user.id,
            datePublication: new Date(),
            likePublication: 0,
            auteur: user.nomUtilisateur,
        };

        axios
            .post(`http://localhost:3000/publications`, publication)
            .then((res) => {
                console.log(res.data);
                toast.success('Publication ajoutée');
                reset();
               
            })
            .catch((err) => {
                console.log(err);
                toast.error("Une erreur est survenue");
            });
    };

    return ( 
        <Stack width={'60%'} margin={'auto'}>
            <h1>Ajouter une publication</h1>
            <form style={{ marginTop: 4 }} onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={2}>
                    <TextField
                        id="texte-publication"
                        label="Veuillez saisir votre publication"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="text"
                        multiline
                        rows={4}
                        {...register("textePublication", {
                            required: "Veuillez saisir un texte",
                            minLength: { value: 6, message: 'Veuillez saisir un texte de plus de 6 caractères' }
                        })}
                    />
                    <TextField
                        id="image-publication"
                        label="Veuillez entrer une URL d'image (facultatif)"
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="text"
                        {...register("imagePublication")}
                    />
                    <Button variant="contained" type="submit" style={{ marginTop: '20px' }}>
                        Publier
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
}