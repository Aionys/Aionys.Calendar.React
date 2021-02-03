import React, { Dispatch, FC, SetStateAction } from 'react'
import { addMonths, subMonths, format } from "date-fns";
import c from '../Calendar.module.scss'
import iconLeft from '../../../assets/icons/left.png'
import iconRight from '../../../assets/icons/right.png'
import { dateMMMMYYYYFormat } from '../../../utils/date.utils';

type Props = {
    selectDate: Dispatch<SetStateAction<Date>>;
    selectedDate: Date;
    currentDate: Date;
    isButtonDisabled: boolean;
}

type Action = 'prev' | 'next'

export const CalendarHeader: FC<Props> = props => {
    let monthNum = 1

    const prevNextMonth = (type: Action): void => {
        if (type === 'prev') {
            props.selectDate(subMonths(props.selectedDate, monthNum))
            monthNum--
        } else {
            props.selectDate(addMonths(props.selectedDate, monthNum))
            monthNum++
        }
    }

    const setCurrentMonth = () => {
        props.selectDate(props.currentDate)
    }

    return (
        <div className={c['calendar-header']}>
            <span className={c.title}>{format(props.selectedDate, dateMMMMYYYYFormat)}</span>
            <div className={c['btn-panel']}>
                <button disabled={props.isButtonDisabled} className={c['btn-prev']} onClick={() => prevNextMonth('prev')}>
                    <img src={iconLeft} alt="left" />
                </button>
                <button disabled={props.isButtonDisabled} className={c['btn-next']} onClick={() => prevNextMonth('next')}>
                    <img src={iconRight} alt="right" />
                </button>
                <button disabled={props.isButtonDisabled} className={c['btn-current']} onClick={setCurrentMonth}><span>Today</span></button>
            </div>
        </div>
    )
}