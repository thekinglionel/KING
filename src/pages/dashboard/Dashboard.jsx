import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import { Box, Stack, Typography, Avatar, Button } from "@mui/material";
import Ajoutpub from './components/Ajoutpub.jsx';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
    const [publications, setPublications] = React.useState([]);  
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("utilisateur")) {
            navigate("/connexion");
        }
        axios.get(`http://localhost:3000/publications`)
            .then((res) => {
                setPublications(res.data);
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des publications :", err);
                toast.error("Une erreur est survenue lors de la récupération des publications.");
            });
    }, [navigate]);

    const addPublication = (newPublication) => {
        setPublications(prev => [newPublication, ...prev]); // Ajouter la nouvelle publication en tête
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/publications/${id}`)
            .then(() => {
                setPublications(prev => prev.filter(pub => pub.id !== id)); // Supprimer localement
                toast.success("Publication supprimée avec succès");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Une erreur est survenue lors de la suppression de la publication.");
            });
    };

    return (
        <Box 
            bgcolor={'lightblue'} 
            style={{
                backgroundImage: 'url(/path/to/your/book-image.png)', // Remplacez par le chemin de votre image
                backgroundRepeat: 'repeat', 
                backgroundSize: 'contain' 
            }} 
        >
            <Navbar />
            <Ajoutpub onAddPublication={addPublication} /> {/* Passer la fonction de rappel */}
            <Box bgcolor={'lightblue'} width={'60%'} margin={'auto'}>
                {publications.map((publication) => (
                    <Box 
                        key={publication.id} 
                        width={"100%"} 
                        bgcolor={'#98FF98'} 
                        borderRadius={4} 
                        marginBottom={3}
                        style={{ marginTop: '40px', padding: '16px' }} 
                    >
                        <Stack direction={"row"} alignItems={"center"} gap={4} marginBottom={0}>
                            <Avatar src={publication.photoUtilisateur} />
                            <Typography>{publication.auteur}</Typography>
                        </Stack>
                        <Typography>{publication.textePublication}</Typography>
                        {publication.imagePublication && ( // Vérification de l'existence de l'image
                            <img 
                                src={publication.imagePublication} 
                                style={{ width: '100%', borderRadius: '20px', marginTop: '10px', objectFit: 'cover' }} 
                                alt="Publication" 
                            />
                        )}
                        {/* Affichage de la date au format 24 heures */}
                        <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
                            {new Date(publication.datePublication).toLocaleString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}
                        </Typography>
                        <Button 
                            variant="outlined" 
                            style={{ backgroundColor: '#FFFF00', color: '#000', marginTop: '10px' }} // Jaune vif
                            onClick={() => handleDelete(publication.id)} 
                        >
                            Supprimer
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}