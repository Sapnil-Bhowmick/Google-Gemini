import React from 'react'
import './Navbar.css'

import { assets } from '../../assets/assets.js'
import { useContextValues } from '../../Context/ContextProvider'



const SinglePromptHist = ({ item, index }) => {

    const {
        previousPrompts,
        setPreviousPrompts,
        onSend,
        setRecentPrompt,
        NewChat,
        setLoading,
        loading,
        showMore,
        handleShowLess,
        morePrompts,
        ElementsToSlice,
        setShowMore,
        setMorePrompts,
        dark,
        setInput,
        activeCard,
        setActiveCard,
        active,
        setActive,
        SelectPrompt,


    } = useContextValues()

    const [edit, setEdit] = React.useState(false)
    const [editIndex, setEditIndex] = React.useState(null)
    const [promptInp, setpromptInp] = React.useState('')


    const Save_Edit = (e, index) => {

        if (e.key === "Enter") {
            let arr = previousPrompts
            arr[index] = promptInp

            setPreviousPrompts([...arr])

            setEdit(false)
        }


    }


    const Delete = (index) => {
        let arr = previousPrompts
        arr.splice(index, 1)

        setPreviousPrompts([...arr])
    }


    const Edit = (index) => {
        // setEditIndex(index)
        setEdit(true)

        let arr = previousPrompts
        setpromptInp(arr[index])

    }


    return (
        <div className={`${active === index ? `${!loading ? `${dark ? 'dark-active-prompt' : 'acive-prompt'}` : `${dark ? 'prompt-hist-dark' : 'prompt-hist'}`}` : `${dark ? 'prompt-hist-dark' : 'prompt-hist'}`}`}
            key={index}
        >
            <div className='prompt-msg-div'>

                <img src={dark ? assets.dark_chat : assets.message_icon} className='msg-icon' />

                {
                    edit ?

                        (
                            <input
                                className='promptInput'
                                value={promptInp}
                                onChange={(e) => setpromptInp(e.target.value)}
                                onKeyDown={(e) => Save_Edit(e, index)} />
                        )
                        :
                        (
                            <span className='prompt-text' style={{ color: dark ? '#f0f4f9' : '#6e728a' }}
                                onClick={() => {
                                    SelectPrompt(item)
                                    setActiveCard(null)
                                    // console.log(index)
                                    setActive(index)
                                }}
                            >
                                {item.length > 15 ? item.substring(0, 20) + '...' : item}
                            </span>
                        )
                }


            </div>

            <div className='edit-del-div'>
                <div className='dot-div'
                    onClick={() => {
                        setShowMore(false)
                        setMorePrompts([])
                        Delete(index)
                    }} >
                    <img src={assets.Delete} className='dot-img' />
                </div>

                <div className='dot-div' onClick={() => Edit(index)} >
                    <img src={assets.edit} className='edit-img' />
                </div>
            </div>



        </div>
    )
}


export default SinglePromptHist