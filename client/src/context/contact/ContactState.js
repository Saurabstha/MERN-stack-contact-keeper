import React, { useReducer } from 'react';
// import uuid from 'uuid';
import {v4 as uuid} from "uuid";
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Saurab',
                email: 'saurab@gmail.com',
                phone: '111-111-1111',
                type: "personal"
            },
            {
                id: 2,
                name: 'Saurab2',
                email: 'saurab2@gmail.com',
                phone: '111-111-1111',
                type: "personal"
            },
            {
                id: 3,
                name: 'Saurab3',
                email: 'saurab3@gmail.com',
                phone: '111-111-1111',
                type: "professional"
            },
        ],
        current: null,
        filtered: null
    };
    const [state,dispatch] = useReducer(contactReducer, initialState);

    //Add Contact
    const addContact = contact => {
        contact.id = uuid;
        dispatch({ type: ADD_CONTACT, payload: contact});
    };

    //Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id});
    };

    //Set current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact});
    };
  
    //Clear current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT});
    };


    //update Contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact});
    };

    //filter Contact
    const filterContact = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text});
    };

    //clear fiter Contact
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER});
    };

    return(
        <ContactContext.Provider 
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter
        }}>
            { props.children }
        </ContactContext.Provider>
    )

};

export default ContactState;

