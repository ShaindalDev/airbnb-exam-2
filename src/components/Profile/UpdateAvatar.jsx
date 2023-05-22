import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../../api/constants";


export default function UpdateAvatar() {
    const [changeAvatar, setChangeAvatar] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [mutate, { isLoading }] = useMutation(API_URL)
    
    const userData = localStorage.getItem("UserProfile");
    const parsedUserData = JSON.parse(userData);
    const userName = parsedUserData.name;

    const handleAvatarChange = (e) => {
        const changeAvatar = e.target.media[0];
        setChangeAvatar(changeAvatar);
        setPreviewUrl(URL.createObjectURL(changeAvatar));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profileImage', changeAvatar);
        fetch(`${API_URL}/profiles/${userName}/media`, {
            method: 'PUT',
            body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            mutate(data.imageUrl);
        });
    };

    return (
        <from onSubmit={handleSubmit}>
            <input type="url" onChange={handleAvatarChange} />
            {previewUrl && <img src={previewUrl} alt="profile" />}
            <button type="submit" disabled={!changeAvatar || isLoading}>
                {isLoading ? 'Loading...' : 'Update Profile Image'}
            </button>
        </from>
    )
}