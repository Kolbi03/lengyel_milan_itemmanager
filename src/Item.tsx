import ItemClass from "./ItemClass";
export interface ItemProps {
    item: ItemClass;
    onRemove: () => void;
}

function ItemItem(props: ItemProps) {

    return (
        <div>
            <p>{props.item.name}{props.item.category}</p>
            <button onClick={props.onRemove}>Delete</button>
        </div>
    );
}

export default ItemItem;