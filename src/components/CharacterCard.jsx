import imagen from "../assets/img/rigo-baby.jpg"


export const CharacterCard = () => {



    return <div>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card p-0">
                        <img src={imagen} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">Nombre</h5>
                            <p className="gender m-0">Gender: </p>
                            <p className="hair-color m-0">Hair Color: </p>
                            <div className="eye-color">Eye Color: </div>
                            <div className="d-flex justify-content-between">
                                <a href="#" className="btn btn-primary mt-3">Learn More!</a>
                                <a href="#" className="btn btn-secondary ml-2 mt-3 align-items-end">heart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}