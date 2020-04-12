import React, { useReducer } from 'react';
import axios from 'axios';
// import uuid from 'uuid';
// import {v4 as uuid} from "uuid";
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    };
    const [state,dispatch] = useReducer(contactReducer, initialState);

    //GET Contacts
    const getContacts = async () => {
        // contact.id = uuid;
        
        try {
            const res = await axios.get('/api/contacts');
            dispatch({ 
                type: GET_CONTACTS, 
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
            
        }
    };


    //Add Contact
    const addContact = async contact => {
        // contact.id = uuid;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/contacts', contact, config);
            dispatch({ 
                
                type: ADD_CONTACT, payload: res.data});
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
            
        }
    };

    //Delete Contact
    const deleteContact = async id => {
        try {
            const res = await axios.delete(`/api/contacts/${id}`);
            dispatch({ 
                type: DELETE_CONTACT, 
                payload: id});
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
    };

    
    //update Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
        dispatch({ 
            type: UPDATE_CONTACT,
             payload: res.data
            });
           
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
            
        }

    };

    //Clear Contact
    const clearContacts = id => {
        dispatch({ type: CLEAR_CONTACTS});
    };

    //Set current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact});
    };
  
    //Clear current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT});
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
            error: state.error,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            getContacts,
            clearContacts
        }}>
            { props.children }
        </ContactContext.Provider>
    )

};

export default ContactState;

