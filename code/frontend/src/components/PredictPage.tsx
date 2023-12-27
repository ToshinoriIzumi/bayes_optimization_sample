import { ChangeEvent, useState, FC } from 'react';
import { usePredictMaterial } from '../hooks/usePredictMaterial';
import type { Material } from '../types/material';

const PredictPage: FC = () => {
    const { predictMaterial, error, materials  } = usePredictMaterial();
    const [water, setWater] = useState<number>(0);
    const [carbonatedWater, setCarbonateWater] = useState<number>(0);
    const [calpisNomal, setCalpisNomal] = useState<number>(0);
    const [deliciousness, setDeliciousness] = useState<number>(0);
    
    const handleWaterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setWater(Number(e.target.value));
    }
    const handleCarbonateWater = (e: ChangeEvent<HTMLInputElement>) => {
        setCarbonateWater(Number(e.target.value));
    }
    const handleCalpisNomal = (e: ChangeEvent<HTMLInputElement>) => {
        setCalpisNomal(Number(e.target.value));
    }
    const handleDeliciousness = (e: ChangeEvent<HTMLInputElement>) => {
        setDeliciousness(Number(e.target.value));
    }

    const getMaterial = () => {
        return {
            water: water,
            carbonated_water: carbonatedWater,
            calpis_nomal: calpisNomal,
            deliciousness: deliciousness,
        }
    }
    
    return (
        <>
            <div>試したカルピスの材料</div>
            <div>
                <div>
                    水の量
                </div>
                <div>
                    <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                        value={String(water)}
                        onChange={handleWaterChange}
                    />
                </div>
            </div>
            <div>
                <div>炭酸水の量</div>
                <div>
                    <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                        value={String(carbonatedWater)}
                        onChange={handleCarbonateWater}
                    />
                </div>
            </div>
            <div>
                <div>カルピスの量</div>
                <div>
                    <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                        value={String(calpisNomal)}
                        onChange={handleCalpisNomal}
                    />
                </div>
            </div>
            <div>
                <div>美味しさ</div>
                <div>
                    <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                        value={String(deliciousness)}
                        onChange={handleDeliciousness}
                    />
                </div>  
            </div>        
            <div>
                <button 
                    className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700'
                    onClick={() => predictMaterial(getMaterial())}
                >
                    次のカルピスを作る材料を予測する
                </button>
            </div>
            { materials == null ? (
                <div>予測する材料を入力してください</div>
            ):(
                materials.map((material: Material) => (
                    <div>
                        <div>次に試してみる量はこちらです！</div>
                        <div>水の量: {material.water}</div>
                        <div>炭酸水の量: {material.carbonated_water}</div>
                        <div>カルピスの量: {material.calpis_nomal}</div>
                        <div>美味しさ: {material.deliciousness}</div>
                    </div>        
                ))
            )}
        </>
    )
}

export default PredictPage