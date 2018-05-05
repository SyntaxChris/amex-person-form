import { connect } from 'react-redux'
import {
  clearForm,
  createPerson,
  handleFormErrors,
  updateFormField,
  validateForm
} from '../../../modules/actions/people'
import People from '../components/People'
import React from 'react'

const mapDispatchToProps = {
  clearForm,
  createPerson,
  handleFormErrors,
  updateFormField,
  validateForm
}

const mapStateToProps = state => ({
  fetching: state.people.fetching,
  formFields: state.people.formFields,
  formFieldErrors: state.people.formFieldErrors,
  isValidated: state.people.isValidated,
  successRecord: state.people.successRecord
})

export default connect(mapStateToProps, mapDispatchToProps)(People)
