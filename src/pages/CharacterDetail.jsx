import imagen from "../assets/img/rigo-baby.jpg"


export const CharacterDetail = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-6 border">
                            <img src={imagen} alt="imagen baby"/>
                        </div>
                        <div className="col-6 border">
                            <div className="border d-flex border-primary h1 justify-content-center">
                                Nombre
                            </div>
                            <div className="border border-danger d-flex justify-content-center">
                                Info
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}