import "./card.css"
import { useState, useEffect } from "react"
import axios from 'axios'

const Card = ({ data }) => {
    // try {
    //     data.map((i) => {
    //         console.log(i.title)
    //         console.log(i.url)
    //     })
    // }
    // catch (err) {
    //     console.log(err)
    // }
    if (!data) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <>
            <section id="card-body">
                {data?.map((details, index) => {
                    const { author, directions, ingredients, title, url } = details
                    return (
                        <section key={index} id="recipe-card">
                            <div>
                                {/* <img id="card-img" src={url} alt="recipe.png" /> */}
                                <div id="card-img" style={{
                                    backgroundImage: `url(${url})`, backgroundSize: "100% 100%",
                                    backgroundRepeat: "no-repeat"
                                }}>
                                    <div id="card-recipe-title">{title}</div>
                                </div>
                            </div>
                        </section>
                    )
                })}
            </section>
        </>
    )
}

export default Card;