import "./homepage.css"
import { FaPizzaSlice } from 'react-icons/fa';
import { Link } from "react-router-dom";
import HomePageHeader from "./header";
import { useState, useEffect } from "react";
import axios from 'axios'
import Card from "./card";


const HomePage = () => {
    const [data, setData] = useState()
    const fetchData = async () => {
        await axios.get("http://localhost:8080/createreciepe")
            .then((res) => {
                // console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <section id="homepage-container">
                <header>
                    <nav>
                        <HomePageHeader />
                        <div style={{width: 0}}>
                            <Link to="/createrecipe">
                                <div id="newReciepeIcon">
                                    <FaPizzaSlice id="pizzaIcon" />
                                    <p>NEW</p>
                                </div>
                            </Link>
                        </div>
                    </nav>
                </header>
                <main id="allReciepeMain">
                    <p>All Recipes</p>
                    <div id="reciepe-card-container">
                        <Card data={data} />
                    </div>
                </main>
            </section>
        </>
    )
}

export default HomePage