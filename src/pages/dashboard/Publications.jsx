import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import axios from "axios";
import { Box, Stack, Typography, Avatar, TextField, Button } from "@mui/material";

export default function Publications() {
    const [comments, setComments] = useState({});
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/publications`)
            .then((res) => {
                setPublications(res.data);
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des publications:", err);
            });
    }, []);

    const handleCommentChange = (pubId, value) => {
        setComments({
            ...comments,
            [pubId]: value,
        });
    };

    const handleAddComment = (pubId) => {
        const newComment = comments[pubId];
        setPublications(prevPublications => 
            prevPublications.map(publication => 
                publication.id === pubId 
                    ? { ...publication, comments: [...(publication.comments || []), newComment] }
                    : publication
            )
        );
        setComments({
            ...comments,
            [pubId]: '',
        });
    };

    const handleLike = (pubId) => {
        const updatedPublications = publications.map(publication => {
            if (publication.id === pubId) {
                return { ...publication, likePublication: publication.likePublication + 1 };
            }
            return publication;
        });
        setPublications(updatedPublications);
    };

    return (
        <Box bgcolor={'lightblue'} padding={2}>
            <Navbar />
            <Typography variant="h4" align="center" gutterBottom>
                Publications
            </Typography>
            <Box width={'60%'} margin={'auto'}>
                {publications.map((publication) => (
                    <Box 
                        key={publication.id}
                        width={"100%"}
                        bgcolor={'#f9e79f'} 
                        borderRadius={4} 
                        marginBottom={3}
                        style={{ marginTop: '40px', padding: '16px' }}
                    >
                        <Stack direction={"row"} alignItems={"center"} gap={4}>
                            <Avatar src={publication.photoUtilisateur} />
                            <Typography>{publication.auteur}</Typography>
                        </Stack>
                        <Typography>{publication.textePublication}</Typography>
                        {publication.imagePublication && (
                            <img 
                                src={publication.imagePublication} 
                                style={{ width: '100%', borderRadius: '20px', marginTop: '10px', objectFit: 'cover' }} 
                                alt="Publication" 
                            />
                        )}
                        <Typography variant="caption" color="textSecondary" style={{ marginTop: '10px' }}>
                            {/* Format 24 heures */}
                            {new Date(publication.datePublication).toLocaleString('fr-FR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })}
                        </Typography>
                        
                    </Box>
                ))}
            </Box>
        </Box>
    );
}