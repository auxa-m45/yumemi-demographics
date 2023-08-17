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
    // const defaultPref = {prefName: "北海道", prefCode: 1, checked: false};
    const [prefectures, setPrefectures] = useState([]);

    useEffect(() => {
        axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', { headers: { 'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY } })
        .then(response => {
            console.log(response);
        })
        .catch((error) => {
            console.log('失敗');
            console.log(error.status);
          });
    },[])

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
            <h3>都道府県</h3>
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