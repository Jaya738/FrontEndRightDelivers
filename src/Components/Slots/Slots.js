import React, { useState, useEffect } from 'react'
import './Slots.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function Slots() {
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
    const [scheduled,setScheduled] = useState(false)
    const [isTodayAvailable, setIsTodayAvailable] = useState(true)

    useEffect(()=>{
        const d = new Date();
        const curHr = d.getHours();
        const curMin = d.getMinutes();
        if(curHr < 18 && curMin < 30 ){
            setIsTodayAvailable(true)
        }
        else{
            setIsTodayAvailable(false)
            setSelectedDay("Tomorrow")
            setAvailableSlots(["1","2","3"])
            setSelectedTimeSlot("1")
        }
    },[])
    useEffect(()=>{
        const d = new Date();
        const curHr = d.getHours();
        const curMin = d.getMinutes();

        if(selectedDay === "Today"){
            if(curHr < 12 && curMin < 30){
                setAvailableSlots(["1","2","3"])
                setSelectedTimeSlot("1")
            }
            else if(curHr > 11 && curHr < 15){
                setAvailableSlots(["2","3"])
                setSelectedTimeSlot("2")
            }
            else{
                setAvailableSlots(["3"])
                setSelectedTimeSlot("3")
            }
        }
        else{
            setAvailableSlots(["1","2","3"])
            setSelectedTimeSlot("1")
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
                            <Dropdown.Item key={slot} onClick={() => setSelectedTimeSlot(slot)}>{timeSlots[slot].slot}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="slot-day">
                    <DropdownButton size="lg" key="down" drop="down" title={selectedDay}>
                        {isTodayAvailable && <Dropdown.Item onClick={() => setSelectedDay("Today")} >Today</Dropdown.Item>}
                        <Dropdown.Item onClick={() => setSelectedDay("Tomorrow")}>Tomorrow</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            )}
        </div>

    )
}

export default Slots
