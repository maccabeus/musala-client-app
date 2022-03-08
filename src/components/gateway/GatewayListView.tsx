import GatewayItemCard from "./GatewayItemCard";
import { FC, ReactElement } from "react";

export interface GatewayListViewProps {
    data: Array<any>,
    onDetailsClick: (value: any) => void
    onAddDeviceClick: (value: any) => void
}

const GatewayListView: FC<GatewayListViewProps> = (props): ReactElement => {

    const { data,  onAddDeviceClick,  onDetailsClick } = props;

    const List = () => {
        if (!data || data.length <= 0) {

            return (<div>No gateway found</div>)
        }
        const gatewayList = data.map((row: any, index: number) => {
            return (
                <GatewayItemCard  key={row.id} onDetailsClick={onDetailsClick} onAddDeviceClick={onAddDeviceClick} index={index}  {...row} />
            )
        })
        return <>{gatewayList}</>
    }
    return (
        <>
            <h2>Available Gateways</h2>
            <List />
        </>
    )
}

export default GatewayListView;