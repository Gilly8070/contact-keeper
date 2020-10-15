import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    GET_CONTACTS,
    CLEAR_CONTACTS,
    DELETE_CONTACT ,
    SET_CURRENT,
    CLEAR_CURRENT ,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';
// import ContactContext from './contactContext';

const ContactState = props => {
    const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null,
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get contact
    const getContact = async () => {
        try {
            const res = await axios.get('api/contacts');
            dispatch({ type: GET_CONTACTS, payload: res.data });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });

        }

    };

    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: contact });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
            
        }
        
    };

    // Delete contact
    const deleteContact = id => {
        // contact.id = uuid.v4();
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    // Set Current Contact\
    const setCurrent  = contact => {
        // contact.id = uuid.v4();
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Current Contact
    const clearCurrent = contact => {
        // contact.id = uuid.v4();
        dispatch({ type: CLEAR_CURRENT });
    };

    // Update Contact
    const updateContact = contact => {
        // contact.id = uuid.v4();
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    // Filter Contacts
    const filterContacts = text => {
        // contact.id = uuid.v4();
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        // contact.id = uuid.v4();
        dispatch({ type: CLEAR_FILTER });
    };

    return (
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
            filterContacts,
            clearFilter,
            // getContacts
        }}>
            { props.children }
        </ContactContext.Provider>
    )
};

export default ContactState;

