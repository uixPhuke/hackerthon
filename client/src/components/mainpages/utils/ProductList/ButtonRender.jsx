import React,{useContext} from 'react'
import { GlobalState } from '../../../../GlobalState';
import { Link } from 'react-router-dom';

const ButtonRender = ( {product} ) => {
    
    // console.log(product)
    const state = useContext(GlobalState);
    // console.log(state);
    
    
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart; 
    //  console.log(addCart)
  return (
    <div className="flex flex-col sm:flex-row justify-center p-4 space-y-2 sm:space-y-0 sm:space-x-2 ">
      {isAdmin ? (
        <>
          <Link
            to={`#!`}
            className="bg-black text-white py-2 px-4 text-sm sm:text-base rounded-md hover:bg-slate-500 transition-colors"
          >
            Delete
          </Link>
          <Link
            to={`detail/${product._id}`}
            className="bg-slate-400 text-white py-2 px-4 text-sm sm:text-base rounded-md hover:bg-slate-500 transition-colors"
          >
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link
            to={`#!`}
            className="bg-black text-white py-2 px-4 text-sm sm:text-base rounded-md hover:bg-slate-500 transition-colors"
            onClick={() => addCart(product)}
          >
            Buy
          </Link>
          <Link
            to={`detail/${product._id}`}
            className="bg-slate-400 text-white py-2 px-4 text-sm sm:text-base rounded-md hover:bg-slate-500 transition-colors"
          >
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default ButtonRender