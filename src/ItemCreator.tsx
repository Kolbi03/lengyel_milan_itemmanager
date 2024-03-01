import  React, {useState} from "react";
import './App.css'
import ItemClass from "./ItemClass";
import ItemItem from "./Item";

function ItemCreator() {


    const [currentCategory, setCurrentCategory] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [page, setPage] = useState(true);
    const [searchedName, setSearchedName] = useState('');
    const [toggleConfirmation, setToggleConfirmation] = useState(false);
    const [selectedItemDelete, setSelectedItemDelete] = useState<ItemClass>();
    const [items, setItems] = useState(() =>
        [new ItemClass('RTX3060', 'gpu'), new ItemClass("Samsung EVO 970", "storage")]);


    function createItem() {
        const item = new ItemClass(itemName, itemCategory);
        items.push(item);
        setItemName('');
        console.log(itemCategory)
    }

    function handleRemove(item: ItemClass) {
        setToggleConfirmation(true);
        setSelectedItemDelete(item);
    }

    function confirmDelete () {
        const item = selectedItemDelete;
        const updatedItems = items.filter(it => it !== item);
        setItems(updatedItems);
        setToggleConfirmation(false);
    }

    return (
        <div className="App">
            <input type="button" onClick={page ? ()=>{setPage(false)} : ()=>{setPage(true)}}
                   value={page ? "Back to main" : "New item"}/>


            {page ? //A tárgy létrehozása rész
                <div>

                    <h1>Item Creation</h1>

                    <form>

                        <div className="Row">
                            <p>Item Name: </p>
                            <input type="text" onChange={(e) => setItemName(e.target.value)}/>
                        </div>

                        <div className="Row">
                            <p>Item Category: </p>
                            <select onChange={event => setItemCategory(event.target.value)}>
                                <option value="cpu">Processzor</option>
                                <option value="ram">Memória</option>
                                <option value="gpu">Videókártya</option>
                                <option value="psu">Tápegység</option>
                                <option value="motherboard">Alaplap</option>
                                <option value="storage">Háttértár</option>
                            </select>
                        </div>

                        <div className="Row">
                            <input type="button" onClick={() => {
                                createItem();
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
                            <input type="button" value="Processzor" onClick={() => {setCurrentCategory('cpu')}}/>
                            <input type="button" value="Memória" onClick={() => {setCurrentCategory('ram')}}/>
                            <input type="button" value="Videókártya" onClick={() => {setCurrentCategory('gpu')}}/>
                            <input type="button" value="Tápegység" onClick={() => {setCurrentCategory('psu')}}/>
                            <input type="button" value="Alaplap" onClick={() => {setCurrentCategory('motherboard')}}/>
                            <input type="button" value="Háttértár" onClick={() => {setCurrentCategory('storage')}}/>
                        </div>

                        <div className="Row">
                            <p>Search</p>
                            <input type="text" onChange={(e) => setSearchedName(e.target.value)}/>
                        </div>

                    {items.filter(item => item.name.startsWith(searchedName))
                        .filter(item => currentCategory.includes(item.category))
                        .map((items, i) => (<ItemItem key={i} item={items} onRemove={() => handleRemove(items)}/>))}

                    {toggleConfirmation && <div><p>Confirmation</p>
                        <button onClick={confirmDelete}>Confirm</button>
                        <button onClick={() => setToggleConfirmation(false)}>Cancel</button>
                    </div>}

                </div>

            }
        </div>
    )
}

export default ItemCreator;