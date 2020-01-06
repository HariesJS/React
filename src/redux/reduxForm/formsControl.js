import React from 'react';
import { Field } from 'redux-form';
import '../../App.css';

const FormsControl = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <>
            {children}
            {hasError && <div className='warning_field'>
                <b>{error.toString()}</b>
            </div>}
        </>
    )
}

export const Input = props => (
    <FormsControl { ...props }><input { ...props.input } { ...props } /></FormsControl>
)

export const Textarea = props => (
    <FormsControl { ...props }><textarea { ...props.input } { ...props } /></FormsControl>
)

export const createFiled = (component, name, validate, type, className, placeholder) => (
    <Field
        className={className}
        component={component}
        name={name}
        validate={validate}
        type={type}
        placeholder={placeholder}
    />
)