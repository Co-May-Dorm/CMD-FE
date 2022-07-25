import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    proposal: PropTypes.object
}

const FormSubmitProposal = props => {
  return (
    <div>FormSubmitProposal</div>
  )
}

FormSubmitProposal.propTypes = propTypes

export default FormSubmitProposal