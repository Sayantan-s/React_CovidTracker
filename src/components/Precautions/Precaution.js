import React from 'react'
import styled from 'styled-components'
import Lottie from 'react-lottie'
import staySafe from '../../assets/shss.json'
import WashH from '../../assets/Protection.svg'
import SocDist from '../../assets/No Crowd.svg'
import Sanitize from '../../assets/Hand Sanitizer.svg'

const Precaution = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: staySafe,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }
      const PrecautionData = [
          {
              point : WashH,
              head : 'Self-Isolatation',
              description : 'Stay home and self-isolate even with minor symptoms such as cough, headache, mild fever, until you recover. Have someone bring you supplies. If you need to leave your house, wear a mask to avoid infecting others.'
              
          },
          {
              point : SocDist,
              head : 'Maintain social distancing',
              description : 'Maintain a safe distance from anyone who is coughing or sneezing.Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze.'
          },
          {
            point : Sanitize,
            head : 'Sanitizing and extra care',
            description : "Clean your hands often. Use soap and water, or an alcohol-based hand rub.Don’t touch your eyes, nose or mouth."
          }
      ]
    return (
      <PreContainer>
          <div className="Animation">
              <Lottie options={defaultOptions} height={400} width={500}/>
          </div>
          <div className="Precautions">
              {
                  PrecautionData.map((each,id) =>
                  (
                    <div key={id} style={{color : '#263238',marginTop:40}}>
                        <img src={each.point} alt="Img" height="80" width="80" style={{marginBottom : 20}}/>
                        <h2 style={{fontWeight : 700}}>{each.head}</h2>
                        <div>{each.description}</div>
                    </div>
                    ))
              }
          </div>
      </PreContainer>
    )
}

export default Precaution

const PreContainer = styled.div`
display : flex;
flex-wrap : wrap;
flex-flow : row;
justify-content : center;
width : 100%;
height : 400px;
margin-bottom : 20px;
& > div
{
    width : 100%;
    height : 100%;
}
.Animation{
    flex: 1.2;
}
.Precautions{
    flex : 2.0;
    background : purple;
    height : 100%;
    display : flex;
    flex-wrap:wrap;
    flex-flow : row;
    justify-content : space-around;
    text-align : center;
    background : linear-gradient(to right, #dae2f8, #d6a4a4);
    border-radius : 0.5rem;
    & > div
    {
        width : 300px;
    }
}`