import axiosJWT from '../../api/axios'

const showDetailMail = async ({ mailId, mailObjetctRef, modalElement, endpoint, mailDetailElement }) => {
  const response = await axiosJWT.get(`/${endpoint}/${mailId}`)
  mailObjetctRef.value = response.data

  modalElement.modalDetailElement.classList.remove('hide')
  console.log(mailDetailElement.props)
}

export default showDetailMail
