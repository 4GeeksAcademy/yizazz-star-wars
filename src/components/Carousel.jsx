import React from "react";


export const Carousel = ({ children }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="horizontal-scroll d-flex flex-nowrap overflow-auto p-3">
                        {React.Children.map(children, (child, index) => (
                            <div key={index} className="scroll-item">
                                {child}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}