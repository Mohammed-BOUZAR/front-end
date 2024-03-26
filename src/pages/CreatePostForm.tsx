import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router";

// import './css/CreatePostForm.css';
import Header from "../components/Header";

const CreatePostForm: React.FC = () => {
    const [content, setContent] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const history = useHistory();

    const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Convert FileList to an array and update state
        const fileList = Array.from(e.target.files || []);
        setFiles(fileList);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Create a FormData object to send the files
        const formData = new FormData();
        formData.append("content", content);

        // Append each file to the FormData object
        files.forEach((file, index) => {
            formData.append(`file${index + 1}`, file);
        });

        // Send the data to the Node.js server using fetch or Axios
        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                // Handle successful response
                const data = await response.json(); // Parse response data
                history.push(`/posts/${data._id}`); // Redirect to new post URL
                console.log("Post created successfully!");
            } else {
                // Handle error response
                console.error("Failed to create post.");
            }
        } catch (error) {
            // Handle network error
            console.error("Failed to create post.", error);
        }
    };

    return (
        <div className="container">
            <Header />
            <div className="card-container">
                <form onSubmit={handleSubmit} className="create-post-form">
                    <h1 className="title">New Post</h1>
                    <label htmlFor="content" className="form-label">Content</label>
                    <input
                        type="text"
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        className="form-input"
                    />
                    <br />
                    <label htmlFor="files" className="form-label">Files</label>
                    <input type="file" id="files" onChange={handleFileChange} multiple className="form-input" />
                    {/* Add the "multiple" attribute to allow multiple file selection */}
                    <br />
                    <button type="submit" className="form-button">Create Post</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePostForm;
