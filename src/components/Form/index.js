import CheckMark from './components/CheckMark'
import EditInputs from './components/EditInputs'
import Loader from './components/Loader'
import PreviewInputs from './components/PreviewInputs'
import PropTypes from 'prop-types'
import React from 'react'
import Record from './components/Record'
import './styles/form.scss'

const Form = ({
  buttons,
  errorFields,
  formFields,
  handleButtonClick,
  handleInputChange,
  handleOnBlur,
  inputValues,
  loading,
  offset,
  successRecord,
  title
}) => <article className='form-container'>
  {loading ? <Loader /> : null}
  <header className='form-header'>
    <div className='title'>{title}</div>
  </header>
  <form>
    <figure
      className='form-scroller'
      style={{ marginLeft: `-${offset * 100}%` }}
    >
      <section className='form-view'>
        <EditInputs
          errorFields={errorFields}
          formFields={formFields}
          handleInputChange={handleInputChange}
          handleOnBlur={handleOnBlur}
          inputValues={inputValues}
          offset={offset}
        />
      </section>
      <section className='form-view'>
        <PreviewInputs
          formFields={formFields}
          inputValues={inputValues}
        />
      </section>
      <section className='form-view'>
        {successRecord.name
          ? <Record record={successRecord} />
          : null}
      </section>
    </figure>
  </form>
  <footer className='btn-container'>
    {buttons.map((btn, i) => <button
      className='form-btn'
      key={i.toString()}
      onClick={() => handleButtonClick(btn.label)}
    >
      {btn.label}
    </button>)}
  </footer>
</article>

const formInputPropTypes = {
  label: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  })).isRequired,
  type: PropTypes.string.isRequired,
}
const successRecordPropTypes = {
  date_of_birth: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

Form.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired
  })).isRequired,
  errorFields: PropTypes.object,
  formFields: PropTypes.arrayOf(PropTypes.shape(formInputPropTypes)).isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  inputValues: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  offset: PropTypes.number.isRequired,
  successRecord: PropTypes.shape(successRecordPropTypes).isRequired,
  title: PropTypes.string.isRequired
}

export default Form