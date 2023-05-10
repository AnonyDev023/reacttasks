import React, { useState } from "react"
import { useSelector } from "react-redux"

const Task4 = () => {

    const lightmode = useSelector((state)=>state.productState.daynightmode)

    const [currentIndex, setCurrentIndex] = useState(0)

    const tabheadings = ["Team", "Philosophy", "Achievement"]

    const tabpanedata = [
        {data: "A team is defined as a group of people who perform interdependent tasks to work toward accomplishing a common mission or specific objective. Some teams have a limited life: for example, a design team developing a new product, or a continuous process improvement team organized to solve a particular problem.",
        image: "/images/team.jpg"
        },
        {data: "The philosophy of any company serves as its blueprint for operation. This statement outlines the overall purpose of the business, along with its goals. A business philosophy might also list the company values that are important to the founders, executives, and employees. The philosophy of a company reflects its leaders' values, helping the business to feel more personal.",
        image: "/images/philosophy.jpg"
        },
        {data: "Business Achievement means the level of financial performance of the Company against worldwide, regional, country or division targets established by the Company for that year based on the scope of a participant's role within the Company.",
        image: "/images/Achievement.jpg"
        }
    ]

    const handleTabpane = (index) => {
        setCurrentIndex(index)
    }

    return (
        <>
            <section className="outer-section">
                <div className="outer-div-container">
                    <div className="content-holder-div">
                        <h1 className={lightmode ? "darkthemecolor" : "lightthemecolor"}>Task4</h1>
                        <div className="tabpane-holder-div">
                            <div className="tabpane-headings-holder">
                                {tabheadings.map((ele, i)=>{
                                    return (
                                        <div className={currentIndex===i ? lightmode ? "tabpane-indi-heading-div active-tab darkthemetabpane" : "tabpane-indi-heading-div active-tab" : lightmode ? "tabpane-indi-heading-div tabpanebodertheme" : "tabpane-indi-heading-div"} key={i} onClick={()=>handleTabpane(i)}>
                                            <p className="tabpane-heading-p">{ele}</p>
                                        </div>  
                                    )
                                })}
                            </div>
                            <div className="tabpane-data-img-holder">
                                {tabpanedata.map((ele,i)=>{
                                    if(currentIndex===i){
                                        return (
                                            <div key={i}>
                                                <p className="tabpane-data-p">{ele.data}</p>
                                                <img src={ele.image} className="tabpane-img" />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Task4;