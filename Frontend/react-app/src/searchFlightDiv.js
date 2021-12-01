import React from "react"
import "./searchFlightDiv.css"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { useState, ReactDOM } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const airports = [
    { airportName: "LAX", city: "Los Angeles" },
    { airportName: "CAI", city: "Cairo" },
    { airportName: "JRO", city: "Arusha" }
]

const cabinOptions = [
    { class: "Buisness" },
    { class: "Economy" }
]

function SearchFlightDiv() {

    const set = name => {
        return ({ target: { value } }) => {
            setValues(oldValues => ({ ...oldValues, [name]: value }));
        }
    }

    const [inputFlyingFrom, setInputFlyingFrom] = React.useState({ airportName: "", city: "" });
    const [inputFlyingTo, setInputFlyingTO] = React.useState({ airportName: "", city: "" });

    const [values, setValues] = useState({
        outboundDate: '',
        returnDate: '',
        adults: '',
        children: '',
        cabin: 'Buisness'

    });

    const [flyingFrom, setFlyingFrom] = useState(null);
    const [flyingTo, setFlyingTo] = useState(null);
    const history = useHistory();
    const confirmSearch = async (event) => {

        const element = (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
        const flight = {};
        flight['flyingFrom'] = flyingFrom;
        flight['flyingTo'] = flyingTo;
        for (const key in values) {
            // if (values.hasOwnProperty(key)) {
            //     const element = values[key];
            // }
            flight[key] = values[key];
        }
        event.preventDefault();
        console.log(flight);
        axios.post('http://localhost:150/flight/searchFlightPassenger', flight)
            .then(
                history.push("/flightSelection")
            )
            .catch(function (error) {
                console.log(error);
            });


    }

    return (
        <div className="searchFlight" >
            <div className="flying_from searchFlightElem">
                <Autocomplete
                    id="flying-from-box"
                    options={airports}
                    value={flyingFrom}
                    defaultValue={{ airportName: "LAX", city: "Los Angeles" }}
                    onChange={(_, newVal) => {
                        setFlyingFrom(newVal);
                        console.log(newVal);
                    }}
                    // inputValue={inputFlyingFrom}
                    // onInputChange={(_, newInputValue) => {
                    //     setInputFlyingFrom(newInputValue)
                    // }}
                    isOptionEqualToValue={(option, value) => {
                        if (option.airportName === value.airportName)
                            return true;
                    }}
                    getOptionLabel={(option) => option.airportName + " " + option.city}
                    renderInput={(params) => <TextField {...params} label="Flying From" />}
                />
            </div>
            <div className="flying_to searchFlightElem">
                <Autocomplete
                    id="flying-to-box"
                    options={airports}
                    value={flyingTo}
                    defaultValue={{ airportName: "CAI", city: "Cairo" }}
                    onChange={(_, newVal) => {
                        setFlyingTo(newVal);
                        console.log(newVal);
                    }}
                    isOptionEqualToValue={(option, value) => {
                        if (option.airportName === value.airportName)
                            return true;
                    }}
                    getOptionLabel={(option) => option.airportName + " " + option.city}
                    renderInput={(params) => <TextField {...params} value={values.flyingTo} onChange={set('flyingTo')} label="Flying to" />}
                />

            </div>
            <div className="outbound date searchFlightElem">
                <label >Outbound date </label>
                <br />
                <input id="outboundDate" value={values.outboundDate} onChange={set('outboundDate')} type="date" />
            </div>
            <div className="return date searchFlightElem">
                <label >Return date </label>
                <br />
                <input id="returnDate" value={values.returnDate} onChange={set('returnDate')} type="date" />

            </div>
            <div className="cabin searchFlightElem">
                <Autocomplete
                    id="cabin-box"
                    options={cabinOptions}
                    // value={values.cabin}
                    getOptionLabel={option => option.class}
                    renderInput={(params) => <TextField {...params} value={values.cabin} onChange={set('cabin')} label="Cabin" />}
                />
            </div>
            <div className="passengers searchFlightElem">
                <div className="adults">
                    <TextField label="adults"
                        value={values.adults}
                        onChange={set('adults')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className="children">
                    <TextField label="children"
                        value={values.children}
                        onChange={set('children')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ChildCareIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

            </div>

            <div id="confirmButton_searchFlight" className="searchFlightElem">
                <Button onClick={confirmSearch} variant="contained">Search</Button>
            </div>

        </div>
    )
}




export default SearchFlightDiv;