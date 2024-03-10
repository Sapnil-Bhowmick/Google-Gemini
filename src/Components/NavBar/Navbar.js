import React from 'react'
import './Navbar.css'

import { assets } from '../../assets/assets.js'
import { useContextValues } from '../../Context/ContextProvider'





const Navbar = () => {

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
        setMorePrompts

    } = useContextValues()




    const [expand, setExpand] = React.useState(true)
    const [active, setActive] = React.useState(0)
    const [edit, setEdit] = React.useState(false)

    const [promptInp, setpromptInp] = React.useState('')

    const [location, setLocation] = React.useState({})


    React.useEffect(() => { getMyLocation() }, [])


    const getMyLocation = async () => {
        const location_obj = await fetch('https://ipapi.co/json')
        const jsonData = await location_obj.json()

        // console.log(jsonData)
        setLocation(jsonData)
    }

    const SelectPrompt = async (item_prompt) => {
        setRecentPrompt(item_prompt)
        await onSend(item_prompt)
    }

    const Delete = (index) => {
        let arr = previousPrompts
        arr.splice(index, 1)

        setPreviousPrompts([...arr])
    }

    const Edit = (index) => {
        setEdit(true)

        let arr = previousPrompts
        setpromptInp(arr[index])

    }

    const Save_Edit = (e, index) => {

        if (e.key === "Enter") {
            let arr = previousPrompts
            arr[index] = promptInp

            setPreviousPrompts([...arr])

            setEdit(false)
        }


    }




    return (
        <div className='nav-main' >
            <div className={`nav-wrapper ${expand ? 'flex-expand' : 'flex-collapse'}`} >

                <div className='menu' onClick={() => setExpand(!expand)}>
                    <img src={assets.menu_icon} className='menu-img' />
                </div>

                <div>
                    {
                        expand ?

                            (
                                <div className='new-chat' onClick={() => NewChat()}>
                                    <img src={assets.plus_icon} className='plus-img' />
                                    <span className='chat-text'> New Chat </span>
                                </div>
                            ) :

                            (
                                <div className='collapse-new' onClick={() => NewChat()} >
                                    <img src={assets.plus_icon} className='plus-img-collapse' />
                                </div>
                            )
                    }





                    {
                        expand ?

                            (

                                <div className='prompt-div-exp'>
                                    <div className='recent-div'>
                                        {
                                            previousPrompts.length !== 0 && (
                                                <>
                                                    <div className='recent-text'> Recent </div>

                                                    {loading && (<div className='loading-prompt'> </div>)}
                                                </>
                                            )


                                        }

                                        {

                                            previousPrompts && previousPrompts.slice(0, ElementsToSlice).map((item, index) => {
                                                return (
                                                    <div className={`${active === index ? `${!loading ? 'acive-prompt' : 'prompt-hist'}` : 'prompt-hist'}`}
                                                        onClick={() => {
                                                            console.log(index)
                                                            setActive(index)
                                                        }}
                                                        key={index}
                                                    >
                                                        <div className='prompt-msg-div'>

                                                            <img src={assets.message_icon} className='msg-icon' />

                                                            {
                                                                edit ?

                                                                    (
                                                                        <input className='promptInput' value={promptInp} onChange={(e) => setpromptInp(e.target.value)} onKeyDown={(e) => Save_Edit(e, index)} />
                                                                    )
                                                                    :
                                                                    (<span onClick={() => SelectPrompt(item)} className='prompt-text'> {item.length > 15 ? item.substring(0, 20) + '...' : item} </span>)
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
                                            })


                                        }

                                        <div className='prompt-msg-div'>


                                            {
                                                previousPrompts.length > ElementsToSlice &&

                                                (

                                                    !showMore ?

                                                        (
                                                            <div id='show' className='show-btn-div' onClick={(e) => handleShowLess(e)}>
                                                                <img src={assets.down} className='up-down-img' />
                                                                <span className='show-more-text'> Show More </span>
                                                            </div>

                                                        )
                                                        :
                                                        (
                                                            <div id='hide' className='show-btn-div' onClick={(e) => handleShowLess(e)}>
                                                                <img src={assets.up} className='up-down-img' />
                                                                <span className='show-more-text'> Show Less </span>
                                                            </div>
                                                        )


                                                )
                                            }



                                            {
                                                morePrompts.length !== 0 && morePrompts.map((item, index) => {
                                                    return (
                                                        <div className={`${active === (index + ElementsToSlice) ? `${!loading ? 'acive-prompt' : 'prompt-hist'}` : 'prompt-hist'}`}
                                                            onClick={() => {
                                                                console.log(index + ElementsToSlice)
                                                                setActive(index + ElementsToSlice)
                                                            }}
                                                            key={index}
                                                        >
                                                            <div className='prompt-msg-div'>

                                                                <img src={assets.message_icon} className='msg-icon' />

                                                                {
                                                                    edit ?

                                                                        (
                                                                            <input className='promptInput' value={promptInp} onChange={(e) => setpromptInp(e.target.value)} onKeyDown={(e) => Save_Edit(e, index)} />
                                                                        )
                                                                        :
                                                                        (<span onClick={() => SelectPrompt(item)} className='prompt-text'> {item.length > 15 ? item.substring(0, 20) + '...' : item} </span>)
                                                                }


                                                            </div>

                                                            <div className='edit-del-div'>
                                                                <div className='dot-div' onClick={() => Delete(index)} >
                                                                    <img src={assets.Delete} className='dot-img' />
                                                                </div>

                                                                <div className='dot-div' onClick={() => Edit(index)} >
                                                                    <img src={assets.edit} className='edit-img' />
                                                                </div>
                                                            </div>



                                                        </div>
                                                    )
                                                })


                                            }

                                        </div>



                                    </div>
                                </div>
                            ) :

                            (
                                <div className='prompt-div-coll'> </div>
                            )
                    }





                </div>

                <div className='btn-div'>

                    <div className={`${expand ? 'btn-single-div-exp' : 'btn-single-div-coll'}`} >

                        <div className='btn-single'>
                            <img src={assets.question_icon} className='btn-img' />
                            {expand && (<span className='btn-text'> Help </span>)}
                        </div>

                        {expand && (<span className={`${expand ? 'active-exp' : 'active-coll'}`}></span>)}


                    </div>

                    <div className={`${expand ? 'btn-single-div-exp' : 'btn-single-div-coll'}`} >

                        <div className='btn-single'>
                            <img src={assets.history_icon} className='btn-img' />
                            {expand && (<span className='btn-text'> Activity </span>)}
                        </div>

                    </div>

                    <div className={`${expand ? 'btn-single-div-exp' : 'btn-single-div-coll'}`} >

                        <div className='btn-single'>
                            <img src={assets.setting_icon} className='btn-img' />
                            {expand && (<span className='btn-text'> Settings </span>)}
                        </div>

                        {expand && (<span className={`${expand ? 'active-exp' : 'active-coll'}`}></span>)}


                    </div>



                    {
                        expand &&

                        (
                            <div className={`btn-single-div ${expand ? 'location-div' : 'btn-single-div-coll'}`}>
                                <div className='location'>  </div>
                                <span className='location-text'> {location.city} , {location.region} , {location.country_name} </span>
                            </div>
                        )
                    }


                </div>




            </div>

        </div >
    )
}

export default Navbar
