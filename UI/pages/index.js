// React
import {useEffect, useState} from "react";
// Next
import Head from 'next/head'
// MUI
import {Avatar, Box, CircularProgress,Chip , Autocomplete, TextField } from "@mui/material";


// Home
export default function Home() {

    // Initializing Loader
    const [loading, setLoading] = useState(true);

    // Initializing List
    const [list, setList] = useState([]);

    // Using useEffect Hook to make async request
    useEffect(() => {

        // Initialising function
        const fetchCountryList = async () => {

            // Setting loader as true
            setLoading(true)
            try {

                // Using fetch api to make http request
                const response = await fetch("http://127.0.0.1:5000/getcountrylist");

                // converting response into json
                const jsonResponse = await response.json();

                // checking if everything is fine
                if (response.status === 200) {

                    // updating list
                    setList(jsonResponse.list);

                    // Setting loader as false
                    setLoading(false)
                }
            } catch (e) {

                // Displaying error
                console.error("An error has been occurred.")
                setLoading(false)
            }
        }

        // Calling fetchCountryList function
        fetchCountryList();
    }, [])
    return (<div>

        {/* Header */}
        <Head>
            <title>Simple country flag select</title>
            <meta name="description" content="Internshala Quiz"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        {/* Main Section */}
        <Box height={"80vh"} width={"50vw"} marginX={"auto"} marginY={"10vh"}>

            {/* For Loader */}
            {loading && <CircularProgress/>}

            {/* For List */}
            {!loading && list && <Autocomplete
                multiple
                id="country"
                options={list}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) =>
                    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        loading="lazy"
                        width="20"
                        src={option.image}
                        alt={option.name}
                    />
                    {option.name}
                    </Box>
            }

                renderTags={(tagValues = list, getTagProps) => tagValues.map((option, index) => (<Chip
                    avatar={<Avatar alt="Flag" src={option.image}/>}
                    label={option.name}
                    key={index}
                    {...getTagProps({index})}
                    variant={"outlined"}
                    color={"info"}
                />))}

                renderInput={(params) => (<TextField
                    {...params}
                    label="Choose a country"
                />)}
            />}
        </Box>
    </div>)
}
