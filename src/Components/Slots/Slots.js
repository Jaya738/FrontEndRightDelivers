import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import './Slots.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { each, last } from 'lodash';

function Slots({ config, slots={}, handleDayChange, handleSlotChange, scheduled = false, setScheduled}) {
    const timeSlots = config.slots
    const allSlots = Object.keys(timeSlots)
    const [availableSlots, setAvailableSlots] = useState(Object.keys(timeSlots));
    const lastSlot = timeSlots[Object.keys(timeSlots)[Object.keys(timeSlots).length - 1]]
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(allSlots[0]);
    const [selectedDay, setSelectedDay] = useState("Today");
    const [isTodayAvailable, setIsTodayAvailable] = useState(true)

    useEffect(()=>{
        const currentD = new Date();
        const endSlotDay = new Date();
        endSlotDay.setHours(lastSlot.start[0],lastSlot.start[1],lastSlot.start[2]);
        if(currentD < endSlotDay){
            setIsTodayAvailable(true)
            setSelectedDay("Today")
            setAvailableSlots(allSlots)
            setSelectedTimeSlot(allSlots[0])
            handleSlotChange(allSlots[0])
        }
        else{
            setSelectedDay("Tomorrow")
            handleDayChange("Tomorrow")
            setIsTodayAvailable(false)
            setAvailableSlots(allSlots)
            setSelectedTimeSlot(allSlots[0])
            handleSlotChange(allSlots[0])
        }
    },[])
    useEffect(()=>{
        const currentD = new Date();
        const slotValues = Object.values(timeSlots)

        if(selectedDay === "Today"){
            for(var i=0; i < slotValues.length; i++){
                const startSlot = new Date();
                startSlot.setHours(slotValues[i].start[0],slotValues[i].start[1],slotValues[i].start[2]);
                if(currentD < startSlot){
                    setAvailableSlots(allSlots.slice(i));
                    setSelectedTimeSlot(allSlots.slice(i)[0])
                    handleSlotChange(allSlots.slice(i)[0])
                    handleDayChange("Today")
                    break;
                }
                else{
                    continue;
                }
            }

        }
        else{
            setSelectedDay("Tomorrow")
            handleDayChange("Tomorrow")
            setAvailableSlots(allSlots)
            setSelectedTimeSlot(allSlots[0])
            handleSlotChange(allSlots[0])
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
const mapStateToProps = (state) => {
  return {
    config: state.config,
  };
};
export default connect(mapStateToProps)(Slots)
