import  React, {useState} from "react";
import './App.css'
import ItemClass from "./ItemClass";
import ItemItem from "./Item";

export const Items: ItemClass[] = [];

function ItemCreator() {

    const [currentCategory, setCurrentCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [page, setPage] = useState(true);
    const [searchedName, setSearchedName] = useState('');
    const [toggleConfirmation, setToggleConfirmation] = useState(false);
    const [selectedItemDelete, setSelectedItemDelete] = useState<ItemClass>();
    const [items, setItems] = useState(() => [new ItemClass('Skoda', 'Jármű'), new ItemClass("Opel", "Jármű")]);



    function createItem(name: string, category: string) {
        const item = new ItemClass(name, category);
        Items.push(item);
        setItems(Items)
        console.log(Items);
    }

    function handleRemove(item: ItemClass) {
        setToggleConfirmation(true);
        setSelectedItemDelete(item);
        console.log(item)
    }

    function confirmDelete () {
        const item = selectedItemDelete;
        const updatedItems = Items.filter(it => it !== item);
        setItems(updatedItems);
        setToggleConfirmation(false);
    }

    return (
        <div className="App">
            <input type="button" onClick={page ? ()=>{setPage(false)} : ()=>{setPage(true)}}
                   value={page ? "Back to main" : "New item"}/>


            {page ? //A tárgy létrehozása rész
                <div>

                    <h1>ItemClass Creation</h1>

                    <form>

                        <div className="Row">
                            <p>ItemClass name: </p>
                            <input type="text" onChange={(e) => setItemName(e.target.value)}/>
                        </div>

                        <div className="Row">
                            <p>ItemClass Category: </p>
                            <input type="text" onChange={(e) => setItemCategory(e.target.value)}/>
                        </div>

                        <div className="Row">
                            <input type="button" onClick={() => {
                                createItem(itemName, itemCategory)
                                setPage(false);
                            }} value="Create ItemClass"/>
                        </div>

                    </form>
                </div>

                : //A két oldal elválasztója

                //A főoldal rész
                <div>

                    <h1 style={{textAlign: "center"}}>Home</h1>

                        <div className="Row">
                            <input type="button" value="category 1" onClick={() => {setCurrentCategory('cat1')}}/>
                            <input type="button" value="category 2" onClick={() => {setCurrentCategory('cat2')}}/>
                            <input type="button" value="category 3" onClick={() => {setCurrentCategory('cat3')}}/>
                            <input type="button" value="category 4" onClick={() => {setCurrentCategory('cat4')}}/>
                            <input type="button" value="category 5" onClick={() => {setCurrentCategory('cat5')}}/>
                        </div>

                        <div className="Row">
                            <p>Search</p>
                            <input type="text" onChange={(e) => setSearchedName(e.target.value)}/>
                        </div>

                    {items.map((item, i) => (<ItemItem key={i} item={item} onRemove={() => handleRemove(item)}/>))};
                    {toggleConfirmation && <div><p>Confirmation</p> <button onClick={confirmDelete}>Confirm</button></div>}

                </div>

            }
        </div>
    );
}

export default ItemCreator;