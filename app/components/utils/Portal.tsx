import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'

interface props {
  children: React.ReactNode
  wrapperId: string
}
// generates a div with an id that is then attached to the document's body
const createWrapper = (wrapperId: string) => {
    const wrapper = document.createElement('div')
    wrapper.setAttribute('id', wrapperId)
    document.body.appendChild(wrapper)
    return wrapper
}

export const Portal: React.FC<props> = ({children, wrapperId}) => {
    const [wrapper, setWrapper] = useState<HTMLElement | null >(null)
    //  invoke createWrapper if an element with the provided id does not exist
    useEffect(() => {
        let element = document.getElementById(wrapperId)
        let created = false
        if (!element) {
            created = true
            element = createWrapper(wrapperId)
        }
        setWrapper(element)
        // destroy the element when Portal component is un-mounted
        return () => {
            if (created && element?.parentNode) {
                element.parentNode.removeChild(element)
            }
        }
    }, [wrapperId])

    if (wrapper === null) return null
    // Creates a portal to the newly generated div
    return createPortal(children, wrapper)
}