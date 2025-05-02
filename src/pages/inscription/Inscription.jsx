import { Box,Stack, Typography,TextField,Button } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";
import axios  from 'axios';
import { useNavigate } from 'react-router-dom'; 
import {toast} from 'react-hot-toast';



export default function Inscription() {
  
  const navigate= useNavigate ();
    const {handleSubmit, register, 
        formState: {errors},
    } = useForm();
    const onSubmit = (data) => {
      if (data.motDePasse !== data.motDePasseConfirmation) {
        toast.error("les mots de passe ne correspondent pas ");
      }
        else 
           {  
            axios.get(`http://localhost:3000/utilisateurs?mailUtilisateur=${data.mailUtilisateur}`) .then((res)=>{
              if (res.data.length > 0) {
                toast.error("echec de creation, un compte existe deja avec cette adresse mail");
              } else{            axios
                .post("http://localhost:3000/utilisateurs",data)
                 .then((res) => {
                   console.log(res);
                   toast.success('reussi');
                   navigate("/connexion");
                 })
                  .catch((err) => {
                   console.log(err);
                   toast.error('une erreur est survenu');
                 });}
            });

      }
    };
  return (
     <Stack 
   
  alignItems={'center'}
  justifyContent={'center'}
  width={'100%'}
  height={'100vh'}
  backgroundColor={"#f5f5f5"}
 >
  
    <Box
     maxWidth={300}
     width={'100%'}
     height={"70%"}
    sx={{
        backgroundImage:'url("/public/king.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor:"#fff",
        padding:4,
        borderRadius: 2,
        minHeight: '400px'
         
     }}>
        <Typography variant='h6' style={{lineHeight:'3',textAlign: 'center',fontWeight:'bold', fontSize:'30px', fontFamilly:'Arial, sans-serif', color:'white'}}> 
            Inscription 
         </Typography>
         <form style={{
            marginTop :-5, 
            }}
            onSubmit={handleSubmit(onSubmit)}>

              
            <Stack 
            direction={'column'} 
            gap={2}
             sx={{pt:0}}>
              { }

        <TextField 
         id="outlined-basic" 
         label="veuillez saisir votre nom" 
         variant="outlined" 
         fullWidth
         size='small'
         sx={{marginBottom:1}}
         InputProps={{
          style: { color : 'black', bacgroundColor: '#e0f7fa'}
         }}
         InputLabelProps={{
          style:{color : 'white'}
         }}
         {...register("nomUtilisateur",{required: "veuillez saisir un nom",
          minLength: {value:1, message: 'veuillez saisir un nom de plus de 1 caractère'}})}
           sx=
             {{
              backgroundColor: "rgba(50,50,50,0.4)",
            }}
         />
          <TextField 
         id="outlined-basic" 
         label="veuillez saisir votre adresse mail" 
         variant="outlined" 
         fullWidth
         size='small'
         type="email"
         InputLabelProps={{
          style:{color:'white'}
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
         InputLabelProps={{
         style: {color:'white'}
         }}
         {...register("motDePasse",{required: "veuillez saisir un mot de passe",
            minLength: {value:6, message : 'veuillez saisir un mot de passe de plus de 6 caractère'}})}
              sx={{
              backgroundColor: "rgba(50,50,50,0.4)",
            }}
         />
       <TextField 
         id="outlined-basic" 
         label="veuillez confirmer le mots de passe" 
         variant="outlined" 
         fullWidth
         size='small'
         type='password'
        
         InputLabelProps={{
          style:{color:'white'}
         }}
         {...register("motDePasseConfirmation",{required: "veuillez saisir un mot de passe",
            minLength: {value:6, message : 'veuillez saisir un mot de passe de plus de 6 caractère'}})}
            sx={{
              backgroundColor: "rgba(50,50,50,0.4)",
            }}
         />
            </Stack>
            <Button variant="contained"  
            sx={{
              
              display:'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              
              backgoundColor:'#4E3B31',
              padding:'2px 12px',
              paddingLeft:'70px',
              paddingRight:'50px',
                marginTop: 4,
                borderRadius:'8px',
                backgroundColor: '#3C2A25',
              textAlign:'center',
              
          
            }}
            type = "submit"
            >  
             Inscription &nbsp; 
            </Button>
            

         </form>
    </Box>
    
  </Stack>
)}
