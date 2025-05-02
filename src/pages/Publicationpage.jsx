
import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, List, ListItem } from '@mui/material';

const PublicationPage = () => {
    const [publications, setPublications] = useState([]);
    const [newPublication, setNewPublication] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    // Simuler l'utilisateur courant (vous pouvez le changer pour simuler différents utilisateurs)
    const simulatedUserId = 2; // Bob

    useEffect(() => {
        // Récupérer les publications depuis l'API
        fetch('http://localhost:3000/publications')
            .then(response => response.json())
            .then(data => setPublications(data));

        // Récupérer les utilisateurs depuis l'API
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                const user = data.find(u => u.id === simulatedUserId);
                setCurrentUser(user);
            });
    }, []);

    const handleAddPublication = () => {

        if (newPublication.trim() && currentUser?.role === 'writer') {
            const publication = { content: newPublication.trim() };

            fetch('http://localhost:3000/publications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(publication),
            })
            .then(response => response.json())
            .then(data => {
                setPublications(prev => [...prev, data]);
                setNewPublication("");
            });
        }
    };

    return (
        <Paper sx={{ padding: 2 }}>
            <h1>Publications</h1>
            <List>
                {publications.map((pub) => (
                    <ListItem key={pub.id}>{pub.content}</ListItem>
                ))}
            </List>
            {currentUser?.role === 'writer' && (
                <div>
                    <TextField

                        label="Nouvelle publication"
                        variant="outlined"
                        value={newPublication}
                        onChange={(e) => setNewPublication(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleAddPublication}>Ajouter</Button>
                </div>
            )}
            {currentUser?.role === 'reader' && (
                <p>Vous avez accès à la lecture uniquement.</p>
            )}
        </Paper>
    );
};

export default PublicationPage;
