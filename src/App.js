import './App.css';
import {useState, useEffect} from "react"
import { Grid, GridItem } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import leftButton from "./templates/leftButton.svg"
import rightButton from "./templates/rightButton.svg"

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
const trueDay = x => (x.getDay() + 6) % 7

function compareDate(a, b) {
    if(a.getFullYear() !== b.getFullYear()) return a.getFullYear() < b.getFullYear()
    if(a.getMonth() !== b.getMonth()) return a.getMonth() < b.getMonth()
    return a.getDate() < b.getDate()

}
function initArray(date = new Date()) {
    let currentDay = trueDay(date)
    let days = 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate()
    let arr = new Array(Math.trunc((currentDay + days) / 7 + 1) * 7)

    let start = new Date(date)
    start.setDate(1)
    start.setDate(start.getDate() - trueDay(start))
    for(let i = 0; i < arr.length; i++) {
        arr[i] = {
            'time': new Date(start)
        }
        start.setDate(start.getDate() + 1)
    }
    return arr
}
function App() {
    // let currentData

    const [date, setDate] = useState(new Date())

    const [calender, setCalendar] = useState(initArray())

    useEffect(() => setCalendar(initArray(date)))
    return (
    <div className="container">
        <Grid templateColumns='repeat(7, 1fr)'  templateRows='repeat(7, 50px)' gap={5}>

            <GridItem className='date' rowStart={1} rowEnd={2} colStart={1} colEnd={-1}>
                <ButtonGroup >
                    <Button className="btn" onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}> <img src={leftButton}/> </Button>
                    <p className="currentDate">{date.toLocaleString('en', {month: 'short'})}</p>
                    <Button className="btn" onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}> <img src={rightButton}/> </Button>
                </ButtonGroup>

                <ButtonGroup >
                    <Button className="btn" onClick={() => setDate(new Date(date.setFullYear(date.getFullYear() - 1)))}> <img src={leftButton}/> </Button>
                    <p className="currentDate">{date.getFullYear()}</p>
                    <Button className="btn" onClick={() => setDate(new Date(date.setFullYear(date.getFullYear() + 1)))}> <img src={rightButton}/> </Button>
                </ButtonGroup>
            </GridItem>

            {DAYS.map((item, index) =>
                (<GridItem key={index} className='days'>
                    <p>{item}</p>
                </GridItem>)
            )}

            {calender.map((item, index) =>
                (<GridItem key={index}
                           className={`item ${compareDate(item.time, new Date()) ? 'passed' : 'active'}`}
                           onClick={!compareDate(item.time, new Date()) ? () => alert("Hello") : null}>
                    <p>{item.time.getDate()}</p>
                </GridItem>)
            )}
        </Grid>
    </div>
    );
}

export default App;
