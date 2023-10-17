import React, { useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const GetAll = () => {
    const user = useSelector(selectUser);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            await axios.get("http://localhost:3001/api/v1/pets/all", {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setProducts(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        getProducts();
    }, [])

   async function requestToAdopt(id) {
        await axios.post("http://localhost:3001/api/v1/adoptions", {
            pet_id: id,
            user_id: user.id,
        }, {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            alert("Request to adopt sent successfully");
            // window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
   }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
         
            <Grid container spacing={4}>
                {products.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image={"http://localhost:3001" + card.image}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Name : {card.petname}
                                </Typography>
                                <Typography>
                                    Type : {card.pettype}
                                </Typography>
                                <Typography>
                                    Breed : {card.petbreed}
                                </Typography>
                                <Typography>
                                    Age : {card.petage}
                                </Typography>
                                <Typography>
                                   Description :  {card.description}
                                </Typography>
                                <Typography>
                                    Location : {card.location}
                                </Typography>

                            </CardContent>
                            <CardActions>

                                <Button size="small"
                                onClick={() => requestToAdopt(card._id)}
                                > Request to Adopt </Button>


                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default GetAll;