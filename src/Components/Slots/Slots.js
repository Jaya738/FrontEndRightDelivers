import React, { useState, useEffect } from 'react'
import './Slots.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function Slots({handleDayChange, handleSlotChange, scheduled, setScheduled}) {
    const timeSlots = {
        "1" : {
            id: "1",
            slot: "11:30 AM to 1:00 PM" 
        },
        "2" : {
            id: "2",
            slot: "3:00 PM to 5:00 PM" 
        },
        "3" : {
            id: "3",
            slot: "5:30 PM to 7:30 PM" 
        }
    }
    const [availableSlots, setAvailableSlots] = useState(["1","2","3"]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("1");
    const [selectedDay, setSelectedDay] = useState("Today");
    const [isTodayAvailable, setIsTodayAvailable] = useState(true)

    useEffect(()=>{
        const currentD = new Date();
        // currentD.setHours(22,33,0);
        const endSlotDay = new Date();
        endSlotDay.setHours(17,30,0);
        if(currentD < endSlotDay){
            setIsTodayAvailable(true)
            setSelectedDay("Today")
        }
        else{
            setSelectedDay("Tomorrow")
            handleDayChange("Tomorrow")
            setAvailableSlots(["1","2","3"])
            setSelectedTimeSlot("1")
            handleSlotChange("1")
        }
    },[])
    useEffect(()=>{
        const currentD = new Date();
        // currentD.setHours(22,33,0);
        const startSlot1 = new Date();
        startSlot1.setHours(11,30,0); 
        const endSlot1 = new Date();
        endSlot1.setHours(13,0,0);
        const startSlot2 = new Date();
        startSlot2.setHours(15,0,0); 
        const endSlot2 = new Date();
        endSlot2.setHours(17,0,0);
        const startSlot3 = new Date();
        startSlot3.setHours(17,30,0); 
        const endSlot3 = new Date();
        endSlot3.setHours(19,30,0); 
        if(selectedDay === "Today"){
            if(currentD < startSlot1 ){
                setAvailableSlots(["1","2","3"])
                setSelectedTimeSlot("1")
                handleSlotChange("1")
            }
            else if(currentD >= startSlot1 && currentD < startSlot2){
                setAvailableSlots(["2","3"])
                setSelectedTimeSlot("2")
                handleSlotChange("2")
            }
            else if(currentD >= startSlot2 && currentD < startSlot3){
                setAvailableSlots(["3"])
                setSelectedTimeSlot("3")
                handleSlotChange("3")
            }
            else{
                setIsTodayAvailable(false)
                handleDayChange("Tomorrow")
                setSelectedDay("Tomorrow")
                setAvailableSlots(["1","2","3"])
                setSelectedTimeSlot("1")
                handleSlotChange("1")
            } 
        }
        else{
            setSelectedDay("Tomorrow")
            handleDayChange("Tomorrow")
            setAvailableSlots(["1","2","3"])
            setSelectedTimeSlot("1")
            handleSlotChange("1")
        }
    },[selectedDay])
    
    return (
        <div className="slot-selector">
            <div className="slot-header">
                <div className="slot-switch">
                    <label className="switch">
                        <input type="checkbox" checked={scheduled} onChange={() => setScheduled(!scheduled)} />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="slot-schedule">
                    Schedule Delivery
                </div>
            </div>
            {scheduled && (
            <div className="slot-body">
                <div className="slot-time">
                    <DropdownButton size="lg" key="down" drop="down" title={timeSlots[selectedTimeSlot].slot}>
                        {availableSlots.map((slot) => (
                            <Dropdown.Item 
                                key={slot} 
                                onClick={() => {
                                    setSelectedTimeSlot(slot)
                                    handleSlotChange(slot)
                                }}>
                                {timeSlots[slot].slot}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="slot-day">
                    <DropdownButton size="lg" key="down" drop="down" title={selectedDay}>
                        {isTodayAvailable && <Dropdown.Item onClick={() => setSelectedDay("Today")} >Today</Dropdown.Item>}
                        <Dropdown.Item onClick={() => {
                            setSelectedDay("Tomorrow")
                            handleDayChange("Tomorrow")
                        }}>Tomorrow</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            )}
        </div>

    )
}

export default Slots
