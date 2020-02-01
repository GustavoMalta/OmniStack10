import React , {useState} from 'react';

function Header(props){
    const [num, setnum] = useState(0);

    function incrementecounter(props){
        setnum(num+1);
    }
    function decrementecounter(){
        setnum(num-1);
    }


    return(
        <span>{props.title}
            <h4>Contador: {num}</h4>
            <button onClick={incrementecounter}>Soma</button>
            <button onClick={decrementecounter}>Subtrai</button>
        </span>
    )
}

export default Header;