import React from 'react'

const Img = ({ src, alt, title, className }) => {
    return (
        <img className={className} src={src} alt={alt} title={title} />
    )
}

export default Img