import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";


//Gestion des routes sur les components
export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const navigate = useNavigate();
        const params = useParams();

        return ( <
            Component navigate = { navigate }
            params = { params } {...props }
            />
        );
    };

    return Wrapper;
};


/*
export const withRouter = WrappedComponent => props => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <WrappedComponent
      {...props}
      params={params}
      navigate={navigate}
    />
  );
};
*/