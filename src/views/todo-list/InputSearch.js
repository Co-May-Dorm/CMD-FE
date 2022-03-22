const InputSearch = (props) => {
    return (
        <div className="col">
            <h3>{props.nameInput}:</h3>
            <div className="form-control d-flex flex-row position-relative">
                <input value={props.value} onClick={() => props.callBackSetState(!props.state)} onChange={(event) => props.callBackSearch(event, props.constant)} className="styleInp"></input>
                { props.state? <div className="form-control d-flex flex-row position-absolute top-100 start-0 w-100 rounded mt-1" style={{ zIndex: 1 }}>
                    <div className="col" id="listTypeTask">
                        <ul className="list">
                            {props.list.length == 0 ? <li className="text-center">Không có nhân viên nào cả</li> :
                                props.list.map((item) => <li className="listItem" key={item.id} onClick={() => props.callBackClick(item, props.typeClick)}>[{item.id}]{item.name}</li>)}
                        </ul>
                    </div>
                </div> : null}
            </div>
        </div>
    )
}
export default InputSearch