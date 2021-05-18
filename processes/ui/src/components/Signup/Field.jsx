import React from 'react'
import { Form } from 'react-bootstrap'

const Field = ({ state, controlId, label, text, type, goodFeedback, badFeedback, onChange, placeholder, formOptions }) => {
    return (
        <Form.Group controlId={controlId} id={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                required
                onChange={onChange}
                type={type}
                placeholder={`${placeholder ?? 'Enter ' + label}`}
                value={state}
                {...formOptions}
            />
            {
                text && <Form.Text className="text-muted">
                    {text}
                </Form.Text>
            }
            {
                goodFeedback && <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            }
            {
                badFeedback && <Form.Control.Feedback id={`bFeedback${controlId}`} type="invalid">Please fill this field</Form.Control.Feedback>
            }
        </Form.Group>
    )
}

export default Field
