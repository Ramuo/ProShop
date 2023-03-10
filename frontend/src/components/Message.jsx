import {Alert} from 'react-bootstrap';

function Message({variant, children}) {
  return (
    <Alert variant={variant}>{children}</Alert>
  )
}

Message.defaultProps = {
    variant: 'danger',
}
export default Message;