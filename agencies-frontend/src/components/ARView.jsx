// ARView.jsx
import React from 'react';

const ARView = ({ vehicleModel }) => {
    return (
        <div>
            <a-scene embedded arjs>
                <a-marker preset="hiro">
                    <a-entity 
                        geometry={`primitive: box; width: 1; height: 1; depth: 1`} 
                        material={`color: red;`} 
                        position="0 0.5 0"
                    ></a-entity>
                </a-marker>
                <a-entity camera></a-entity>
            </a-scene>
        </div>
    );
};

export default ARView;
