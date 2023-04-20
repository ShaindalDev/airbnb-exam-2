import { useState } from "react";

function App() {
    const [name, setName] = useLocalStorage("name", "Ola");
    return (
        <div>
            <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
    );
}

function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() =>{
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try{
            const valueToStore =
            value instanceof Function ? value(storedValue) : value;
            //save state
            setStoredValue(valueToStore);
            //save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error)
        }
    };
    return [storedValue, setValue];
}

export default useLocalStorage;