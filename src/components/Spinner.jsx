import React from 'react'
import { ClipLoader } from 'react-spinners';

const override = {
    display: 'block',
    margin: '0 auto'
}

const Spinner = ({loadValue}) => {
  return (
    <ClipLoader loading={loadValue} size={150} cssOverride={override} />
  )
}

export default Spinner