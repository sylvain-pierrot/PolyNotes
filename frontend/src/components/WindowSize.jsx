import { useState, useEffect } from "react";

function WindowSize(props) {
    const [size, setSize] = useState(getSize())

    function getSize() {
        return {
            width: window.innerWidth,
            heigth: window.innerHeight
        }
    }

    useEffect(() => {
        function handleResize() {
            setSize(getSize())
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return <p>Width: {size.width}, Height: {size.heigth}</p>
}

export default WindowSize