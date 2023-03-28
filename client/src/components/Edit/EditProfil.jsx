import { useState } from "react";
import {useCookies} from'react-cookie';
import axios from "axios";
import '../styles/EditProfil.css'

import {useNavigate} from 'react-router-dom';





const EditProfil = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [editData, setEditData] = useState({
        user_id: cookies.UserId,
        url: "",
        about: "",
    

    })

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:5000/edit', {editData})
            console.log(response)
            const success = response.status === 200
            console.log(success);
            if (success) navigate('/homepage')
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        const name = e.target.name

        setEditData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }





    return (
        <>
            

            <div className="onboarding">
                <h2 className="create-account">Modifier</h2>
             
                <form onSubmit={handleSubmit}>
                    <section>
                     
                  

                    

                        <label htmlFor="about">A propos de moi</label>
                        <textarea className="descriptionss"
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="Passions , Hobbies  ... "
                            value={editData.about}
                            onChange={handleChange}
                        />

                        <input  className="modif-submif" type="submit"/>
                    </section>

                    <section>

                        <label htmlFor="url">Photo Profile</label>
                        <input className="picture-modif"
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {editData.url && <img src={editData.url} alt="profile pic preview"/>}
                        </div>


                    </section>

                </form>
            </div>






        </>

    )
}

export default EditProfil;