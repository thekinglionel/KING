import { Box,Stack, Typography,TextField,Button,  } from '@mui/material'
import React,{useEffect } from 'react';
import { useForm} from "react-hook-form";
import axios  from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import {toast} from 'react-hot-toast';

export default function Connexion() {
  const navigate= useNavigate ();
  useEffect(()=>{
    if (localStorage.getItem("utilisateur"))
    {
      navigate("/");
    }
  });
    const {handleSubmit, register, 
        formState: {errors},
    } = useForm();
    const onSubmit = (data) => { 
      console.log(data);
      axios
      .get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}&motDePasse=${data.motDePasse}`)
        .then(res =>{
       if (Array.isArray(res.data) && res.data.length > 0) {
           localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));
          navigate("/");
          toast.success("connexion reussie");
        } else  {
         toast.error("mots de passe ou identifiant incorrect");
          }
        })
        .catch(err => {
          console.error(err);
          toast.error("Une erreur est survenue lors de la connexion");
          
        
        });
    };
  return (
     <Stack
       alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      height={"100vh"}
     backgroundColor={"#f5f5f5"}
   > 
    <Box
     maxWidth={300}
     width={'100%'}
    sx={{

        backgroundImage:"url('/public/king2.jpg')",
        backgroundPosition: "center",
         padding:4,
         minHeight: "400px",
     }}>
        <Typography variant='h5' color='white' fontWeight='bold'> 
            Connexion
         </Typography>
         <form style={{
            marginTop :120, 
            }}
            onSubmit={handleSubmit(onSubmit)}>
              
            <Stack 
            direction={'column'} 
            gap={2}>
          <TextField 
         id="outlined-basic" 
         label="veuillez saisir votre adresse mail" 
         variant="outlined" 
         fullWidth
         size='small'
         type="email"
          backgroundColor="rgba(50,50,50,1)"
           InputProps={{
          style: { color : 'black', bacgroundColor: '#e0f7fa'}
         }}
         InputLabelProps={{
          style:{color : 'white'}
         }}
         {...register("mailUtilisateur", {
           required: "veuillez saisir une adresse mail",
           pattern:"/^\w+([.-]?\w+)*@w+([.-]?w+)*(.w{2,3})+$/",
           
         })}
            sx={{
              backgroundColor: "rgba(50,50,50,0.4)",
            }}
         />
        <TextField 
         id="outlined-basic" 
         label="veuillez saisir un mots de passe" 
         variant="outlined" 
         fullWidth
         size='small'
         type='password'
           InputProps={{
          style: { color : 'black', bacgroundColor: '#e0f7fa'}
         }}
         InputLabelProps={{
          style:{color : 'white'}
         }}
         {...register("motDePasse",{required: "veuillez saisir un mot de passe",
            minLength: {value:6, message : 'veuillez saisir un mot de passe de plus de 6 caractère'}})}
            sx={{
              backgroundColor: "rgba(50,50,50,0.4)",
            }}
         />

            </Stack>
            <Button variant="contained"
            sx={{
                marginTop: 2,

            }}
            type='submit'
            > Connexion
            </Button>
            <Typography paddingTop= {2} style={{color:'white',
              margin:0,
              fontSize: "18px",
              backgroundColor: "rgba(50,50,50,0.)",
              
              display: "inline-block",
              padding: "1px",
              marginTop: 10,
              fontSize: "14px",
            }}>
              voulez-vous créer un compte ?{" "} 
              <Link style ={{color:'#00ffff'}}
              to="/Inscription"> cliquez ici </Link>
            </Typography>  
         </form>
    </Box>
  </Stack>
)}

