import React from 'react'
import './Navbar.css'

import { assets } from '../../assets/assets.js'
import { useContextValues } from '../../Context/ContextProvider'
import SinglePromptHist from './SinglePromptHist'
import SinglePromptMoreHist from './SinglePromptMoreHist'







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
        setMorePrompts,
        dark,
        setInput,
        activeCard,
        setActiveCard,
        active,
        setActive,
        SelectPrompt,


    } = useContextValues()





    const [expand, setExpand] = React.useState(true)

    // const [edit, setEdit] = React.useState(false)

    const [location, setLocation] = React.useState({})

    // const [editIndex, setEditIndex] = React.useState(null)


    React.useEffect(() => { getMyLocation() }, [])


    const getMyLocation = async () => {
        const location_obj = await fetch('https://ipapi.co/json')
        const jsonData = await location_obj.json()

        // console.log(jsonData)
        setLocation(jsonData)
    }





    return (
        <div className='nav-main' style={{ backgroundColor: dark ? '#1e1f20' : '#f0f4f9', width: !expand && '6rem' }}>
            <div className={`nav-wrapper ${expand ? 'flex-expand' : 'flex-collapse'}`} >

                <div className='menu' onClick={() => setExpand(!expand)}>
                    <img src={dark ? assets.dark_menu : assets.menu_icon} className='menu-img' />
                </div>

                <div>
                    {
                        expand ?

                            (
                                <div className='new-chat' style={{ backgroundColor: dark && '#45474a' }}
                                    onClick={() => {
                                        setActiveCard(null)
                                        NewChat()
                                    }}
                                >
                                    <img src={dark ? assets.dark_plus : assets.plus_icon} className={dark ? 'plus-img-dark' : 'plus-img'} />
                                    <span className={`${dark ? 'chat-text-dark' : 'chat-text'}`}> New Chat </span>
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
                                                    <div className='recent-text' style={{ color: dark ? '#fff' : '', fontWeight: dark ? 'bold' : '' }}> Recent </div>

                                                    {loading && (<div className='loading-prompt'> </div>)}
                                                </>
                                            )


                                        }

                                        {

                                            previousPrompts && previousPrompts.slice(0, ElementsToSlice).map((item, index) => {
                                                return (
                                                    <SinglePromptHist key={index} item={item} index={index} />
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
                                                                <img src={dark ? assets.dark_up : assets.down} className='up-down-img' />
                                                                <span className='show-more-text' style={{ color: dark ? '#f0f4f9' : '#6e728a', fontWeight: dark ? 'bold' : '' }}> Show More </span>
                                                            </div>

                                                        )
                                                        :
                                                        (
                                                            <div id='hide' className='show-btn-div' onClick={(e) => handleShowLess(e)}>
                                                                <img src={dark ? assets.dark_down : assets.up} className='up-down-img' />
                                                                <span className='show-more-text' style={{ color: dark ? '#f0f4f9' : '#6e728a', fontWeight: dark ? 'bold' : '' }}> Show Less </span>
                                                            </div>
                                                        )


                                                )
                                            }



                                            {
                                                morePrompts.length !== 0 && morePrompts.map((item, index) => {
                                                    return (
                                                        <SinglePromptMoreHist  key={index} item={item} index={index} />
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

                <div className='btn-div' style={{ color: dark ? '#f0f4f9' : '' }}>

                    <div className={`${expand ? 'btn-single-div-exp' : 'btn-single-div-coll'}`} >

                        <div className='btn-single'>
                            <img src={dark ? assets.dark_help : assets.question_icon} className='btn-img' />
                            {expand && (<span className='btn-text' > Help </span>)}
                        </div>

                        {expand && (<span className={`${expand ? 'active-exp' : 'active-coll'}`}></span>)}


                    </div>

                    <div className={`${expand ? 'btn-single-div-exp' : 'btn-single-div-coll'}`} >

                        <div className='btn-single'>
                            <img src={dark ? assets.dark_activity : assets.history_icon} className='btn-img' />
                            {expand && (<span className='btn-text'> Activity </span>)}
                        </div>

                    </div>

                    <div className={`${expand ? 'btn-single-div-exp' : 'btn-single-div-coll'}`} >

                        <div className='btn-single'>
                            <img src={dark ? assets.dark_settings : assets.setting_icon} className='btn-img' />
                            {expand && (<span className='btn-text'> Settings </span>)}
                        </div>

                        {expand && (<span className={`${expand ? 'active-exp' : 'active-coll'}`}></span>)}


                    </div>



                    {
                        expand &&

                        (
                            <div className={`btn-single-div ${expand ? 'location-div' : 'btn-single-div-coll'}`}>
                                <div className='location' style={{ backgroundColor: dark ? '#30ff30' : '' }}>  </div>
                                <span className='location-text' style={{ color: dark ? '#7da7f9' : '' }}> {location.city} , {location.region} , {location.country_name} </span>
                            </div>
                        )
                    }


                </div>




            </div>

        </div >
    )
}

export default Navbar
