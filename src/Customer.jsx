import React, { useState } from 'react'

export default function Customer() {
    const [text, setText] = useState("")
    const [customers, setCustomers] = useState([])
    const [alert, setAlert] = useState(false)
    const [statue, setStatue] = useState(false)
    const [newText, setNewText] = useState("")
    const handleChange = (e) => {
        setText(e.target.value)
        setAlert(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!text) {
            setAlert(true)
        }
        else {
            const customObj = {
                title: text,
                id: Date.now()
            }
            setCustomers([...customers, customObj])
            setText("")
        }
    }
    const edit = (title, id) => {
        setStatue(true)
        setNewText(title)
        customers.map((item) => {
            if (item.id == id) {
                setCustomers(customers.filter((item) => item.id !== id))
                setNewText(title)
            }
        })
    }
    const handleEdit = (e) => {
        setNewText(e.target.value)
    }
    const handleUpdate = (e) => {
        e.preventDefault()
        const customObj = {
            title: newText,
            id: Date.now()
        }
        setCustomers([...customers, customObj])
        setNewText("")
        setStatue(false)
    }
    const remove = (id) => {
        setCustomers(customers.filter((item) => item.id !== id))
        if (customers.length == 1) {
            setStatue(false)
        }
    }
    const handleCleare = () => {
        setCustomers([])
        setStatue(false)
    }
    return (
        <div className='flex flex-col justify-start items-center bg-slate-50 shadow-2xl shadow-zinc-900 p-5 mx-2 mt-10 sm:m-10 lg:mx-52 min-h-[90vh]'>
            <h1 className='text-3xl text-cyan-500 my-5 text-center'>Customer Manage System</h1>
            {!statue ? <form onSubmit={handleSubmit} className="mb-5 text-center" >
                <label>
                    <input type="text" value={text} onChange={handleChange} onFocus={() => setText("")} placeholder='Add a new Customer' className={` border-2 border-cyan-800 px-2 py-1 rounded-md ${alert ? "bg-red-700" : ""}  `} />
                    <button type='submit' className='border-2 border-cyan-800 bg-cyan-800 px-3 py-1 mx-1 my-1 rounded-md  text-white' ><i className="fa-sharp fa-solid fa-plus"></i></button>
                </label>
            </form> :
                <form onSubmit={handleUpdate} className="mb-5 text-center" >
                    <label>
                        <input type="text" value={newText} onChange={handleEdit} placeholder='Add a new Customer' className={` border-2 border-cyan-800 px-2 py-1 rounded-md `} />
                        <button type='submit' className=' border-2 border-cyan-800 bg-cyan-800 px-3 py-1 my-1 mx-1 rounded-md text-white' >Update</button>
                    </label>
                </form>}
            <div>{customers.length < 1 ? <p>There are no customers... </p> : ""} </div>
            {customers.map((customer, index) => (
                <div key={customer.id} className="flex justify-between border w-full items-center rounded-md">
                    <div className='flex bg-cyan-900 w-[80%] sm:w-[90%] items-center text-white rounded-md'>
                        <p className=' bg-white w-[15%] lg:w-[8%] text-black py-1 px-3 text-center  mr-3'> {index + 1} </p>
                        <p className='text-center'>{customer.title} </p>
                    </div>
                    <div className='w-[20%] sm:w-[10%] justify-around flex  ml-1 sm:ml-3'>
                        <button onClick={() => edit(customer.title, customer.id)} className='  text-green-500 mx-1  py-1 text-lg text-center' ><i className="fa-solid fa-pen-to-square"></i></button>
                        <button onClick={() => remove(customer.id)} className='  text-red-600 mx-1 text-lg'  > <i className="fa-solid fa-trash-can"></i> </button>
                    </div>
                </div>
            ))
            }
            {customers.length > 1 && <button onClick={handleCleare} className='bg-red-900 hover:bg-red-500 text-white px-5 py-2 my-2 font-bold rounded-md'>Cleare All</button>}
        </div>
    )
}
