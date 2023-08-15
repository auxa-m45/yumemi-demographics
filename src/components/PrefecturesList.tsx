import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

interface CheckboxItemProps {
    checked: boolean;
    label: string;
    value: number;
    onChange: (checked: boolean) => void;
};

function CheckboxItem (props: CheckboxItemProps) {
    return (
        <div className="checkbox-item">
            <label>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={(e) => props.onChange(e.target.checked)}
            />
            {props.label}</label>
        </div>
    );
}

export default function PrefecturesList(){

    //GET https://opendata.resas-portal.go.jp/api/v1/prefecturesする
    // useEffect(() => {
    //     axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures')
    // },[])
    const [prefectures, setPrefectures] = useState([
        {prefName: "北海道", prefCode: 1, checked: false},
    ]);

    const onChange = (checked: boolean, value: number) => {
        const newPrefectures = prefectures.map((prefecture) => {
            if (prefecture.prefCode === value) {
                return {
                    ...prefecture,
                    checked
                };
            }
            return prefecture;
        });
        setPrefectures(newPrefectures);
    };

    return (
        <div className="checkbox-list">
            {prefectures.map((prefecture) => (
                <CheckboxItem key={prefecture.prefCode}
                    checked={prefecture.checked}
                    label={prefecture.prefName}
                    value={prefecture.prefCode}
                    onChange={(checked) => onChange(checked, prefecture.prefCode)}
                />
            ))}
        </div>
    )
 }