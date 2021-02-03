import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import c from './Popup.module.scss'
import { CurrentCell } from '../Calendar/CalendarBody/CalendarBody';
import { useFormik } from 'formik';
import { Schedule } from '../Calendar/Calendar';
import { Partial } from '../../ts-helpers/partial';

type Props = {
    currentCell: CurrentCell;
    setCurrentCell: Dispatch<SetStateAction<CurrentCell>>;
    setPopup: Dispatch<SetStateAction<boolean>>;
    findCellAndSetSchedule: (shedule: Schedule, currentCell: any, newTask: string, time: string) => void;
    schedule: Schedule | null;
}

export const Popup: FC<Props> = props => {
    const formik = useFormik({
        initialValues: {
            title: '',
            time: '',
        },
        onSubmit: values => {
            props.findCellAndSetSchedule(props.schedule as Schedule, props.currentCell, values.title, values.time)
            props.setPopup(false)
        },
        validate: (values) => {
            const errors: Partial<(typeof values)> = {};
            if (!values.title) {
                errors.title = 'Required';
            }

            if (!values.time) {
                errors.time = 'Required';
            }
            return errors;
        }
    });

    return (
        <div className={c['popup-wrap']} onClick={e => {
            props.setPopup(false)
        }}>
            <div className={c.popup} onClick={e => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
            }}>
                <span>New Event!</span>
                <time className={c.date}>{props.currentCell?.toDateString()}</time>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        name='title'
                        placeholder='Event name'
                    />
                    {formik.errors.title && <span className={c.error}>required</span>}
                    <input type="time"
                        onChange={formik.handleChange}
                        value={formik.values.time}
                        name='time'
                    ></input>
                    {formik.errors.time ? <span className={c.error}>required</span> : null}
                    <div className={c["btn-panel"]}>
                        <button className="waves-effect waves-light btn">add event</button>
                        <button className="waves-effect waves-light btn" onClick={() => {
                            props.setCurrentCell(null)
                            props.setPopup(false)
                        }}>cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}