import React from 'react'
import ReactDOM from 'react-dom'
import Input from '../../commonUI/Input'
import './Review.scss'
import { FaArrowRight } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { FirebasePost } from '../../../axios'
import { SwitchContext } from '../../Context/ModalSwitch'
const Review = () => {
  const [Form,setForm] = React.useState({
    Name : {
      inpType :"input",
      inpConfig : {
        type : "text",
        inputMode : 'text',
        placeholder : "John Doe!"
      },
      value : ''
    },
    Review : {
      inpType : "textarea",
      inpConfig : {
        cols : 10,
        rows : 5,
        placeholder : 'Leave a message!',
        inputMode : 'text',
      },
      value : ''
    }
  })
  const { review,Togglerev } = React.useContext(SwitchContext)
  const OnChangeHandler = (event,identify) =>
  {
    const updatedForm ={...Form};
    const updatedFormElement = {...updatedForm[identify]};
    updatedFormElement.value = event.target.value;
    updatedForm[identify]=updatedFormElement;
    setForm(updatedForm)
    
  }
  const PostHandler = () =>
  {
    const reviews = {
      Name : Form.Name,
      Review : Form.Review
    }
    FirebasePost.post(`/Reviews.json`,reviews)
    .then(resp =>
      {
        console.log(resp);
      })
    .catch(err =>
      {
        console.log(err);
      })
  }
  const FormHolder = [];
  for(let i in Form)
  {
    FormHolder.push({
      identifiers : i,
      Data : Form[i]
    })
  }
  const ReviewForm =review ? <form className="Review-Form">
  <IoMdClose className="Review-Form--close" onClick={Togglerev}/>
  {
    FormHolder.map(each=>
      {
          const { inpType,inpConfig,value } = each.Data;
          return <Input
          key={each.identifiers}
          ElementType={inpType}
          ElementConfig={inpConfig}
          value={value}
          onChange={(event) => OnChangeHandler(event,each.identifiers)}
          className="Review-Form--elements"
          />
        })
      }
      <FaArrowRight className="Review-Form--send" onClick={PostHandler}/>
</form> : null;
    return ReactDOM.createPortal(
      ReviewForm,
      document.getElementById('modal-root')
    )
}

export default Review
