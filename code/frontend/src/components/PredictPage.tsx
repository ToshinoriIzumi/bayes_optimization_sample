import { ChangeEvent, useState, FC } from 'react';
import { usePredictMaterial } from '../hooks/usePredictMaterial';
import type { ExpremintalMaterial } from '../types/material';

const PredictPage: FC = () => {
    const { predictMaterial, error, materials, predictedMaterial  } = usePredictMaterial();
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
        <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
            <div className="text-lg font-bold text-center mb-6">試したカルピスの材料</div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    水の量
                </label>
                <div>
                    <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                        value={water}
                        onChange={handleWaterChange}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">炭酸水の量</label>
                <div>
                    <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                        value={carbonatedWater}
                        onChange={handleCarbonateWater}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">カルピスの量</label>
                <div>
                    <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                        value={calpisNomal}
                        onChange={handleCalpisNomal}
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">美味しさ</label>
                <div>
                    <input
                        type='number'
                        className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                        value={deliciousness}
                        onChange={handleDeliciousness}
                    />
                </div>  
            </div>        
            <div className="mb-4">
                <button 
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
                    onClick={() => predictMaterial(getMaterial())}
                >
                    次のカルピスを作る材料を予測する
                </button>
            </div>
            <div className="p-4 my-2 border border-gray-300 rounded-md">
                <div>今回実験する配合は以下です。</div>
                <div className="text-lg font-bold text-blue-500">水の量: {predictedMaterial?.water}</div>
                <div className="text-lg font-bold text-blue-500">炭酸水の量: {predictedMaterial?.carbonated_water}</div>
                <div className="text-lg font-bold text-blue-500">カルピスの量: {predictedMaterial?.calpis_nomal}</div>
            </div>

            { materials == null ? (
                <div className="text-red-500">予測する材料を入力してください</div>
            ):(
                <div className="p-4 my-2 border border-gray-300 rounded-md">
                    <p>過去の実験結果</p>
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="text-left">水の量</th>
                                <th className="text-left">炭酸水の量</th>
                                <th className="text-left">カルピスの量</th>
                                <th className="text-left">美味しさ</th>
                            </tr>
                        </thead>
                        <tbody>
                            { materials.map((material: ExpremintalMaterial) => (
                                <tr id={String(material.id)}>
                                    <td className="border px-4 py-2">{material.water}</td>
                                    <td className="border px-4 py-2">{material.carbonated_water}</td>
                                    <td className="border px-4 py-2">{material.calpis_nomal}</td>
                                    <td className="border px-4 py-2">{material.deliciousness}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default PredictPage