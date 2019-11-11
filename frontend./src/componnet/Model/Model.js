import React from "react";
import "./Model.css";
const Model =(props)=>{
    return(
        <div className="modal">
            <header className="modal__header">
                <h1>{props.title}</h1>
            </header>
            <section className="modal__content">{props.children}</section>
            <section className="modal__actions">
                <button className="btn__secondary" onClick={props.onCancel}>
                    Cancel
                </button>
                <button className="btn__primary" onClick={props.onConfirm}>
                   {props.confirmText ?"Booking":"Confirm"}
                </button>
            </section>
        </div>
    )
}

export default Model;