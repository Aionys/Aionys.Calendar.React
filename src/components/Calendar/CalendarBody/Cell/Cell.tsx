import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { compare } from '../../../../helpers/compare'
import c from '../../../Calendar/Calendar.module.scss'
import { Schedule, Task } from '../../Calendar'
import { CurrentCell } from '../CalendarBody';
import { Event } from './Event/Event'

type Props = {
    getClassDate: (date: Date) => string
    date: Date;
    setPopup: (flag: boolean) => void
    setCurrentCell: Dispatch<SetStateAction<CurrentCell>>;
    tasks?: Array<Task>;
    schedule: Schedule;
    setSchedule: Dispatch<SetStateAction<Schedule | null>>
    dropableId: string;
}

export const Cell: FC<Props> = props => {
    const [tasks] = useState(props.tasks)
    const dropableId = props.dropableId

    return (
        <>
            <li onClick={() => {
                props.setPopup(true)
                props.setCurrentCell(props.date)
            }}>
                <span className={props.getClassDate(props.date)}>{props.date.getDate()}</span>
                <>
                    <Droppable droppableId={dropableId} type="EVENTS">
                        {
                            droppable => (
                                <ul className={c['task-nav']} {...droppable.droppableProps} ref={droppable.innerRef}>
                                    {
                                        tasks && tasks.sort(compare).map((item, i) => {
                                            return (
                                                <Draggable key={i} draggableId={item.time + item.title} index={i}>
                                                    {
                                                        draggable => (
                                                            <Event
                                                                draggable={draggable}
                                                                item={item}
                                                            />
                                                        )
                                                    }
                                                </Draggable>
                                            )
                                        })
                                    }
                                </ul>
                            )
                        }
                    </Droppable>
                </>
            </li>
        </>
    )
}