import { useNavigate, useParams, Link } from "react-router-dom";
import * as imagesAPI from '../../utilities/images-api';

export default function ImageDeletePage()  {

  const { id } = useParams();
  const navigate = useNavigate();
  
  const deleteImage = async (e) => {
    e.preventDefault();
    
    try {
      
      const response = await imagesAPI.deleteImage(id);
      if(response.ok) {
        navigate('/images');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
             <h4>Are you sure you want to delete this image?</h4>
              
              <button className="delete" onClick={deleteImage}>DELETE</button>
              
              <Link to={`/image/${id}`}>
                <button>CANCEL</button>
              </Link> 
              
    </div>
  );
}

