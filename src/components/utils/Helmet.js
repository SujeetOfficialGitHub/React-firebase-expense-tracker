import React from 'react'

const Helmet = ({title,className, children}) => {
    document.title = title;
  return (
    <div className={className}>{children}</div>
  )
}

export default Helmet