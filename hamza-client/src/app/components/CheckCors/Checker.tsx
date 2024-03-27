'use client'
import React, { useState } from 'react'

const MEDUSA_SERVER_URL =
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
const CHECKER = `${MEDUSA_SERVER_URL}/custom/checker`
const Checker = () => {
    const [message, setMessage] = useState('') // State to store the message
    const [error, setError] = useState(false) // State to indicate if there's an error

    const getNonce = async () => {
        try {
            const response = await fetch(CHECKER, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json() // Assuming the servert responds with JSON

            console.log(data.message) // Assuming the nonce is returned in the message property of the JSON response
            setMessage(data.message) // Set the message with the nonce
            setError(false) // Reset the error state
        } catch (e) {
            console.error(e) // Log any errors to the console
            setMessage('Failed to fetch the nonce.') // Set an error message
            setError(true) // Update the error state to true
        }
    }

    return (
        <div>
            <button onClick={getNonce}>Get The Nonce</button>
            {/* Display the message or error next to the button */}
            {error ? (
                <span style={{ color: 'red' }}>{message}</span>
            ) : (
                <span>{message}</span>
            )}
        </div>
    )
}

export default Checker
