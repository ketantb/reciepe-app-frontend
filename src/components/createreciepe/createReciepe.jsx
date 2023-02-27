import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./createReciepe.css"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateReciepe = () => {
    const navigate = useNavigate()
    const [CRForm, setCRForm] = useState({title: "", author: "", url: "", ingredients: "", directions: ""})
    const [image, setImage] = useState("")
    const handleCRForm = (e) => {
        e.preventDefault()
        setCRForm({...CRForm, [e.target.name]: e.target.value})
    }

    const postCRData = async () => {
        await axios.post("http://localhost:8080/createreciepe", CRForm)
        .then((res) => {
            console.log(res)
            navigate("/homepage")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if(CRForm.url){
            postCRData()
        }
    }, [CRForm.url])
    
    const imgCloudUpload = async (e) => {
       e.preventDefault()
       if(!CRForm.title.length || !CRForm.author.length || !CRForm.ingredients.length || !CRForm.directions.length || !image){
          return  toast.error("All fields are Mandatory !");
        }
       const imgData = new FormData()
       imgData.append("file", image)
       imgData.append("upload_preset", "ketanrcapp")
       await axios.post("https://api.cloudinary.com/v1_1/ketantb/image/upload", imgData)
       .then((res) => {
        // console.log(res.data.url)
        setCRForm({...CRForm, url: res.data.url})
       })
       .catch((err) => {
        console.log(err)
       })
    }
    return (
        <>
            <section id="create-reciepe-container">
                <div id="cr-body">
                    <h1>Create a recipe</h1>
                    <div id="cr-dummy-border"></div>
                    <div id="cr-body-description">Share a recipe with the club by completing the form below</div>
                    <form>
                        <div>
                            <label htmlFor="title">Recipe title</label>
                            <div>
                                <input name="title" id="title" className="cr-inputs" type="text" onChange={handleCRForm}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="author">Author</label>
                            <div>
                                <input name="author" id="author" className="cr-inputs" type="text" onChange={handleCRForm}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="imgfile">please upload your image</label>
                            <div>
                                <input name="file" id="imgfile" type="file" onChange={(e) =>{setImage(e.target.files[0])}}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="ingrediets">Ingredients</label>
                            <div>
                                <textarea name="ingredients" id="ingredients" className="cr-inputs" onChange={handleCRForm}></textarea>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="directions">Recipe Directions</label>
                            <div>
                                <textarea name="directions" id="directions" className="cr-inputs" onChange={handleCRForm}></textarea>
                            </div>
                        </div>
                        <div>
                            <button onClick={imgCloudUpload} id="cr-post-btn">Share</button>
                        </div>
                    </form>
                </div> 
            </section>
            <ToastContainer 
             pauseOnFocusLoss={false}
             theme={"light"}
             autoClose={2000}
            />
        </>
    )
}

export default CreateReciepe;