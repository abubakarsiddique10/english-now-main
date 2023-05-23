import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import baseURL from "../../api/api";
import { Button } from "../../components/Button/Button";
import Label from "../../components/Form/Label";
import Textarea from "../../components/Form/Textarea";
import TextField from "../../components/Form/TextField";
import { categories } from "../Vocabulary/categories";



const AddVocabulary = () => {
    const [value, setValue] = useState({
        word: "",
        meaning: "",
        image: "",
        category: "",
    })
    const { word, meaning, image, category } = value;


    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
    }
    const handleSynonymAntonym = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
        if (e.target.value.trim() === "") {
            console.log('please value')
        } else {
            setValue({ ...value, [e.target.name]: [...value[e.target.name], e.target.value.trim()] });
            e.target.value = "";
        }
    }
    const handleCategory = (e) => {
        setValue({ ...value, category: e.target.value })
    }
    const handleImage = (e) => {
        setValue({ ...value, image: e.target.files[0] })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData;
        formData.append("category", category);
        formData.append("word", word);
        formData.append("meaning", meaning);
        formData.append("image", image);

        fetch(`${baseURL}/api/v1/vocabulary`, {
            method: "PUT",
            body: formData
        })
            .then(data => data.json())
            .then(data => {
                if (data.status) {
                    toast.success(data.message);
                    setValue({
                        word: "",
                        meaning: "",
                        image: "",
                        category: "",
                        sentence: "",
                        synonym: [],
                        antonym: [],
                    })
                } else {
                    toast.error(data.error)
                }
            })
            .catch((error) => {
            })
    }

    return (
        <form onSubmit={handleSubmit} className="mt-20 border">
            <div className="bg-white rounded px-5 md:px-14 pt-6 flex flex-col my-2 ">
                <div className="-mx-3 md:flex md:gap-8 mb-5">
                    <div className="w-full">
                        <Label label="Enter Word" />
                        <TextField
                            handleChange={handleChange}
                            placeholder="Word"
                            type="text"
                            name="word"
                            value={value.word} />
                    </div>
                    <div className="w-full">
                        <Label label="Enter Meaning" />
                        <TextField
                            handleChange={handleChange}
                            placeholder="Menaing"
                            type="text"
                            name="meaning"
                            value={value.meaning} />
                    </div>
                </div>
                <div className="-mx-3 md:flex md:gap-8 mb-5">
                    <div className="w-full">
                        <Label label="Enter Image" />
                        <input
                            onChange={handleImage}
                            placeholder="Image"
                            type="file"
                            name="image"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2.5 px-4 mb-3" />
                    </div>
                    <div className="w-full">
                        <Label label="Cetagory" />
                        <div className="relative">
                            <select
                                onChange={handleCategory}

                                className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
                                <option>Select Cetagory</option>
                                {
                                    categories.map((item, index) =>
                                        <option key={index} value={item.category}>{item.category}</option>
                                    )
                                }
                            </select>
                            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker top-4 right-2">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="-mx-3 md:flex md:gap-8 mb-7">
                    <div className="w-full">
                        <Label label="Enter Synonym" />
                        <input
                            onKeyDown={(e) => e.key === "Enter" && handleSynonymAntonym(e)}
                            placeholder="Synonym"
                            type="text"
                            name="synonym"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" />
                    </div>
                    <div className="w-full">
                        <Label label="Enter Antonym" />
                        <input
                            onKeyDown={(e) => e.key === "Enter" && handleSynonymAntonym(e)}
                            placeholder="Antonym"
                            type="text"
                            name="antonym"
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                        />
                    </div>
                </div>

                <div className="-mx-3 h-[180px] mb-5">
                    <Textarea
                        handleChange={handleChange}
                        placeholder="Type Sentence..."
                        value={value.sentence}

                        name="sentence" />
                </div>
            </div>

            <div className="-mx-3 px-14 mb-7 text-right">
                <Button type="submit">Submit</Button>
            </div>
        </form>

    )
}
export default AddVocabulary;