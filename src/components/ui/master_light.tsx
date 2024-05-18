import React from 'react';
import "@/css/master_light_beam.css"

interface MasterBeams{
  bg_color?: string,
  light_ray1? : string,
  light_ray2? : string,
  light_ray3? : string,
}
const ProductivityComponent: React.FC<MasterBeams> = ({ bg_color, light_ray1, light_ray2, light_ray3 }) => {
  const style = {
    "--bg-rays-color": bg_color,
    "--ray-one-color": light_ray1,
    "--ray-two-color": light_ray2,
    "--ray-three-color": light_ray3,
  } as React.CSSProperties;

  return (
      <div className='container absolute z-10 opacity-50' style={style}>
       <div className="light-rays"></div>
        <div className="light-rays2"></div>
          <div className="light-rays3"></div>
      </div>
  );
};

export default ProductivityComponent;