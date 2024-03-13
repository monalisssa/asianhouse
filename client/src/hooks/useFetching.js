import {useState} from 'react';

export const useFetching = (callback) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const fetching = async (...args) => {
        try {
            setLoading(true)
            await callback(...args)
        } catch (e) {
            setError(e.message);
        }
        finally {
            setLoading(false)
        }
    }

    return [fetching, error, loading]
}