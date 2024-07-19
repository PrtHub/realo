import { useParams } from "react-router-dom"
import { Wrapper } from "../components"


const PropertyDetails = () => {
    const {id} = useParams()
  return (
    <Wrapper>
    <div>Property Id: {id}</div>
    </Wrapper>
  )
}

export default PropertyDetails