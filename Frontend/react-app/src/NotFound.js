import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Sorry</h2>
      <p>That page cannot be found</p>
      <a href="/">Back to the homepage...</a>
    </div>
  );
}
 
export default NotFound;