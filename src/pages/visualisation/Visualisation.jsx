/*import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import {Box,Stack, Typography,Avatar} from "@mui/material";
 import axios  from 'axios';
import {toast} from 'react-hot-toast';

export default function Visualisation() {
 const [publications, setPublications] = React.useState([]);  
  const navigate  = useNavigate();
    useEffect(()=>{
      if (!localStorage.getItem("utilisateur")){
        navigate("/connexion");
      }
      axios.get(`http://localhost:3000/publications`)
       .then((res) => {
      setPublications(res.data);
       })
    }, [navigate]);
  return (
  <Box>
    <Navbar/>
    <Box>
      {publications.map((publication) =>( <Box>
        <Stack>
          <Avatar src={publication.photoUtilisateur}/>
          <Typography>{publication.auteur} </Typography>
        </Stack>
          <Typography>{publication.textePublication} </Typography>
          <img src={publication.imagePublication}/>
    </Box>
      ))}
  </Box>
  </Box>
  );
}*/
