import classes from './CardLight.module.css';

const CardLight = (props) => {
return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
}

export default CardLight;