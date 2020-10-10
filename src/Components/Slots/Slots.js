import React, { useState } from 'react'
import './Slots.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function Slots() {
    const timeSlots = {
        "1" : {
            id: "1",
            slot: "11:30 to 1:00 PM" 
        },
        "2" : {
            id: "2",
            slot: "3:00 to 5:00 PM" 
        },
        "3" : {
            id: "3",
            slot: "5:30 to 7:30 PM" 
        }
    }
    const [availableSlots, setAvailableSlots] = useState(["1","2","3"]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("1");
    const [selectedDay, setSelectedDay] = useState("Today");
    const [schedule,setSchedule] = useState(false)
    return (
        <div className="slot-selector">
            <div className="slot-header">
                <div className="slot-switch">
                    <label className="switch">
                        <input type="checkbox" checked={schedule} onChange={() => setSchedule(!schedule)} />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="slot-schedule">
                    Schedule Delivery
                </div>
            </div>
            {schedule && (<div className="slot-body">
                <div className="slot-time">
                    <DropdownButton size="lg" key="down" drop="down" title={timeSlots[selectedTimeSlot].slot}>
                        {availableSlots.map((slot) => (
                            <Dropdown.Item key={slot} onClick={() => setSelectedTimeSlot(slot)}>{timeSlots[slot].slot}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                </div>
                <div className="slot-day">
                    <DropdownButton size="lg" key="down" drop="down" title={selectedDay}>
                        <Dropdown.Item onClick={() => setSelectedDay("Today")}>Today</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSelectedDay("Tomorrow")}>Tomorrow</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>)}
        </div>

    )
}

export default Slots
