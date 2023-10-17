import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const AdminView = () => {
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

    async function deleteProduct(id) {

        //confirm before deleting
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        await axios.delete("http://localhost:3001/api/v1/pets/" + id, {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Button 
            sx={{
                mb: 4,
                // ml: 4,
            }}
            variant="contained" color="primary" href="/addpet"> 
                Add New Pet
            </Button>
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

                                {user.userType === "b2 uyer" ? <Button size="small">Order</Button> :
                                    <>
                                        <Button size="small"
                                            onClick={() => { window.location.href = "/addpet/" + card._id }}
                                        >Edit</Button>
                                        <Button size="small"
                                            onClick={() => { deleteProduct(card._id) }}
                                        >Delete</Button>
                                    </>}


                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default AdminView;