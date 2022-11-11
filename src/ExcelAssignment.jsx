import axios from "axios";
import React from "react";
import { useState } from "react";


export default function ExcelAssignment() {
    const [show, setShow] = useState(null);
    const [formData, setFormData] = useState("");
    const [modal, setModal] = useState("")
    const [mod, setMod] = useState(false)
    

    function showCsv() {
        axios.get('http://localhost:4000/show-csv')
            .then((res) => {
                
                setShow(res.data)
                setMod(true)
                console.log(res.data , "hryyyy")
        })
        
    }

    function handleChange(e) {
        setFormData({selectedFile : e.target.files[0]})
    }

    console.log(formData)
    function AddToDb(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('file', formData.selectedFile)
        axios.post('http://localhost:4000/upload', data)
            .then((res) => {
                setModal(res.data)
                console.log(res.data)
                setTimeout( () => {
                    setModal(null)
                }, 1500)
            })
        
    }
    
    
    return (
        <>
            <div className="mt-[135px] flex justify-center w-screen ">
                <div className="w-full  ">
                    <div className="fixed  top-0 py-5 px-3 bg-slate-200 ">
                        <div className="w-screen">
                        <h1 className="font-bold text-lg mb-2">Excel File Upload Application</h1>
                    {modal && <div className="bg-green-500 w-1/2 rounded text-white py-2 px-4  font-semibold">Uploaded successfully</div>}
                    <form onSubmit={AddToDb} className="mt-3 w-screen flex-col items-center" encType="multipart/form-data">
                        <input type="file" onChange={handleChange} name="excel" />
                        <button className="bg-zinc-700 text-white font-semibold py-2 px-3 rounded">Upload</button>
                    </form>
                    </div>
                    <div className="flex mt-4">
                            <button onClick={showCsv} className="bg-blue-700 text-white mr-4 font-semibold py-2 px-5 rounded">Show</button>
                            <button onClick={()=>(setMod(!mod))} className="bg-red-700 text-white font-semibold py-2 px-5 rounded">Hide</button>
                            </div>
                    </div>
                    <div className="w-screen flex justify-center">
                        <div className=" ">
                            
                            {mod && <table className="mt-10 even:bg-slate-300 w-[600px] text-white border-collapse border border-slate-500">
                                <th className="fixed  bg-zinc-800 border border-slate-500 px-[35px] py-2">id</th>
                                <th className="fixed right-[710px] px-[30px]  bg-zinc-800 border border-slate-500  py-2">Index Number</th>
                                <th className="fixed right-[366px] px-[133px] bg-zinc-800 border border-slate-500  py-2">Full Name</th>
                                <tr className="text-gray-800 mt-24 even:bg-rose-400 font-semibold">
                                            <td className="border border-slate-500 py-2 px-3">fdf</td>
                                            <td className="border border-slate-500 py-2 px-3">dfdf</td>
                                            <td className="border border-slate-500 py-2 px-3">dfdf</td>

                                        </tr>
                                {show.map((item) => {
                                    const { id, index, fullName } = item
                                    return (
                                        <tr className="text-gray-800 mt-24 even:bg-rose-400 font-semibold">
                                            <td className="border border-slate-500 py-2 px-3">{id}</td>
                                            <td className="border border-slate-500 py-2 px-3">{index}</td>
                                            <td className="border border-slate-500 py-2 px-3">{fullName}</td>

                                        </tr>
                                    )
                                }) }
                            </table> }    
</div>
                    </div>
                </div>
                

        </div>
        </>
    )
}