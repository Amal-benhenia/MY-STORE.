import { useLocation } from 'react-router-dom';

function Success() {
    const location = useLocation()
    console.log(location);
  return <div>
  success
  </div>;
}

export default Success;
